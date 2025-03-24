import { Spinner } from "@heroui/react";

export default function LoadingContent() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-primary-gray/20 backdrop-blur-sm">
      <Spinner color="white" />
    </div>
  );
}
