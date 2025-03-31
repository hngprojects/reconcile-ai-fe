import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import { google_login } from '../actions/auth'
import { User } from '../types/auth'
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
    async jwt({ token, account }) {
      if (account?.provider === 'google') {
        if (!account?.id_token) {
          return null
        }
        const res = await google_login(account.id_token)
        if (!res.success) {
          return null
        }
        token.user = res?.data?.user
        token.access_token = res.access_token
      }
      console.log(token)
      return token
    },
    async session({ session, token }) {
      console.log('TOKEN', token)
      if (token.user) {
        // @ts-expect-error next line
        session.user = { ...token.user, emailVerified: null } as User & {
          emailVerified: null
        }
        session.access_token = token.acces_token as string
      }

      console.log('Session:', session)

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
