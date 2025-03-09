export interface User {
  id: number;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
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
