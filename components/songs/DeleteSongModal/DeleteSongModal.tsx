import { useSongStore } from "@/store/song.store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { useEffect } from "react";
import useDeleteSongModal from "./useDeleteSongModal";

interface DeleteSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSong: () => void;
}

export default function DeleteSongModal(props: DeleteSongModalProps) {
  const { isOpen, onClose, onOpenChange, refetchSong } = props;
  const { selectedSong, setSelectedSong } = useSongStore();
  const {
    dataSong,
    handleDeleteSong,
    isPendingDeleteSong,
    isSuccessDeleteSong,
  } = useDeleteSongModal();
  const data = dataSong?.data;

  function handleOnClose() {
    onClose();
    setSelectedSong("");
  }

  useEffect(() => {
    if (isSuccessDeleteSong) {
      refetchSong();
      handleOnClose();
    }
  }, [isSuccessDeleteSong]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleOnClose}
      size="md"
    >
      <ModalContent>
        <ModalHeader>
          <h3>Delete Song</h3>
        </ModalHeader>
        <ModalBody>
          <Skeleton isLoaded={!!data?.title} className="rounded-lg aspect-auto">
            <p className="text-medium">
              Are you sure you want delete <strong>{data?.title}</strong> from
              songbank ?
            </p>
          </Skeleton>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end items-center w-full space-x-2">
            <Button
              onPress={handleOnClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
            >
              Cancel
            </Button>
            <Button
              onPress={handleDeleteSong}
              disabled={!selectedSong || !dataSong || isPendingDeleteSong}
              type="submit"
              className="px-4 py-2 bg-primary-yellow border border-transparent rounded-md text-sm font-medium text-primary-gray hover:bg-primary-lightyellow disabled:bg-default-200 flex items-center transition-colors"
            >
              {isPendingDeleteSong ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
