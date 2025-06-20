export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}`

console.log('BASE_URL', BASE_URL)

// RECONCILE
export const RECONCILE_API_URL = `${BASE_URL}/reconcile`

// WAITLIST
export const WAITLIST_API_URL = `${BASE_URL}/wait-list`

// CONTACT US
export const CONTACT_US_API_URL = `${BASE_URL}/contact`

// GOOGLE AUTH
export const GOOGLE_API_URL = `${BASE_URL}/auth/google`

// User
export const USER_API_URL = `${BASE_URL}/user`

// NEWSLETTER
export const NEWSLETTER_API_URL = `${BASE_URL}/newsletter/subscribe`

// MATCH/UNMATCH
export const MANUAL_API_URL = `${BASE_URL}/reconcile/`

// MARKETING DEMO
export const MARKETING_DEMO_API_URL = `${BASE_URL}/outbound-marketing`

// RECONCILE EXPORT
export const RECONCILE_EXPORT_API_URL = `${BASE_URL}/reconcile/export`

// LOGOUT API
export const LOGOUT_API_URL = `${BASE_URL}/auth/logout`

// PARTNERS API
export const PARTNER_API_URL = `${BASE_URL}/partners`

// CUSTOMER-FEEDBACK API
export const CUSTOMER_FEEDBACK_API_URL = `${BASE_URL}/customer-feedback`

// RECONCILIATION RESULT API
export const RECONCILIATION_RESULT_API_URL = `${BASE_URL}/reconciliations/`

export const RECONCILIATION_API_URL = `${BASE_URL}/reconciliations`
// RECONCILIATION PROJECTS API
export const GET_RECONCILIATION_PROJECTS = `${BASE_URL}/reconciliations`

// PAYMENT PLAN
export const PAYMENT_PLAN_API_URL = `${BASE_URL}/payment-plan`

// USER BILLING HISTORY billing history endpoint
export const BILLING_HISTORY_API_URL = `${BASE_URL}/payment-plan/history`

export const GOOGLE_LOGIN_URL = `${BASE_URL}/auth/google-login`

export const TOKEN_VALIDATOR_URL = `${BASE_URL}/auth/check-token`

// USER PROFILE UPDATE
export const USER_PROFILE_UPDATE_API_URL = `${BASE_URL}/profile/update`

// LEDGER ENTRY API
export const LEDGER_ENTRY_API_URL = `${BASE_URL}/ledger-entries`

// BOOKKEEPING LEDGER
export const BOOKKEEPING_LEDGER_API_URL = `${BASE_URL}/bookkeeping-ledgers`

// LEDGER ENTRIES
export const LEDGER_ENTRIES_API_URL = `${BASE_URL}/ledger-entries`

// BANK ACCOUNTS
export const BANK_ACCOUNTS_API_URL = `${BASE_URL}/bank-accounts`

// CHART OF ACCOUNTS
export const CHART_OF_ACCOUNTS_API_URL = `${BASE_URL}/chart-accounts`