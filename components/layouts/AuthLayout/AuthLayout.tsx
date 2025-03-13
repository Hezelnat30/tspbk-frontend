import React from "react";
import AuthLayoutButton from "./AuthLayoutButton";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center w-full max-w-sm">
        <div className="flex flex-col w-full text-center gap-1 mb-2">
          <h2 className="text-3xl lg:text-4xl font-bold">Welcome Back!</h2>
          <p className="text-slate-500 text-xs lg:text-sm">
            Sign in to continue, or sign up for a new user.
          </p>
        </div>
        <AuthLayoutButton />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
