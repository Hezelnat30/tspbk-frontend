"use client";
import {
  errorToasterStyles,
  successToasterStyles,
} from "@/constants/style.constant";
import { signinSchema } from "@/libs/schema";
import { ISignin } from "@/types/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useSignin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl: string = searchParams.get("callbackUrl") || "/dashboard";
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const loginService = async (payload: ISignin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Signin failed, please try again");
    }
  };

  const { mutate: mutateSignin, status: signinStatus } = useMutation({
    mutationFn: loginService,
    onError: (error) => {
      addToast({
        title: error.message,
        ...errorToasterStyles,
      });
      reset();
    },
    onSuccess: () => {
      addToast({
        title: "Signin Successfully",
        ...successToasterStyles,
      });
      router.push("/dashboard");
      reset();
    },
  });

  const handleSignin = async (data: ISignin) => mutateSignin(data);

  return {
    control,
    handleSubmit,
    handleSignin,
    signinStatus,
    errors,
  };
}
