"use client";

import useAddSongModal from "@/components/songs/AddSongModal/useAddSongModal";
import InputFile from "@/components/ui/InputFile";
import { useSumStore } from "@/store/sidebar.store";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import { Controller } from "react-hook-form";

export default function Dashboard() {
  const { data: session }: any = useSession();
  const { count, decrement, increment } = useSumStore();
  const {
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
  } = useAddSongModal();
  return (
    <div>
      <h3>Dashboard</h3>
      <div className="flex flex-col gap-2 justify-center">
        <div className="flex gap-2">
          <p className="text-xl font-bold">{count}</p>
          <Button onPress={() => increment(5)} color="default">
            Increment
          </Button>
          <Button onPress={decrement} color="danger">
            Decrement
          </Button>
        </div>
        <Controller
          control={control}
          name="chordImageUrl"
          render={({ field: { onChange, value, ...field } }) => (
            <InputFile
              {...field}
              errorMessage={errors.chordImageUrl?.message}
              isError={errors.chordImageUrl !== undefined}
              isDropable
              isUploading={isPendingUploadChord}
              isDeleting={isPendingDeleteChord}
              onDelete={() => handleDeleteChord(onChange)}
              onUpload={(files) => handleUploadChord(files, onChange)}
              preview={typeof preview === "string" ? preview : ""}
            />
          )}
        />
      </div>
    </div>
  );
}
