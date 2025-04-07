import {
  errorToasterStyles,
  successToasterStyles,
} from "@/constants/style.constant";
import songService from "@/services/song.service";
import { ISong } from "@/types/Song";
import { addToast } from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useDetailUpdateSong() {
  const { id } = useParams();

  const updateSong = async (payload: ISong) => {
    const { data } = await songService.updateSong(payload, `${id}`);
    const message = data?.meta.message;

    return { data, message };
  };

  const {
    mutate: mutateUpdateSong,
    isPending: isPendingUpdateSong,
    isSuccess: isSuccessUpdateSong,
  } = useMutation({
    mutationFn: (payload: ISong) => updateSong(payload),
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

  const getSongById = async (id: string) => {
    const { data } = await songService.getSongById(id);
    return data;
  };

  const { data: dataSong, refetch: refetchSongById } = useQuery({
    queryKey: ["Song", id],
    queryFn: () => getSongById(`${id}`),
    enabled: !!id,
  });

  const handleUpdateSong = (data: ISong) => mutateUpdateSong(data);

  return {
    dataSong,
    refetchSongById,
    handleUpdateSong,
    isPendingUpdateSong,
    isSuccessUpdateSong,
  };
}
