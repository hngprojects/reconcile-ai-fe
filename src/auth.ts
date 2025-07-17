import type { DefaultSession } from 'next-auth'
import NextAuth from 'next-auth'
import { PaymentPlan, TBusinessInfo, User } from './types/auth'
import { authConfig } from './config/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  unstable_update,
  signOut,
} = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
})

declare module 'next-auth' {
  interface Session {
    user: User & Omit<DefaultSession['user'], 'id'> & { id: number }
    plan?: PaymentPlan
    onboarded?: boolean
    businessInfo?: TBusinessInfo
  }
}
