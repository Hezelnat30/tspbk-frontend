import {
  errorToasterStyles,
  successToasterStyles,
} from "@/constants/style.constant";
import songService from "@/services/song.service";
import { useSongStore } from "@/store/song.store";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useDeleteSongModal() {
  const { selectedSong: id } = useSongStore();
  const getSongById = async (id: string) => {
    const { data } = await songService.getSongById(id);
    return data;
  };

  const { data: dataSong } = useQuery({
    queryKey: ["Song", id],
    queryFn: () => getSongById(`${id}`),
    enabled: !!id,
  });

  const deleteSong = async (id: string) => {
    const result = await songService.deleteSong(id);
    const message = result.data.meta.message;
    return { result, message };
  };

  const {
    mutate: mutateDeleteSong,
    isPending: isPendingDeleteSong,
    isSuccess: isSuccessDeleteSong,
  } = useMutation({
    mutationFn: (id: string) => deleteSong(id),
    onError: (error) => {
      addToast({
        title: error.message,
        ...errorToasterStyles,
      });
    },
    onSuccess: ({ message }) => {
      addToast({
        title: message,
        ...successToasterStyles,
      });
    },
  });

  const handleDeleteSong = () => mutateDeleteSong(`${id}`);

  return {
    dataSong,
    handleDeleteSong,
    isPendingDeleteSong,
    isSuccessDeleteSong,
  };
}
