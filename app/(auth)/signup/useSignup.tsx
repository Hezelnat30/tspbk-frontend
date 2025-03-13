"use client";
import {
  errorToasterStyles,
  successToasterStyles,
} from "@/constants/style.constant";
import { signupSchema } from "@/libs/schema";
import authServices from "@/services/auth.service";
import { ISignin } from "@/types/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function useSignup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl: string = searchParams.get("callbackUrl") || "/signin";
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const signupService = async (payload: ISignin) => {
    try {
      const result = await authServices.signup(payload);
      return result;
    } catch (error: any) {
      const errorMsg = error.response.data.meta.message;
      const message = errorMsg.split("- ")[1];
      throw new Error(message);
    }
  };

  const { mutate: mutateSignup, status: signupStatus } = useMutation({
    mutationFn: signupService,
    onError: (error) => {
      addToast({
        title: error.message,
        ...errorToasterStyles,
      });
      reset();
    },
    onSuccess: () => {
      addToast({
        title: "Signup Successfully",
        ...successToasterStyles,
      });
      router.push(callbackUrl);
      reset();
    },
  });

  const handleSignup = async (data: ISignin) => mutateSignup(data);
  return {
    control,
    handleSubmit,
    handleSignup,
    signupStatus,
    errors,
  };
}
