import NextAuth from "next-auth";
import authConfig from "@/core/configs/auth.config";
import { authGuard } from "@/core/middleware/authGuard";

const { auth } = NextAuth(authConfig);

export default auth(authGuard);

export const config = {
  // Next.js requires matcher to be statically analyzable literals
  matcher: ["/dashboard/:path*"],
};

