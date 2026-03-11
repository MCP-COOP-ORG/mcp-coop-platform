FROM node:20-bookworm-slim AS base
WORKDIR /app

# Enable corepack for fast pnpm/yarn/npm, install openssl (needed by Prisma)
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*
ENV NEXT_TELEMETRY_DISABLED=1

# ==========================================
# 1. Install dependencies only when needed
# ==========================================
FROM base AS deps
# Copy only package.json and package-lock.json to leverage Docker layer caching.
# This step will ONLY run again if package.json or package-lock.json changes.
COPY package.json package-lock.json ./
RUN npm ci

# ==========================================
# 2. Rebuild the source code only when needed
# ==========================================
FROM base AS builder
# Copy cached node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all project files
COPY . .

# Generate Prisma Client (needs to run before build)
# Prisma config requires DATABASE_URL even just to generate the client.
ENV DATABASE_URL="postgresql://dummy"
RUN npx prisma generate

# Accept build arguments for Next.js NEXT_PUBLIC variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_KANBAN_MFE_URL
ENV NEXT_PUBLIC_KANBAN_MFE_URL=$NEXT_PUBLIC_KANBAN_MFE_URL

# Build the Next.js app (standalone mode configured in next.config.ts)
# NOTE: If your Next.js build needs .env variables (like API keys) to embed at build time
# they should be passed as build args or mounted here. For runtime, we handle it below.
RUN npm run build

# ==========================================
# 3. Production image, copy all the files and run next
# ==========================================
FROM base AS runner
ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set correct permissions for Next.js cache
RUN mkdir .next && chown nextjs:nodejs .next

# Copy the generated standalone server
# Standalone mode only copies the required node_modules, saving massive image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# (Optional) If you want the Docker container to pick up a local .env file when running,
# you can copy it here. However, best practice in Docker is to pass env vars via
# docker-compose.yml or cloud orchestration (ECS/K8s) rather than baking the file into the image.
# COPY --chown=nextjs:nodejs .env* ./

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
