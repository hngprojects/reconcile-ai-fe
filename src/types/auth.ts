export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string,
  created_at: string,
  updated_at: string
}

export interface Response {
  status: string,
  status_code: number,
  message: string,
  data: AuthResponse
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
