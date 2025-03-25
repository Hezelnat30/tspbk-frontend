import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddSongModal from "./useAddSongModal";

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSong: () => void;
}

export default function AddSongModal(props: AddSongModalProps) {
  const { isOpen, onClose, onOpenChange, refetchSong } = props;
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
    preview,
  } = useAddSongModal();

  useEffect(() => {
    if (isSuccessAddSong) {
      onClose();
      refetchSong();
    }
  }, [isSuccessAddSong]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      size="md"
    >
      <form onSubmit={handleSubmit(handleAddSong)}>
        <ModalContent>
          <ModalHeader>
            <h5 className="font-semibold lg:text-xl">Add Song</h5>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <h6 className="font-medium text-sm lg:text-base">
                Fill in the details below to add a new song
              </h6>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    errorMessage={errors.title?.message}
                    label="Title"
                    type="text"
                    variant="faded"
                    size="md"
                    classNames={{
                      inputWrapper:
                        "focus:outline-none focus:ring-0 focus:border-none !outline-none !ring-0",
                    }}
                    isInvalid={errors.title !== undefined}
                  />
                )}
              />
              <Controller
                control={control}
                name="artist"
                render={({ field }) => (
                  <Input
                    {...field}
                    errorMessage={errors.artist?.message}
                    label="Artist"
                    type="text"
                    variant="faded"
                    size="md"
                    classNames={{
                      inputWrapper:
                        "focus:outline-none focus:ring-0 focus:border-none !outline-none !ring-0",
                    }}
                    isInvalid={errors.artist !== undefined}
                  />
                )}
              />
              <Controller
                control={control}
                name="youtubeUrl"
                render={({ field }) => (
                  <Input
                    {...field}
                    errorMessage={errors.youtubeUrl?.message}
                    label="Youtube References"
                    type="text"
                    variant="faded"
                    size="md"
                    classNames={{
                      inputWrapper:
                        "focus:outline-none focus:ring-0 focus:border-none !outline-none !ring-0",
                    }}
                    isInvalid={errors.youtubeUrl !== undefined}
                  />
                )}
              />
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
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex gap-2 justify-center">
              <Button
                onPress={() => handleOnClose(onClose)}
                variant="bordered"
                color="danger"
                className="font-semibold"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                className="font-semibold bg-primary-yellow border border-default-100"
              >
                {isPendingAddSong ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Add Song"
                )}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
