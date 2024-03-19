import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UseApiReturnType<T> = {
  response: T | null;
  isLoading: boolean;
  error: string | null;
  makeRequest: (
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data?: object,
    params?: object
  ) => Promise<void>;
};

function useApi<T = unknown>(): UseApiReturnType<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data: object = {},
    params: object = {}
  ) => {
    setIsLoading(true);
    try {
      const options: AxiosRequestConfig = {
        method: method,
        url: `${process.env.REACT_APP_API_BASE_URL}${path}`,
        data: method !== "GET" ? data : undefined,
        params: params,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result = await axios(options);
      setResponse(result.data);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, makeRequest };
}

export default useApi;
