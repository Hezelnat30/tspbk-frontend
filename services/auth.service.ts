import endpoint from "@/constants/endpoint.constant";
import apiInstance from "@/libs/axios/instance";
import { ISignin } from "@/types/Auth";
import { AxiosResponse } from "axios";

const { AUTH } = endpoint;

const authServices = {
  signin: (payload: ISignin): Promise<AxiosResponse<ApiResponse<any>>> =>
    apiInstance.post(`${AUTH}/signin`, payload),
  signup: (payload: ISignin): Promise<AxiosResponse<ApiResponse<any>>> =>
    apiInstance.post(`${AUTH}/signup`, payload),
  getProfileWithToken: (
    token: string
  ): Promise<AxiosResponse<ApiResponse<any>>> =>
    apiInstance.get(`${AUTH}/get-user`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default authServices;
