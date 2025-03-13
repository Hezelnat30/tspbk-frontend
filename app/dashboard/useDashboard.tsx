"use client";
import { getSession } from "next-auth/react";

export default async function useDashboard() {
  const session = await getSession();

  return { session };
}
