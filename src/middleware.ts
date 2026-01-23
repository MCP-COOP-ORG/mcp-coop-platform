import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Middleware logic for protected routes can be added here if needed
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};

