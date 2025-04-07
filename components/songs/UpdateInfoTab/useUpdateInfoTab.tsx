import { updateInfoSchema } from "@/libs/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function useUpdateInfoTab() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(updateInfoSchema),
    mode: "onChange",
  });

  return {
    control,
    errors,
    handleSubmit,
    isDirty,
    isValid,
    setValue,
    reset,
  };
}
