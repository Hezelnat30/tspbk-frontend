import {
  errorToasterStyles,
  successToasterStyles,
} from "@/constants/style.constant";
import mediaServices from "@/services/media.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

export default function useChordHandling() {
  const uploadChord = async (
    file: File,
    callback: (fileUrl: string) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await mediaServices.uploadChord(formData);
    const {
      data: { secure_url: icon },
    } = response.data;

    callback(icon);
  };

  const { mutate: mutateUploadChord, isPending: isPendingUploadChord } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadChord(variables.file, variables.callback),
      onError: (error) => {
        addToast({
          title: error.message,
          ...errorToasterStyles,
        });
      },
      onSuccess: () => {
        addToast({
          title: "Successfully uploaded",
          ...successToasterStyles,
        });
      },
    });
  // Delete
  const deleteChord = async (fileUrl: string, callback: () => void) => {
    const response = await mediaServices.deleteMedia({ fileUrl });
    if (response.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteChord, isPending: isPendingDeleteChord } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteChord(variables.fileUrl, variables.callback),
      onError: (error) => {
        addToast({
          title: error.message,
          ...errorToasterStyles,
        });
      },
      onSuccess: () => {
        addToast({
          title: "Successfully deleted",
          ...successToasterStyles,
        });
      },
    });

  return {
    mutateUploadChord,
    isPendingUploadChord,
    mutateDeleteChord,
    isPendingDeleteChord,
  };
}
