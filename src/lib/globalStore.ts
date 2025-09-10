"use client";

import { create } from "zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAxios } from "./axiosInterceptors";
import type { ResponseType } from "@/types/reponse";

// Base state
interface BaseGlobalState {
  selectedId: string | number | null;
  formMode: "create" | "update" | null;
  setSelectedId: (id: string | number | null) => void;
  setFormMode: (mode: "create" | "update" | null) => void;
}

// Global state akan punya alias tergantung resource
export type GlobalState<TResource extends string, T> = BaseGlobalState & {
  [K in `${TResource}Data`]: ResponseType<T> | null;
};

type AllowedMethods = Array<"read" | "create" | "update" | "delete">;

// Helper error
const messageError = (
  res?: string | Array<string | string[]> | Record<string, string[]>
) => {
  if (typeof res === "string") {
    toast.error(res);
  } else if (Array.isArray(res)) {
    res.forEach((item) => {
      if (typeof item === "string") toast.error(item);
      else item.forEach((message) => toast.error(message));
    });
  } else if (res && typeof res === "object") {
    Object.values(res).forEach((messages) => {
      messages.forEach((message) => toast.error(message));
    });
  }
};

// Factory
export function createGlobalStore<T, TResource extends string>(
  resource: TResource,
  allowedMethods: AllowedMethods = ["read", "create", "update", "delete"],
  callback?: (res: ResponseType<T>) => void
) {
  type StoreType = GlobalState<TResource, T>;
  const alias = `${resource}Data` as `${TResource}Data`;

  // Zustand store
  const useGlobalStore = create<StoreType>((set) => {
    const baseState: BaseGlobalState = {
      selectedId: null,
      formMode: null,
      setSelectedId: (id) => set({ selectedId: id } as Partial<StoreType>),
      setFormMode: (mode) => set({ formMode: mode } as Partial<StoreType>),
    };

    // tambahkan alias dynamic dengan cast aman
    const initialState = {
      ...baseState,
      [alias]: null,
    } as unknown as StoreType;

    return initialState;
  });

  const useCrud = (options?: {
    id?: string | number;
    params?: Record<string, unknown>;
  }) => {
    const queryClient = useQueryClient();

    // READ
    const query = allowedMethods.includes("read")
      ? useQuery<ResponseType<T>>({
          queryKey: [resource, options?.id, options?.params],
          queryFn: async () => {
            const url = options?.id
              ? `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${
                  options.id
                }`
              : `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}`;

            const { data } = await useAxios.get<ResponseType<T>>(url, {
              params: options?.params,
            });

            useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
            callback?.(data);
            return data;
          },
        })
      : (null as any);

    // CREATE
    const createMutation = allowedMethods.includes("create")
      ? useMutation<ResponseType<T>, unknown, Partial<T>>({
          mutationFn: async (payload) => {
            const { data } = await useAxios.post<ResponseType<T>>(
              `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}`,
              payload
            );
            return data;
          },
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [resource] });
            useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
            callback?.(data);
          },
          onError: (error: unknown) => {
            const axiosError = error as AxiosError<{
              message: string | string[];
            }>;
            messageError(axiosError.response?.data?.message);
          },
        })
      : (null as any);

    // UPDATE
    const updateMutation = allowedMethods.includes("update")
      ? useMutation<
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
            useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
            callback?.(data);
          },
          onError: (error: unknown) => {
            const axiosError = error as AxiosError<{
              message: string | string[];
            }>;
            messageError(axiosError.response?.data?.message);
          },
        })
      : (null as any);

    // DELETE
    const deleteMutation = allowedMethods.includes("delete")
      ? useMutation<ResponseType<T>, unknown, string | number>({
          mutationFn: async (id) => {
            const { data } = await useAxios.delete<ResponseType<T>>(
              `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${id}`
            );
            return data;
          },
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [resource] });
            useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
            callback?.(data);
          },
          onError: (error: unknown) => {
            const axiosError = error as AxiosError<{
              message: string | string[];
            }>;
            messageError(axiosError.response?.data?.message);
          },
        })
      : (null as any);

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
