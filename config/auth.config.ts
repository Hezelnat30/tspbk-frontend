import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authServices from "@/services/auth.service";
import environment from "@/config/environment";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        try {
          const response = await authServices.signin({ username, password });
          if (response.status !== 200 || !response.data.success) {
            throw new Error("Invalid credentials");
          }
          const { data } = response.data;
          const accessToken = data.token;
          const me = await authServices.getProfileWithToken(accessToken);
          if (me.status !== 200 || !me.data.success) {
            throw new Error("Failed to get user profile");
          }
          const user = me.data.data;
          user.accessToken = accessToken;
          return user;
        } catch (error) {
          throw new Error("Signin failed, please try again");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async redirect({ baseUrl, url }) {
      if (url.startsWith(`${baseUrl}/dashboard`)) {
        return `${baseUrl}/dashboard`;
      }
      if (url === baseUrl) {
        return `${baseUrl}/dashboard`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
};
