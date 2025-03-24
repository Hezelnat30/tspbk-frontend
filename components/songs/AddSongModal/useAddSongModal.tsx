import {
  errorToasterStyles,
  successToasterStyles,
} from "@/constants/style.constant";
import useChordHandling from "@/hooks/useChordHandling";
import { addSongSchema } from "@/libs/schema";
import songService from "@/services/song.service";
import { ISong } from "@/types/Song";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function useAddSongModal() {
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
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addSongSchema),
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
    if (typeof fileUrl === "string") {
      mutateDeleteChord({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    const fileUrl = getValues("chordImageUrl");
    if (typeof fileUrl === "string") {
      mutateDeleteChord({
        fileUrl,
        callback: () => {
          reset();
          onClose();
        },
      });
    } else {
      reset();
      onClose();
    }
  };

  const addSong = async (payload: ISong) => {
    const response = await songService.addSong(payload);
    const message = response.data.meta.message;
    return { response, message };
  };

  const {
    mutate: mutateAddSong,
    isPending: isPendingAddSong,
    isSuccess: isSuccessAddSong,
  } = useMutation({
    mutationFn: addSong,
    onError: (error) => {
      addToast({
        title: error.message,
        ...errorToasterStyles,
      });
      reset();
    },
    onSuccess: ({ message }) => {
      addToast({
        title: message,
        ...successToasterStyles,
      });
      reset();
    },
  });

  const handleAddSong = (data: ISong) => mutateAddSong(data);

  return {
    control,
    errors,
    handleSubmit,
    handleOnClose,
    handleAddSong,
    isPendingAddSong,
    isSuccessAddSong,
    handleUploadChord,
    isPendingUploadChord,
    handleDeleteChord,
    isPendingDeleteChord,
    reset,
    preview,
  };
}
