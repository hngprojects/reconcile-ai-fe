export interface PaymentPlan {
  id: number;
  user_id: number;
  price: string;
  plan: "Basic" | "Starter" | "Business";
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  payment_plan: PaymentPlan;
}

export interface Response {
  status: string;
  status_code: number;
  message: string;
  data: AuthResponse;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface GoogleTokens {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
