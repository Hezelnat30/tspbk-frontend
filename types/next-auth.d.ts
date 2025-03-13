import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    username: string;
    role?: string;
    accessToken?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  interface Session extends DefaultSession {
    user: User | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: User;
  }
}
