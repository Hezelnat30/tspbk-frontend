import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchSong: () => void;
}

export default function AddSongModal(props: AddSongModalProps) {
  const { isOpen, onClose, onOpenChange, refetchSong } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
    >
      <form onSubmit={() => console.log("submit")}>
        <ModalContent>
          <ModalHeader>
            <h5 className="font-semibold lg:text-xl">Add Song</h5>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <h6 className="font-medium text-sm lg:text-base">
                Fill in the details below to add a new song
              </h6>
              <Input
                autoFocus
                label="Title"
                type="text"
                variant="faded"
                size="md"
                classNames={{
                  inputWrapper:
                    "focus:outline-none focus:ring-0 focus:border-none !outline-none !ring-0",
                }}
              />
              <Input
                label="Artist"
                type="text"
                variant="faded"
                size="md"
                classNames={{
                  inputWrapper:
                    "focus:outline-none focus:ring-0 focus:border-none !outline-none !ring-0",
                }}
              />
              <Input
                label="Youtube References"
                type="text"
                variant="faded"
                size="md"
                classNames={{
                  inputWrapper:
                    "focus:outline-none focus:ring-0 focus:border-none !outline-none !ring-0",
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex gap-2 justify-center">
              <Button
                onPress={onClose}
                variant="bordered"
                color="danger"
                className="font-semibold"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                fullWidth
                className="font-semibold bg-primary-yellow border border-default-100"
              >
                Add Song
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
