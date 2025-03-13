"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session }: any = useSession();
  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  );
}
