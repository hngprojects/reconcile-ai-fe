import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import { google_login } from '../actions/auth'
import { PaymentPlan, TBusinessInfo, User } from '../types/auth'
import { inDevEnvironment } from '../lib/utils'

// Conditional server-side logging. Set AUTH_DEBUG=true in production to enable.
// Sensitive fields (tokens/credentials) are always redacted.
const AUTH_DEBUG = inDevEnvironment || process.env.AUTH_DEBUG === 'true'

function sanitize(obj: unknown): unknown {
  try {
    const copy = JSON.parse(JSON.stringify(obj))
    const redact = (o: any) => {
      if (!o || typeof o !== 'object') return o
      for (const k of Object.keys(o)) {
        if (/token|access_token|id_token|refresh_token/i.test(k)) {
          o[k] = '[REDACTED]'
        } else if (typeof o[k] === 'object') {
          redact(o[k])
        } else if (typeof o[k] === 'string' && o[k].length > 200) {
          o[k] = `${o[k].slice(0, 100)}...[TRUNCATED]`
        }
      }
      return o
    }
    return redact(copy)
  } catch {
    return obj
  }
}

const authLog = (...args: unknown[]) => {
  if (!AUTH_DEBUG) return
  // prefix with [auth] to make logs searchable in prod
  // eslint-disable-next-line no-console
  console.info('[auth]', ...args.map(sanitize))
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      checks: ['none'],
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      authLog('signIn:start', {
        provider: account?.provider ?? null,
        userPresent: !!user,
        userEmail: user?.email ? '[redacted]' : undefined,
      })

      if (account?.provider === 'google') {
        authLog('signIn:accepted-google', { provider: account.provider })
        return true
      }

      authLog('signIn:returning-existence', { hasUser: !!user })
      return !!user
    },
    async jwt({ token, account, trigger, session }) {
      authLog('jwt:start', {
        trigger,
        provider: account?.provider ?? null,
        tokenPresent: !!(token && (token as any).access_token),
        sessionPresent: !!session,
      })

      if (account?.provider === 'google') {
        authLog('jwt:google-provider', { hasIdToken: !!account?.id_token })
        if (!account?.id_token) {
          authLog('jwt:google-missing-id-token')
          return null
        }
        const res = await google_login(account.id_token)
        if (!res.success) {
          authLog('jwt:google-login-failed', { success: res.success })
          return null
        }
        authLog('jwt:google-login-success', {
          userId: res?.data?.user?.id ?? null,
          plan: res?.data?.plan ?? null,
          onboarded: res?.data?.onboarded ?? null,
          businessInfoPresent: !!res?.data?.businessInfo,
          accessTokenPresent: !!res?.access_token,
        })
        token.user = res?.data?.user
        // do NOT log actual tokens/credentials
        token.access_token = res.access_token
        token.plan = res.data?.plan
        token.onboarded = res.data?.onboarded
        token.businessInfo = res.data?.businessInfo
      }

      if (trigger === 'update') {
        authLog('jwt:update', {
          hasSessionUser: !!session.user,
          hasPlan: !!session.plan,
          hasOnboarded: session.onboarded ?? undefined,
          hasBusinessInfo: !!session.businessInfo,
        })
        if (session.user) {
          token.user = {
            ...(typeof token.user === 'object' && token.user ? token.user : {}),
            ...session.user,
          }
        }

        if (session.plan) {
          token.plan = session.plan
        }

        if (session.onboarded) {
          token.onboarded = session.onboarded
        }

        if (session.businessInfo) {
          token.businessInfo = session.businessInfo
        }
      }
      authLog('jwt:return', { tokenUserId: (token as any)?.user?.id ?? null, plan: (token as any)?.plan ?? null })
      return token
    },
    async session({ session, token }) {
      authLog('session:start', {
        hasAccessToken: !!token.access_token,
        tokenUserId: (token as any)?.user?.id ?? null,
      })
      if (!token.access_token) {
        authLog('session:missing-access-token - returning session')
        return session
      }
      if (token.user) {
        // @ts-expect-error next line
        session.user = {
          ...token.user,
          emailVerified: null,
          access_token: token.access_token,
        } as User & {
          emailVerified: null
        }
        session.plan = token.plan as PaymentPlan
        session.onboarded = token.onboarded as boolean
        session.businessInfo = token.businessInfo as TBusinessInfo
        authLog('session:attached-token-user', {
          userId: (session.user as any)?.id ?? null,
          plan: session.plan ?? null,
          onboarded: session.onboarded ?? null,
          businessInfoPresent: !!session.businessInfo,
        })
      }

      return session
    },
  },
  basePath: '/api/auth',
  session: {
    strategy: 'jwt',
  },
  debug: inDevEnvironment,
  trustHost: true,
}
