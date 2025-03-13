"use client";
import { customInputStyles } from "@/constants/style.constant";
import { cn } from "@/utils/cn";
import { Input } from "@heroui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

interface InputFormProps {
  control: any;
  errors: any;
}

export default function InputForm({ control, errors }: InputFormProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  return (
    <div
      className={cn("flex flex-col w-full gap-4", {
        "gap-2": Object.keys(errors).length > 0,
      })}
    >
      {/* Username Field */}
      <div className="flex flex-col w-full">
        <div className="w-full bg-zinc-100 border-1.5 rounded-xl flex items-center">
          <div className="relative bg-white rounded-l-xl h-14 w-14 flex items-center justify-center">
            <FaRegUser className="text-gray-500" size={20} />
            <div className="absolute right-0 w-0.5 h-2/3 bg-zinc-200"></div>
          </div>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                labelPlacement="inside"
                label="Username"
                className="text-zinc-500"
                classNames={customInputStyles}
              />
            )}
          />
        </div>
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col w-full">
        <div className="w-full bg-zinc-100 border-1.5 rounded-xl flex items-center">
          <div className="relative bg-white rounded-l-xl h-14 w-14 flex items-center justify-center">
            <FiLock className="text-gray-500" size={20} />
            <div className="absolute right-0 w-0.5 h-2/3 bg-zinc-200"></div>
          </div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={isVisible ? "text" : "password"}
                labelPlacement="inside"
                label="Password"
                className="text-zinc-500"
                classNames={customInputStyles}
                endContent={
                  <button
                    className={cn("focus:outline-none")}
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaEye className="pointer-events-none text-xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                    )}
                  </button>
                }
              />
            )}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>
    </div>
  );
}
