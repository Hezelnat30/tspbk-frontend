import { Button, Input } from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface TopContentProps {
  onClickButtonTopContent?: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  name?: string;
  currentSearch: string;
}

export default function TopContent(props: TopContentProps) {
  const {
    name,
    onClickButtonTopContent,
    onChangeSearch,
    onClearSearch,
    currentSearch,
  } = props;

  // Tambahkan state lokal untuk mengelola input
  const [searchValue, setSearchValue] = useState(currentSearch);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  // Handler untuk perubahan input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChangeSearch(e);
  };
  // Handler untuk clear input
  const handleClear = () => {
    setSearchValue("");
    onClearSearch();
  };

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
        onClear={handleClear}
        onChange={handleChange}
        value={searchValue}
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
}
