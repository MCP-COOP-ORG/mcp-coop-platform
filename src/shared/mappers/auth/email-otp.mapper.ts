import type { RequestEmailOtpResponseDto } from "@/shared/open-api/models";

export interface OtpResponseData {
  expiresIn: number;
  isNewUser: boolean;
}

/**
 * Adapter: RequestEmailOtpResponseDto → OtpResponseData
 *
 * Used in email-otp.ts action (emailOtpControllerRequestOtp).
 * Isolates the extraction of OTP metadata from the action logic.
 */
export function mapEmailOtpResponse(dto: RequestEmailOtpResponseDto): OtpResponseData {
  return {
    expiresIn: dto.expiresIn,
    isNewUser: dto.isNewUser,
  };
}
