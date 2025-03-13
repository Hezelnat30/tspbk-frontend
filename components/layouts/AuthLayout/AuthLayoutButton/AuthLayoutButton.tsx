"use client";

import { cn } from "@/utils/cn";
import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function AuthLayoutButton() {
  const pathname = usePathname();
  const router = useRouter();

  const isSignUp = pathname === "/signup";
  const activeButton = isSignUp ? "signup" : "signin";

  const handleSignin = useCallback(() => {
    router.push("/signin");
  }, [router]);

  const handleSignup = useCallback(() => {
    router.push("/signup");
  }, [router]);

  return (
    <div className="flex w-full gap-2 p-1.5 justify-center bg-zinc-100 rounded-2xl relative">
      <div
        className={cn(
          "absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white rounded-xl transition-all duration-300 ease-in-out",
          {
            "left-1.5": activeButton === "signin",
            "left-1/2": activeButton === "signup",
          }
        )}
      />
      <Button
        disableAnimation={true}
        onPress={handleSignin}
        radius="md"
        className={cn(
          "w-1/2 bg-transparent font-semibold transition-all duration-200 ease-in-out z-10",
          {
            "text-black": activeButton === "signin",
            "text-zinc-500": activeButton !== "signin",
          }
        )}
      >
        Sign In
      </Button>
      <Button
        disableAnimation={true}
        onPress={handleSignup}
        radius="md"
        className={cn(
          "w-1/2 bg-transparent font-semibold transition-all duration-200 ease-in-out z-10",
          activeButton === "signup" ? "text-black" : "text-zinc-600"
        )}
      >
        Sign Up
      </Button>
    </div>
  );
}
