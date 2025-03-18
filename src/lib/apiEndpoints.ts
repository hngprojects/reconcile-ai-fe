export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}`;

console.log("BASE_URL", BASE_URL);

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

// MATCH/UNMATCH
export const MANUAL_API_URL = `${BASE_URL}/reconcile/`;

// MARKETING DEMO
export const MARKETING_DEMO_API_URL = `${BASE_URL}/outbound-marketing`;

// RECONCILE EXPORT
export const RECONCILE_EXPORT_API_URL = `${BASE_URL}/reconcile/export`;

// LOGOUT API
export const LOGOUT_API_URL = `${BASE_URL}/auth/logout`;

// PARTNERS API
export const PARTNER_API_URL = `${BASE_URL}/partners`;
