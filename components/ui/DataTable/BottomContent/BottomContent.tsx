import { LIMIT_LIST } from "@/constants";
import { Pagination, Select, SelectItem } from "@heroui/react";
import { ChangeEvent, useMemo } from "react";

interface BottomContentProps {
  currentPage: number;
  limit: string;
  totalPages: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function BottomContent(props: BottomContentProps) {
  const { currentPage, limit, totalPages, onChangeLimit, onChangePage } = props;

  const memoizedBottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        <div className="relative w-28 hidden lg:block">
          <Select
            className="w-full"
            size="md"
            onChange={onChangeLimit}
            endContent={
              <span className="sm:text-xs md:text-sm absolute left-7 top-1/2 -translate-y-1/2">
                / Pages
              </span>
            }
            aria-labelledby="number of rows"
            aria-label="number of rows"
            selectedKeys={[limit]}
          >
            {LIMIT_LIST.map(({ label, value }) => (
              <SelectItem key={value}>{label}</SelectItem>
            ))}
          </Select>
        </div>
        {totalPages > 1 && (
          <Pagination
            classNames={{
              cursor: "bg-primary-yellow hover:bg-primary-yellow",
            }}
            isCompact
            showControls
            page={currentPage}
            total={totalPages}
            loop
            onChange={onChangePage}
          />
        )}
      </div>
    );
  }, [limit, currentPage, totalPages, onChangePage, onChangeLimit]);

  return memoizedBottomContent;
}
