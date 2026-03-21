import { z } from "zod";
import { authCredentialsSchema, signupSchema } from "./validation";

export type AuthCredentials = z.infer<typeof authCredentialsSchema>;
export type SignupData = z.infer<typeof signupSchema>;

export type CookieSameSite = "lax" | "strict" | "none" | undefined;

export interface LoginRawData extends Record<string, unknown> {
  user?: {
    profileId?: string;
    email?: string;
    fullName?: string;
    username?: string;
    tgId?: string;
  };
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export type SignupResult = AuthResult;
