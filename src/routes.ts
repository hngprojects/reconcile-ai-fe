/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/verified', '/invite', '/view-task']

export const authRoutes = [
  '/forgot-password',
  '/login',
  '/reset-password',
  '/signup',
  '/verify-email',
  '/verify-otp',
  '/verified',
]

export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/'

export const protectedRoutes = [
  '/dashboard',
  '/ledger',
  '/reconciliation-dashboard',
  '/reports',
  '/settings',
  '/support',
  '/file-upload',
  '/reconciliation',
  '/manage-plan',
  '/profile',
]
