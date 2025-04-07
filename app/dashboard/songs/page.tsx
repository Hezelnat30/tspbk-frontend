"use client";
import AddSongModal from "@/components/songs/AddSongModal/AddSongModal";
import DeleteSongModal from "@/components/songs/DeleteSongModal";
import ShowChordModal from "@/components/songs/ShowChordModal";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_SONGS } from "@/constants/songs.constant";
import { useSongStore } from "@/store/song.store";
import { Tooltip, useDisclosure } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import useSongs from "./useSongs";

export default function Songs() {
  const { push } = useRouter();
  const { setSelectedSong } = useSongStore();
  const {
    currentLimit,
    currentPage,
    currentSearch,
    setURL,
    dataSong,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    isLoadingSong,
    isRefetchingSong,
    refetchSong,
  } = useSongs();

  useEffect(() => {
    setURL({
      page: String(currentPage),
      limit: String(currentLimit),
    });
  }, []);

  const addSongModal = useDisclosure();
  const deleteSongModal = useDisclosure();
  const showChordModal = useDisclosure();

  const renderCell = useCallback(
    (songs: Record<string, unknown>, columnKey: Key): ReactNode => {
      const cellValue = songs[columnKey as keyof typeof songs];
      switch (columnKey) {
        case "title": {
          const title = String(songs.title);
          return <h3 className="text-center">{title}</h3>;
        }
        case "artist": {
          const artist = String(songs.artist);
          return <h3 className="text-center">{artist}</h3>;
        }
        case "chord_image": {
          return (
            <div className="w-full flex justify-center items-center">
              <Tooltip content="View Chord" showArrow>
                <button
                  onClick={() => {
                    showChordModal.onOpen();
                    setSelectedSong(`${songs._id}`);
                  }}
                  className="text-lg text-default-400 cursor-pointer"
                >
                  <FaEye />
                </button>
              </Tooltip>
            </div>
          );
        }
        case "actions":
          return (
            <div className="flex items-center gap-4 justify-center w-full px-4">
              <Tooltip content="Detail Song" showArrow={true}>
                <button
                  onClick={() => push(`/dashboard/songs/${songs._id}`)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <AiOutlineEdit />
                </button>
              </Tooltip>
              <Tooltip color="danger" content="Delete song" showArrow={true}>
                <button
                  onClick={() => {
                    deleteSongModal.onOpen();
                    setSelectedSong(`${songs._id}`);
                  }}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <GoTrash />
                </button>
              </Tooltip>
            </div>
          );
        case "link_reference": {
          const youtubeUrl = String(songs.youtubeUrl);
          return (
            <Link
              target="_blank"
              href={youtubeUrl}
              className="hover:underline w-full block text-center"
            >
              {youtubeUrl}
            </Link>
          );
        }
        default:
          return cellValue as ReactNode;
      }
    },
    [push]
  );

  return (
    <section>
      <DataTable
        columns={COLUMN_LIST_SONGS}
        currentPage={Number(currentPage)}
        currentSearch={currentSearch}
        data={Array.isArray(dataSong?.data) ? dataSong?.data : []}
        isLoading={isLoadingSong || isRefetchingSong}
        name="song"
        limit={String(currentLimit)}
        onChangeLimit={handleChangeLimit}
        onChangePage={handleChangePage}
        onChangeSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onClickButtonTopContent={addSongModal.onOpen}
        renderCell={renderCell}
        totalPages={dataSong?.pagination?.totalPages ?? 0}
      />
      <AddSongModal {...addSongModal} refetchSong={refetchSong} />
      <DeleteSongModal {...deleteSongModal} refetchSong={refetchSong} />
      <ShowChordModal {...showChordModal} />
    </section>
  );
}
