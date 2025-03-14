import environment from "@/config/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const apiInstance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

apiInstance.interceptors.request.use(
  async (request) => {
    const session: Session | null = await getSession();

    if (session && session.user?.accessToken) {
      request.headers.Authorization = `Bearer ${session.user?.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiInstance;
