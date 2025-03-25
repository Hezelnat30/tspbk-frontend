import { cn } from "@/utils/cn";
import { ListboxItemProps, ToastProps } from "@heroui/react";
import { BiUserCheck } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const customInputStyles = {
  base: "w-full",
  label: "text-black/50 text-small font-medium",
  input: "text-black",
  inputWrapper: [
    "bg-white",
    "rounded-r-xl rounded-l-none",
    "border-0",
    "h-14",
    "shadow-none",
    // "!ring-0",
    "hover:bg-white !important",
    "data-[hover=true]:bg-white !important",
    "group-data-[hover=true]:bg-white !important",
    "group-data-[focus=true]:bg-white",
    "focus-visible:outline-none",
    "focus-visible:ring-0",
    "focus-visible:border-0",
  ],
};

const successToasterStyles: Partial<ToastProps> = {
  timeout: 3000,
  shouldShowTimeoutProgress: true,
  color: "success",
  variant: "bordered",
  size: "sm",
  icon: <BiUserCheck />,
  classNames: {
    base: cn(["max-w-xs", "h-14", "top-6"]),
    closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
  },
  closeIcon: <IoClose />,
};

const errorToasterStyles: Partial<ToastProps> = {
  timeout: 3000,
  shouldShowTimeoutProgress: true,
  color: "danger",
  variant: "bordered",
  size: "sm",
  icon: <GiCancel />,
  classNames: {
    base: cn(["max-w-xs", "h-14", "top-6"]),
    closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
  },
  closeIcon: <IoClose />,
};

const listBoxItemStyles: ListboxItemProps = {
  classNames: {
    base: "bg-indigo-300",
  },
};

export {
  customInputStyles,
  errorToasterStyles,
  listBoxItemStyles,
  successToasterStyles,
};
