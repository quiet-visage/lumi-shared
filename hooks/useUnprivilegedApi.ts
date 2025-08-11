import axios from "axios";
import { Context, useContext, useMemo } from "react";

export const useUnprivilegedApi = (tokenContext: Context<string>) => {
  const token = useContext(tokenContext);

  const apiClient = useMemo(() => {
    const client = axios.create({
      baseURL: "http://" + process.env.API_HOST,
    });
    client.interceptors.request.use((config) => {
      config.headers.Authorization = token;
      return config;
    });
    return client;
  }, [token]);

  return apiClient;
};
