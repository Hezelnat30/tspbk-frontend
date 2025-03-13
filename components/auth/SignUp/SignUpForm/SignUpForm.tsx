"use client";
import useSignup from "@/app/(auth)/signup/useSignup";
import InputForm from "@/components/auth/SignIn/InputForm";
import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";

export default function SignUpForm() {
  const { handleSubmit, handleSignup, signupStatus, errors, control } =
    useSignup();
  return (
    <form onSubmit={handleSubmit(handleSignup)} className="max-w-md w-full">
      <InputForm control={control} errors={errors} />
      <Button
        disabled={signupStatus === "pending"}
        type="submit"
        className={cn("font-semibold h-14 mt-4 bg-primary-yellow", {
          "mt-2": Object.keys(errors).length > 0,
        })}
        fullWidth
      >
        {signupStatus === "pending" ? <Spinner size="sm" /> : "Sign Up"}
      </Button>
    </form>
  );
}
