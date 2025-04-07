import InputFile from "@/components/ui/InputFile";
import { ISong } from "@/types/Song";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useUpdateChordTab from "./useUpdateChordTab";

interface UpdateChordTabProps {
  data: any;
  onUpdate: (data: ISong) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

export default function UpdateChordTab(props: UpdateChordTabProps) {
  const { back } = useRouter();
  const { data, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    control,
    errors,
    handleDeleteChord,
    handleUploadChord,
    handleSubmit,
    isPendingDeleteChord,
    isPendingUploadChord,
    preview,
    reset,
  } = useUpdateChordTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      reset();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="shadow-md w-full md:w-1/2 max-w-lg border min-h-[calc(100vh-10.3rem)] max-h-[calc(100vh-10.3rem)] border-gray-200 rounded-xl">
      <CardHeader className="border-b border-gray-100 p-4 bg-primary-lightgray">
        <div className="flex flex-col justify-center items-start w-full">
          <h2 className="text-lg font-bold text-primary-gray">Chord Song</h2>
          <p className="text-gray-500 text-sm">
            Manage and update your chord song
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form
          id="chord-form"
          className="p-2 gap-2 flex flex-col justify-between items-center overflow-auto"
          onSubmit={handleSubmit(onUpdate)}
        >
          <div className="w-full max-w-lg flex justify-center">
            <Skeleton
              isLoaded={
                !!data?.data.chordImageUrl ||
                data?.data.chordImage !== undefined
              }
              className="aspect-auto rounded w-full h-auto"
            >
              {data?.data.chordImageUrl && (
                <Image
                  src={data?.data.chordImageUrl}
                  alt="chord-image"
                  layout="responsive"
                  width={300}
                  height={100}
                  className="rounded"
                />
              )}
            </Skeleton>
          </div>
          <div className="w-full flex flex-col items-center mt-1">
            <h3 className="text-left text-base w-full font-medium mb-1">
              Upload a new chord
            </h3>
            <Controller
              control={control}
              name="chordImageUrl"
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  errorMessage={errors.chordImageUrl?.message}
                  isError={!!errors.chordImageUrl}
                  name="chordImage"
                  isDropable={true}
                  isUploading={isPendingUploadChord}
                  isDeleting={isPendingDeleteChord}
                  preview={typeof preview === "string" ? preview : ""}
                  onUpload={(files) => handleUploadChord(files, onChange)}
                  onDelete={() => handleDeleteChord(onChange)}
                />
              )}
            />
          </div>
        </form>
      </CardBody>
      <CardFooter className="bg-primary-lightgray p-4 border-t border-gray-200">
        <div className="flex justify-end items-center w-full space-x-2">
          <Button
            onPress={() => back()}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
          >
            Cancel
          </Button>
          <Button
            form="chord-form"
            disabled={isPendingDeleteChord || isPendingUpdate || !preview}
            type="submit"
            className="px-4 py-2 bg-primary-yellow border border-transparent rounded-md text-sm font-medium text-primary-gray hover:bg-primary-lightyellow disabled:bg-default-200 flex items-center transition-colors"
          >
            {isPendingUpdate ? (
              <span className="flex gap-2 justify-center">
                Updating <Spinner size="sm" color="white" />
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
