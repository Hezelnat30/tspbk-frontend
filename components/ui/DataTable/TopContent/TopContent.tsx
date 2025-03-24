import { Button, Input } from "@heroui/react";
import { ChangeEvent, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface TopContentProps {
  onClickButtonTopContent?: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  name?: string;
}

export default function TopContent(props: TopContentProps) {
  const { name, onClickButtonTopContent, onChangeSearch, onClearSearch } =
    props;
  const memoizedTopContent = useMemo(() => {
    return (
      <div className="flex flex-row-reverse items-start justify-between gap-4 gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          classNames={{
            inputWrapper: "shadow",
          }}
          placeholder={`Search ${name}`}
          startContent={<CiSearch />}
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {name && (
          <Button
            onPress={onClickButtonTopContent}
            className="bg-gradient-to-r from-primary-yellow to-primary-lightyellow font-medium"
          >
            Add {name}
          </Button>
        )}
      </div>
    );
  }, [onClickButtonTopContent, onChangeSearch, onClearSearch, name]);

  return memoizedTopContent;
}
