import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ISignin {
  username: string;
  password: string;
}

export type { ISignin };
