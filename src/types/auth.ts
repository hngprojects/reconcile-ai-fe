export interface PlanDetails {
  id: string
  name: string
  description: string
  plan_length: number
  plan: 'Basic' | 'Starter' | 'Business'
  reconciliations_per_month: number
  amount: string
  created_at: string
  updated_at: string
}

export interface PaymentPlan {
  id: number
  user_id: number
  price: string
  plan: PlanDetails
  created_at: string
  updated_at: string
  plan_id: string
  stripe_reference: string | null
  start_date: string | null
  expire_date: string | null
  is_active: boolean
  reconciliations_used: number
}

export interface User {
  id: number
  email: string
  name: string
  country: string | null
  city: string | null
  avatar: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  payment_plan: PaymentPlan
  access_token: string
  is_new_user: boolean
  phone_number: string | null
}

export interface AuthData {
  user: User
  plan: PaymentPlan
  userPlan: PlanDetails
}

export interface Response {
  status_code: number
  status: string
  message: string
  data: AuthData
}

export interface GoogleTokens {
  access_token: string
  id_token: string
  token_type: string
  expires_in: number
}

export interface GoogleUserInfo {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}
