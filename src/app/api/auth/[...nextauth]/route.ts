import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { loginWithGoogle } from "@/src/lib/api";

const isDevelopment = process.env.NODE_ENV === "development";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: isDevelopment,
  callbacks: {
    async signIn({ account, profile, user }) {

      if (account?.provider === "google" && profile?.email) {
        // Call the loginWithGoogle function to authenticate with your backend
        const response = await loginWithGoogle(account.id_token);

        if (response.status === "success") {
          // Set the access token in a cookie
          const cookieStore = await cookies(); // Await the cookies() function
          cookieStore.set("access_token", response.data.access_token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          // Set the user data in a cookie
          cookieStore.set("user_data", JSON.stringify(response.data.data), {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          // Attach the access token and user data to the user object
          user.access_token = response.data.access_token;
          user.data = { ...response.data.data.user, payment_plan: response.data.data.plan };

          return true; // Allow Google login
        } else {
          return false; // Deny login if there's an error
        }
      }
      return false; // Deny other login methods
    },
    async jwt({ token, account }) {

      if (account?.provider === "google") {
        if (!account?.id_token) {
          return token; // Return existing token if no id_token is present
        }

        // Call the loginWithGoogle function to authenticate with your backend
        const response = await loginWithGoogle(account.id_token);

        if (response.status === "success") {
          // Update the token with user data and access token
          token.accessToken = response.data.access_token;
          token.user = { ...response.data.data.user, payment_plan: response.data.data.plan };
        } else {
          console.error("Error in loginWithGoogle:", response.error); // Debugging
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        ...token.user,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
