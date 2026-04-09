docker run --rm \
  --network mcp-network \
  -v "$(pwd)/prisma:/app/prisma" \
  -v "$(pwd)/prisma.config.ts:/app/prisma.config.ts" \
  -v "$(pwd)/tsconfig.json:/app/tsconfig.json" \
  -v "$(pwd)/node_modules:/app/node_modules" \
  -w /app \
  -e DATABASE_URL="postgresql://postgres:CHANGE_ME@postgres-backend:5432/mcp_coop_backend?schema=public" \
  node:22-alpine \
  sh -c "node_modules/.bin/ts-node -r tsconfig-paths/register prisma/seed.ts"
