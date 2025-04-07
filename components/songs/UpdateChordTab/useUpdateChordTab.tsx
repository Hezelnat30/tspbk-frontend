import useChordHandling from "@/hooks/useChordHandling";
import { updateChordSchema } from "@/libs/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function useUpdateChordTab() {
  const {
    isPendingDeleteChord,
    isPendingUploadChord,
    mutateDeleteChord,
    mutateUploadChord,
  } = useChordHandling();

  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(updateChordSchema),
  });

  const preview = watch("chordImageUrl");

  const handleUploadChord = (
    files: FileList,
    onChange: (files: FileList | undefined) => void
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadChord({
        file: files[0],
        callback: (fileUrl: string) => setValue("chordImageUrl", fileUrl),
      });
    }
  };

  const handleDeleteChord = (
    onChange: (files: FileList | undefined) => void
  ) => {
    const fileUrl = getValues("chordImageUrl");
    if (typeof fileUrl === "string" && fileUrl) {
      mutateDeleteChord({
        fileUrl,
        callback: () => onChange(undefined),
      });
    }
  };
  return {
    control,
    errors,
    preview,
    handleSubmit,
    reset,
    handleUploadChord,
    handleDeleteChord,
    isPendingDeleteChord,
    isPendingUploadChord,
  };
}
