import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/shared/constants/auth";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const callbackUrl = url.searchParams.get("callbackUrl") || "/";

  // This runs on the server in a Route Handler context, 
  // so cookies() can safely mutate headers.
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE.accessToken);
  cookieStore.delete(AUTH_COOKIE.refreshToken);

  // Use 307 Temporary Redirect so browsers don't cache this redirect
  return NextResponse.redirect(new URL(callbackUrl, request.url), 307);
}
