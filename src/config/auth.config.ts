import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import { google_login } from '../actions/auth'
import { PaymentPlan, TBusinessInfo, User } from '../types/auth'
import { inDevEnvironment } from '../lib/utils'

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      checks: ['none'],
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'google') {
        return true
      }
      return !!user
    },
    async jwt({ token, account, trigger, session }) {
      if (account?.provider === 'google') {
        if (!account?.id_token) {
          return null
        }
        const res = await google_login(account.id_token)
        if (!res.success) {
          return null
        }
        console.dir({ res }, { depth: null })
        token.user = res?.data?.user
        token.access_token = res.access_token
        token.plan = res.data?.plan
        token.onboarded = res.data?.onboarded
        token.businessInfo = res.data?.businessInfo
      }

      if (trigger === 'update') {
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
      return token
    },
    async session({ session, token }) {
      if (!token.access_token) {
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
