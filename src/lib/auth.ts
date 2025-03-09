// import { GoogleTokens, GoogleUserInfo } from "@/src/types/auth";

// if (!process.env.GOOGLE_CLIENT_ID) {
//   throw new Error("GOOGLE_CLIENT_ID is not defined");
// }

// if (!process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error("GOOGLE_CLIENT_SECRET is not defined");
// }

// if (!process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL) {
//   throw new Error("NEXT_PUBLIC_AUTH_REDIRECT_URL is not defined");
// }

// export async function getGoogleOauthTokens(
//   code: string
// ): Promise<GoogleTokens> {
//   const url = "https://oauth2.googleapis.com/token";
//   const values = {
//     code,
//     client_id: process.env.GOOGLE_CLIENT_ID || "",
//     client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
//     redirect_uri: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || "",
//     grant_type: "authorization_code",
//   };

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams(values as Record<string, string>),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to get Google OAuth tokens");
//   }

//   return response.json();
// }

// export async function getGoogleUser(
//   access_token: string
// ): Promise<GoogleUserInfo> {
//   const response = await fetch(
//     "https://www.googleapis.com/oauth2/v2/userinfo",
//     {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to get Google user info");
//   }

//   return response.json();
// }
