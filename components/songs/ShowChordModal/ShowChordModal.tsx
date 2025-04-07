import { useSongStore } from "@/store/song.store";
import { Modal, ModalBody, ModalContent, Skeleton } from "@heroui/react";
import Image from "next/image";
import useShowChordModal from "./useShowChordModal";

interface ShowChordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

export default function ShowChordModal(props: ShowChordModalProps) {
  const { isOpen, onClose, onOpenChange } = props;
  const { setSelectedSong } = useSongStore();
  const { dataSong } = useShowChordModal();
  const data = dataSong?.data;

  const handleOnClose = () => {
    setSelectedSong("");
    onClose();
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={handleOnClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalBody>
          <Skeleton
            isLoaded={!!data?.chordImageUrl}
            className="aspect-auto rounded w-full h-auto"
          >
            {data?.chordImageUrl && (
              <Image
                src={`${data.chordImageUrl}`}
                alt="chord-image"
                layout="responsive"
                width={300}
                height={100}
                className="rounded"
              />
            )}
          </Skeleton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
