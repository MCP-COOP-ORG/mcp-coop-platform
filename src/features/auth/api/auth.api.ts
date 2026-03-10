import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";
import type { AuthCredentials, SignupData } from "../types";

const API_URL = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export class AuthService {
  /**
   * Proxies HttpOnly cookies from external API response to the Next.js client.
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
        sameSite: cookie.sameSite as any,
        maxAge: cookie.maxAge,
      });
    }
  }

  /**
   * Helper to map base login raw data to MyProfile structure
   */
  private static mapLoginDataToProfile(data: any, emailFallback: string) {
    return {
      id: data.user?.profileId || "",
      email: data.user?.email || emailFallback,
      fullName: data.user?.fullName || null,
      username: data.user?.username || null,
      tgId: data.user?.tgId || null,
      settings: null,
    };
  }

  /**
   * Reaches out to the backend to authenticate the user and sync nested HttpOnly cookies.
   */
  static async login(credentials: AuthCredentials) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    await this.syncCookies(res.headers.getSetCookie()?.join(",") || null);

    const data = await res.json();
    
    // 1. Initial fallback profile from login response
    let myProfile = this.mapLoginDataToProfile(data, credentials.email);

    // 2. Try to fetch full profile and merge if successful
    try {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join('; ');

      const profileRes = await fetch(`${API_URL}/profiles/me`, {
        headers: { "Cookie": cookieString },
      });
      if (profileRes.ok) {
        const fetchedProfile = await profileRes.json();
        myProfile = { ...myProfile, ...fetchedProfile };
      }
    } catch (e) {
      console.warn("Profile fetch failed, using login fallback data", e);
    }

    data.myProfile = myProfile;
    delete data.user; // Remove the original redundant user object
    return data;
  }

  /**
   * Reaches out to the backend to register the user.
   */
  static async signup(data: SignupData) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Registration failed. User may already exist.");
    }

    return true; // Optionally return newly created user data if needed
  }

  /**
   * Tells backend to drop the refresh token, and manually clears cookies from Next.js server store.
   */
  static async logout() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const cookieString = allCookies.map(c => `${c.name}=${c.value}`).join('; ');

    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cookie": cookieString },
      });

      // Explicitly clear cookies that NestJS drops in its Set-Cookie header (Max-Age=0)
      await this.syncCookies(res.headers.getSetCookie()?.join(",") || null);
    } catch (e) {
      console.warn("Failed to reach external API logout endpoint", e);
    }

    // Force clear any remaining Next.js tracked auth/token cookies as a fallback, 
    // omitting next-auth's own cookies which are managed by NextAuth signOut(). 
    for (const c of cookieStore.getAll()) {
      const name = c.name.toLowerCase();
      if ((name.includes('token') || name.includes('auth') || name.includes('session')) && !name.includes('next-auth')) {
        cookieStore.delete(c.name);
      }
    }
  }
}
