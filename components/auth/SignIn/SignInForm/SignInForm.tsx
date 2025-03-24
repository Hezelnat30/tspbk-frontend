"use client";
import useSignin from "@/app/(auth)/signin/useSignin";
import InputForm from "@/components/auth/SignIn/InputForm";
import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";

export default function SignInForm() {
  const { handleSubmit, handleSignin, signinStatus, errors, control } =
    useSignin();
  return (
    <form
      onSubmit={handleSubmit(handleSignin)}
      className="max-w-xs md:max-w-md w-full"
    >
      <InputForm control={control} errors={errors} />
      <Button
        disabled={signinStatus === "pending"}
        type="submit"
        className={cn("font-semibold h-14 mt-4 bg-primary-yellow", {
          "mt-2": Object.keys(errors).length > 0,
        })}
        fullWidth
      >
        {signinStatus === "pending" ? (
          <Spinner size="sm" color="white" />
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
