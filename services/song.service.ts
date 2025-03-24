import endpoint from "@/constants/endpoint.constant";
import apiInstance from "@/libs/axios/instance";
import { ISong, Song } from "@/types/Song";
import { AxiosResponse } from "axios";

const { SONG } = endpoint;

const songService = {
  getSongs: (params?: string): Promise<AxiosResponse<ApiResponse<Song>>> =>
    apiInstance.get(`${SONG}s?${params}`),
  addSong: (payload: ISong): Promise<AxiosResponse<ApiResponse<Song>>> =>
    apiInstance.post(`${SONG}/add`, payload),
};

export default songService;
