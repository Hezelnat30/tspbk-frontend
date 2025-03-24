"use client";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants";
import useDebounce from "@/hooks/useDebounce";
import songService from "@/services/song.service";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function useSongs() {
  const [selectedSong, setSelectedSong] = useState<string>("");
  const router = useRouter();
  const debounce = useDebounce();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLimit = searchParams.get("limit") || LIMIT_DEFAULT;
  const currentPage = searchParams.get("page") || PAGE_DEFAULT;
  const currentSearch = searchParams.get("search") || "";

  const setURL = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleChangePage = (page: number) => {
    setURL({ page: String(page) });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setURL({
      limit: e.target.value,
      page: String(PAGE_DEFAULT),
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      setURL({
        search: search || null,
        page: String(PAGE_DEFAULT),
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    setURL({
      search: null,
      page: String(PAGE_DEFAULT),
    });
  };

  const getSongs = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const response = await songService.getSongs(params);
    const { data } = response;
    return data;
  };

  const {
    data: dataSong,
    isLoading: isLoadingSong,
    isRefetching: isRefetchingSong,
    refetch: refetchSong,
  } = useQuery({
    queryKey: ["Song", currentLimit, currentPage, currentSearch],
    queryFn: () => getSongs(),
    enabled: !!currentLimit && !!currentPage,
  });

  return {
    currentLimit,
    currentPage,
    currentSearch,
    dataSong,
    isLoadingSong,
    isRefetchingSong,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    refetchSong,
    setURL,
    selectedSong,
    setSelectedSong,
  };
}
