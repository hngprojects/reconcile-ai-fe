export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "https://api-dev.reconxi.com/api/v1";
if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_API_URL is not defined");
}

// RECONCILE
export const RECONCILE_API_URL = `${BASE_URL}/reconcile`;

// WAITLIST
export const WAITLIST_API_URL = `${BASE_URL}/wait-list`;

// CONTACT US
export const CONTACT_US_API_URL = `${BASE_URL}/contact`;

// GOOGLE AUTH
export const GOOGLE_API_URL = `${BASE_URL}/auth/google`;

// User
export const USER_API_URL = `${BASE_URL}/user`;

// NEWSLETTER
export const NEWSLETTER_API_URL = `${BASE_URL}/newsletter/subscribe`;
