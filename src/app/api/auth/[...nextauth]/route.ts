import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle } from "@/src/lib/api";
import { cookies } from "next/headers";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const response = await loginWithGoogle(account.id_token);
      const cookieStore = await cookies();

      cookieStore.set("access_token", response.data?.access_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      cookieStore.set("user_data", response?.data?.data?.user, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      cookieStore.set("payment_plan", response?.data?.data?.plan, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      user.access_token = response.data.access_token;
      user.data = { ...response.data.data.user, payment_plan: response.data.data.plan };
      return user;

    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
        token.user = user.data;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        ...token.user
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