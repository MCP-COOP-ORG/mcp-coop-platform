// ─────────────────────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────────────────────
export type { PaginatedResult, MappedContacts, MappedWallets, MappedWalletEntry } from "./primitives/types";
export { mapContacts } from "./primitives/map-contacts";
export { mapWallets } from "./primitives/map-wallets";
export { mapSkills } from "./primitives/map-skills";
export type { MappedSkills } from "./primitives/map-skills";
export { mapPaginated } from "./primitives/map-paginated";
export { withPaginatedAction } from "./primitives/with-paginated-action";

// ─────────────────────────────────────────────────────────────────────────────
// Profile
// ─────────────────────────────────────────────────────────────────────────────
export { mapProfileCardDto } from "./profile/profile-card.mapper";
export { mapProfileFullDto } from "./profile/profile-full.mapper";
export { mapMeResponseDto, isMyProfileData } from "./profile/me.mapper";

// ─────────────────────────────────────────────────────────────────────────────
// Coop
// ─────────────────────────────────────────────────────────────────────────────
export { mapCoopCardDto } from "./coop/coop-card.mapper";
export { mapCoopFullDto } from "./coop/coop-full.mapper";

// ─────────────────────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────────────────────
export { mapEmailOtpResponse } from "./auth/email-otp.mapper";
export type { OtpResponseData } from "./auth/email-otp.mapper";
