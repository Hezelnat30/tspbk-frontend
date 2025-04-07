import songService from "@/services/song.service";
import { useSongStore } from "@/store/song.store";
import { useQuery } from "@tanstack/react-query";

export default function useShowChordModal() {
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
  return {
    dataSong,
  };
}
