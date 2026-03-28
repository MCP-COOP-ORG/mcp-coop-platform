import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";
import type { AuthCredentials, SignupData, CookieSameSite } from "../types";
import type { MyProfile } from "@/shared/types/auth";
import { AUTH_COOKIE, AUTH_ERRORS, INTERNAL_API_URL } from "@/shared/constants/auth";

export class AuthService {
  /**
   * Proxies HttpOnly cookies from external API response to the Next.js cookie store.
   */
  private static async syncCookies(setCookieHeader: string | null) {
    if (!setCookieHeader || setCookieHeader.length === 0) return;

    const parsedCookies = setCookieParser.parse(setCookieHeader);
    const cookieStore = await cookies();

    for (const cookie of parsedCookies) {
      cookieStore.set({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path || "/",
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite as CookieSameSite,
        maxAge: cookie.maxAge,
      });
    }
  }

  /**
   * Builds a cookie string from the current Next.js cookie store for forwarding.
   */
  private static async buildCookieString(): Promise<string> {
    const cookieStore = await cookies();
    return cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
  }

  /**
   * Authenticates against the backend and syncs HttpOnly cookies to Next.js.
   */
  static async login(credentials: AuthCredentials): Promise<{ success: boolean }> {
    const res = await fetch(`${INTERNAL_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || errorData?.error || `API Error ${res.status}: ${res.statusText}`);
    }

    await this.syncCookies(res.headers.getSetCookie()?.join(",") || null);

    return { success: true };
  }

  /**
   * Registers a new user against the backend.
   */
  static async signup(data: SignupData) {
    const res = await fetch(`${INTERNAL_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        ...(data.name ? { username: data.name } : {}),
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || AUTH_ERRORS.registrationFailed);
    }

    return true;
  }

  /**
   * Tells backend to drop the refresh token, and clears auth cookies from Next.js store.
   */
  static async logout() {
    const cookieStore = await cookies();
    const cookieString = await this.buildCookieString();

    try {
      const res = await fetch(`${INTERNAL_API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cookie": cookieString },
      });

      await this.syncCookies(res.headers.getSetCookie()?.join(",") || null);
    } catch (e) {
      console.warn(AUTH_ERRORS.serviceUnavailable, e);
    }

    // Force clear auth cookies as fallback
    const authCookieNames = [AUTH_COOKIE.accessToken, AUTH_COOKIE.refreshToken];
    for (const name of authCookieNames) {
      if (cookieStore.get(name)) {
        cookieStore.delete(name);
      }
    }
  }

  /**
   * Fetches the current user profile from backend using forwarded cookies.
   * Returns null if not authenticated or on any failure.
   */
  static async getMyProfile(): Promise<MyProfile | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE.accessToken);
    if (!token) return null;

    try {
      const cookieString = await this.buildCookieString();
      const res = await fetch(`${INTERNAL_API_URL}/profiles/me`, {
        headers: { Cookie: cookieString },
        cache: "no-store",
      });

      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }

  /**
   * Generates the OAuth login URL for the given provider.
   */
  static getOAuthLoginUrl(provider: string): string {
    return `/api/auth/oauth/${provider}`;
  }

  /**
   * Authenticates against the backend via Telegram initData and syncs cookies.
   */
  static async loginTelegram(initData: string): Promise<{ success: boolean }> {
    const res = await fetch(`${INTERNAL_API_URL}/auth/telegram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initData }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || errorData?.error || `API Error ${res.status}: ${res.statusText}`);
    }

    await this.syncCookies(res.headers.getSetCookie()?.join(",") || null);
    return { success: true };
  }

  /**
   * Links a Telegram account to the currently authenticated user.
   */
  static async linkTelegram(initData: string): Promise<{ success: boolean }> {
    const cookieString = await this.buildCookieString();
    
    const res = await fetch(`${INTERNAL_API_URL}/auth/link-telegram`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieString
      },
      body: JSON.stringify({ initData }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || errorData?.error || `API Error ${res.status}: ${res.statusText}`);
    }

    await this.syncCookies(res.headers.getSetCookie()?.join(",") || null);
    return { success: true };
  }
}
