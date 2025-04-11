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
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

/**
 * The default redirect after login for new users
 * @type {string}
 */
export const NEW_USERS_DEFAULT_LOGIN_REDIRECT = '/onboarding'

export const protectedRoutes = [
  '/onboarding',
  '/dashboard',
  '/file-upload',
  '/reconciliation',
  '/manage-plan',
  '/profile',
]
