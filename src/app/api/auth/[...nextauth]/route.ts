import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { loginWithGoogle } from "@/src/lib/api";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  debug: true,
  callbacks: {
    async signIn({ account, profile, user }) {
      // console.log("SignIn callback triggered"); // Debugging
      // console.log("Account:", account); // Debugging
      // console.log("Profile:", profile); // Debugging

      if (account?.provider === "google" && profile?.email) {
        // Call the loginWithGoogle function to authenticate with your backend
        const response = await loginWithGoogle(account.id_token);

        if (response.status === "success") {
          // Set the access token in a cookie
          const cookieStore = await cookies(); // Await the cookies() function
          await cookieStore.set("access_token", response.data.access_token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          // Set the user data in a cookie
          await cookieStore.set("user_data", JSON.stringify(response.data.data), {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          // Attach the access token and user data to the user object
          user.access_token = response.data.access_token;
          user.data = response.data.data.user;

          return true; // Allow Google login
        } else {
          // console.error("Error in loginWithGoogle:", response.error); // Debugging
          return false; // Deny login if there's an error
        }
      }
      return false; // Deny other login methods
    },
    async jwt({ token, user, account }) {
      // console.log("JWT callback triggered"); // Debugging
      // console.log("Account:", account); // Debugging

      if (account?.provider === "google") {
        if (!account?.id_token) {
          // console.log("No id_token found in account"); // Debugging
          return token; // Return existing token if no id_token is present
        }

        // console.log("Calling loginWithGoogle with id_token:", account.id_token); // Debugging

        // Call the loginWithGoogle function to authenticate with your backend
        const response = await loginWithGoogle(account.id_token);

        if (response.status === "success") {
          // console.log("loginWithGoogle response:", response); // Debugging
          // Update the token with user data and access token
          token.accessToken = response.data.access_token;
          token.user = response.data.data.user;
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