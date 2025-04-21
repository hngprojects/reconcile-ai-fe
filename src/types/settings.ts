import { User } from './auth'

export interface UserInfo {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  avatar?: File
  country?: string
  city?: string
}

export type UserUpdateResponse = Omit<
  User,
  'payment_plan' | 'access_token' | 'is_new_user'
>
