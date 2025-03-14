import { useSumStore } from "@/store/sidebar.store";
import { Button } from "@heroui/react";
export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col min-h-screen gap-2 w-full justify-center items-center">
        <h3 className="text-5xl font-bold uppercase tracking-tight">
          Welcome Next 15
        </h3>
        <div className="flex gap-2">
          <Button color="secondary">Sign In</Button>
          <Button
            color="warning"
            variant="solid"
            className="font-bold text-slate-800"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
