import { cn } from "@/utils/cn";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { CiSaveUp2 } from "react-icons/ci";
import { FaTrashCan } from "react-icons/fa6";

interface InputFileProps {
  errorMessage?: string;
  isError?: boolean;
  isDropable?: boolean;
  isDeleting?: boolean;
  isUploading?: boolean;
  name: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  preview?: string;
}

export default function InputFile(props: InputFileProps) {
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);
  const {
    errorMessage,
    isDropable = false,
    isUploading,
    isDeleting,
    isError,
    name,
    onDelete,
    onUpload,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      if (isDropable) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isDropable]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.files && onUpload) {
        onUpload(e.dataTransfer.files);
      }
    },
    [onUpload]
  );

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);
    }
    return () => {
      dropCurrent?.removeEventListener("dragover", handleDragOver);
      dropCurrent?.removeEventListener("drop", handleDrop);
    };
  }, [handleDragOver, handleDrop]);

  const handleOnUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && onUpload) {
        onUpload(e.target.files);
      }
    },
    [onUpload]
  );

  return (
    <Fragment>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-all ease-in-out hover:bg-gray-100",
          {
            "border-danger-500": isError,
          }
        )}
      >
        {preview && (
          <div className="relative w-full flex flex-col items-center justify-center p-4">
            <div className="mb-2">
              <Image
                src={preview}
                fill
                alt="preview"
                className="!relative rounded"
                onLoad={() => setIsLoadingPreview(true)}
              />
            </div>
            {isLoadingPreview && (
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-danger-100 hover:scale-95 transition-all ease-in-out duration-200"
              >
                {isDeleting ? (
                  <Spinner size="sm" color="warning" />
                ) : (
                  <FaTrashCan className="h-5 w-5 text-danger-600" />
                )}
              </button>
            )}
          </div>
        )}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop or click to upload your file"
                : "Click to upload your file"}
            </p>
          </div>
        )}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner size="md" color="warning" />
          </div>
        )}
        <input
          accept="image/*"
          className="hidden"
          disabled={preview !== ""}
          id={`dropzone-file-${dropzoneId}`}
          name={name}
          onChange={handleOnUpload}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
          type="file"
        />
      </label>
      {isError && (
        <p className="mt-2 text-sm text-danger-500">{errorMessage}</p>
      )}
    </Fragment>
  );
}
