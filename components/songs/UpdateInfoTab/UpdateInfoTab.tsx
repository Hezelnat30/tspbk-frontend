import { ISong } from "@/types/Song";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useUpdateInfoTab from "./useUpdateInfoTab";

interface UpdateInfoTabProps {
  data: ISong | undefined;
  onUpdate: (data: ISong) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

export default function UpdateInfoTab(props: UpdateInfoTabProps) {
  const { back } = useRouter();
  const { onUpdate, data, isPendingUpdate, isSuccessUpdate } = props;
  const { control, errors, handleSubmit, isDirty, isValid, reset, setValue } =
    useUpdateInfoTab();

  useEffect(() => {
    if (data) {
      setValue("title", `${data.title}`);
      setValue("artist", `${data.artist}`);
      setValue("youtubeUrl", `${data.youtubeUrl}`);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccessUpdate) {
      reset();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="shadow-md w-full md:w-1/2 max-w-lg border min-h-[calc(100vh-10.3rem)] border-gray-200 rounded-xl">
      <CardHeader className="border-b border-gray-100 p-4 bg-primary-lightgray">
        <div className="flex flex-col justify-center items-start w-full">
          <h2 className="text-lg font-bold text-primary-gray">Info Song</h2>
          <p className="text-gray-500 text-sm">
            Manage and update your detail song
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form
          id="info-form"
          onSubmit={handleSubmit(onUpdate)}
          className="p-2 gap-2 flex flex-col w-full justify-center overflow-auto"
        >
          <Skeleton isLoaded={!!data?.title}>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  labelPlacement="outside"
                  errorMessage={errors.title?.message}
                  isInvalid={errors.title !== undefined}
                  type="text"
                  variant="bordered"
                  size="md"
                  classNames={{ inputWrapper: "py-6 px-3.5" }}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!data?.artist}>
            <Controller
              control={control}
              name="artist"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Artist"
                  labelPlacement="outside"
                  classNames={{ inputWrapper: "py-6 px-3.5" }}
                  errorMessage={errors.artist?.message}
                  isInvalid={errors.artist !== undefined}
                  type="text"
                  variant="bordered"
                  size="md"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!data?.youtubeUrl}>
            <Controller
              control={control}
              name="youtubeUrl"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Youtube References"
                  labelPlacement="outside"
                  classNames={{ inputWrapper: "py-6 px-3.5" }}
                  errorMessage={errors.youtubeUrl?.message}
                  isInvalid={errors.youtubeUrl !== undefined}
                  type="text"
                  variant="bordered"
                  size="md"
                />
              )}
            />
          </Skeleton>
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
            form="info-form"
            disabled={isPendingUpdate || !isDirty || !isValid}
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
