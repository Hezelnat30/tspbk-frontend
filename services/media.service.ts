import endpoint from "@/constants/endpoint.constant";
import apiInstance from "@/libs/axios/instance";
import { IFileURL, MediaResponse } from "@/types/File";
import { AxiosResponse } from "axios";

const { MEDIA } = endpoint;

const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const mediaServices = {
  uploadChord: (
    payload: FormData
  ): Promise<AxiosResponse<ApiResponse<MediaResponse>>> =>
    apiInstance.post(`${MEDIA}/upload-chord`, payload, formDataHeader),
  uploadProfile: (
    payload: FormData
  ): Promise<AxiosResponse<ApiResponse<MediaResponse>>> =>
    apiInstance.post(`${MEDIA}/add-profile`, payload, formDataHeader),
  deleteMedia: (
    payload: IFileURL
  ): Promise<AxiosResponse<ApiResponse<MediaResponse>>> =>
    apiInstance.delete(`${MEDIA}/remove`, { data: payload }),
};

export default mediaServices;
