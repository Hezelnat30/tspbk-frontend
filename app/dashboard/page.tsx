"use client";

import { useSumStore } from "@/store/sidebar.store";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session }: any = useSession();
  const { count, decrement, increment } = useSumStore();

  return (
    <div>
      <h3>Dashboard</h3>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2">
          <p className="text-xl font-bold">{count}</p>
          <Button onPress={() => increment(5)} color="default">
            Increment
          </Button>
          <Button onPress={decrement} color="danger">
            Decrement
          </Button>
        </div>
      </div>
    </div>
  );
}
