"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { useAxios } from "./axiosInterceptors";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { ResponseType } from "@/types/reponse";

interface GlobalState {
  selectedId: string | number | null;
  formMode: "create" | "update" | null;
  setSelectedId: (id: string | number | null) => void;
  setFormMode: (mode: "create" | "update" | null) => void;
}

const messageError = (res?: string | Array<string[]> | Array<string>) => {
  if (res && typeof res !== "string") {
    res.map((child) => {
      if (typeof child !== "string") {
        child.map((children) => toast.error(children));
      }
    });
  } else if (res) {
    toast.error(res);
  }
};

export interface GlobalStoreProps<T> {
  query: ReturnType<typeof useQuery<ResponseType<T>>>;
  createMutation: ReturnType<
    typeof useMutation<ResponseType<T>, unknown, Partial<T>>
  >;
  updateMutation: ReturnType<
    typeof useMutation<
      ResponseType<T>,
      unknown,
      { id: string | number; payload: Partial<T> }
    >
  >;
  deleteMutation: ReturnType<
    typeof useMutation<ResponseType<T>, unknown, string | number>
  >;
  useGlobalStore: () => GlobalState;
}

export function createGlobalStore<T>(
  resource: string,
  callback?: (res: ResponseType<T>) => void,
  allowedMethods: Array<"read" | "create" | "update" | "delete"> = [
    "read",
    "create",
    "update",
    "delete",
  ]
) {
  const useGlobalStore = create<GlobalState>((set) => ({
    selectedId: null,
    formMode: null,
    setSelectedId: (id) => set({ selectedId: id }),
    setFormMode: (mode) => set({ formMode: mode }),
  }));

  const useCrud = (options?: {
    id?: string | number;
    params?: Record<string, undefined>;
  }) => {
    const queryClient = useQueryClient();

    const query = useQuery<ResponseType<T>>({
      queryKey: [resource, options?.id, options?.params],
      queryFn: async () => {
        const url = options?.id
          ? `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${options.id}`
          : `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}`;

        const { data } = await useAxios.get<ResponseType<T>>(url, {
          params: options?.params,
        });
        callback?.(data);
        return data;
      },
      retry: false,
      enabled: allowedMethods.includes("read"),
    });

    const createMutation = useMutation<ResponseType<T>, unknown, Partial<T>>({
      mutationFn: async (payload) => {
        const { data } = await useAxios.post<ResponseType<T>>(
          `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}`,
          payload
        );
        return data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [resource] });
        callback?.(data);
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message: string | string[] }>;
        messageError(axiosError.response?.data?.message);
      },
      retry: false,
    });

    const updateMutation = useMutation<
      ResponseType<T>,
      unknown,
      { id: string | number; payload: Partial<T> }
    >({
      mutationFn: async ({ id, payload }) => {
        const { data } = await useAxios.put<ResponseType<T>>(
          `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${id}`,
          payload
        );
        return data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [resource] });
        callback?.(data);
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message: string | string[] }>;
        messageError(axiosError.response?.data?.message);
      },
      retry: false,
    });

    const deleteMutation = useMutation<
      ResponseType<T>,
      unknown,
      string | number
    >({
      mutationFn: async (id) => {
        const { data } = await useAxios.delete<ResponseType<T>>(
          `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${id}`
        );
        return data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [resource] });
        callback?.(data);
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError<{ message: string | string[] }>;
        messageError(axiosError.response?.data?.message);
      },
      retry: false,
    });

    return {
      query,
      createMutation,
      updateMutation,
      deleteMutation,
      useGlobalStore,
    };
  };

  return useCrud;
}
