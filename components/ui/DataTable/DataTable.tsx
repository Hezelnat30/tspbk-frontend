import { cn } from "@/utils/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ChangeEvent, Key, ReactNode } from "react";
import BottomContent from "./BottomContent/BottomContent";
import LoadingContent from "./LoadingContent";
import TopContent from "./TopContent";

interface DataTableProps {
  columns: Record<string, unknown>[];
  currentPage: number;
  currentSearch: string;
  data: Record<string, unknown>[];
  isLoading?: boolean;
  limit: string;
  name?: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onClearSearch: () => void;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
}

export default function DataTable(props: DataTableProps) {
  const {
    columns,
    currentPage,
    currentSearch,
    data,
    isLoading,
    limit,
    name,
    onClickButtonTopContent,
    onChangeLimit,
    onChangePage,
    onChangeSearch,
    onClearSearch,
    renderCell,
    totalPages,
  } = props;
  return (
    <Table
      className="mt-4"
      bottomContent={
        <BottomContent
          currentPage={currentPage}
          limit={limit}
          totalPages={totalPages}
          onChangePage={onChangePage}
          onChangeLimit={onChangeLimit}
        />
      }
      bottomContentPlacement="outside"
      topContent={
        <TopContent
          currentSearch={currentSearch}
          onClearSearch={onClearSearch}
          onChangeSearch={onChangeSearch}
          onClickButtonTopContent={onClickButtonTopContent}
          name={name}
        />
      }
      topContentPlacement="outside"
      rowHeight={50}
      maxTableHeight={100}
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key} className="text-center">
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data}
        emptyContent={`No ${name} found`}
        isLoading={isLoading}
        loadingContent={<LoadingContent />}
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell className="h-12">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
