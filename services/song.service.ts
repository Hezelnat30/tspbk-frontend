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
  getSongById: (id: string): Promise<AxiosResponse<ApiResponse<Song>>> =>
    apiInstance.get(`${SONG}/${id}`),
  updateSong: (
    payload: ISong,
    id: string
  ): Promise<AxiosResponse<ApiResponse<Song>>> =>
    apiInstance.put(`${SONG}/update/${id}`, payload),
  deleteSong: (id: string): Promise<AxiosResponse<ApiResponse<Song>>> =>
    apiInstance.delete(`${SONG}/delete/${id}`),
};

export default songService;
