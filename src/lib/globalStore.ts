"use client";

import { create } from "zustand";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
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

    return {
      ...baseState,
      [alias]: null,
    } as StoreType;
  });

  const useCrud = (options?: {
    id?: string | number;
    params?: Record<string, unknown>;
  }) => {
    const queryClient = useQueryClient();

    // READ
    const query: UseQueryResult<ResponseType<T>> = useQuery({
      queryKey: [resource, options?.id, options?.params],
      queryFn: async () => {
        const url = options?.id
          ? `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${options.id}`
          : `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}`;

        const { data } = await useAxios.get<ResponseType<T>>(url, {
          params: options?.params,
        });

        useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
        callback?.(data);
        return data;
      },
      enabled: allowedMethods.includes("read"),
    });

    // CREATE
    const createMutation: UseMutationResult<
      ResponseType<T>,
      AxiosError<{ message: string | string[] }>,
      Partial<T>
    > = useMutation({
      mutationFn: async (payload) => {
        if (!allowedMethods.includes("create")) {
          throw new Error("Method not allowed");
        }
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
      onError: (error) => {
        messageError(error.response?.data?.message);
      },
    });

    // UPDATE
    const updateMutation: UseMutationResult<
      ResponseType<T>,
      AxiosError<{ message: string | string[] }>,
      { id: string | number; payload: Partial<T> }
    > = useMutation({
      mutationFn: async ({ id, payload }) => {
        if (!allowedMethods.includes("update")) {
          throw new Error("Method not allowed");
        }
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
      onError: (error) => {
        messageError(error.response?.data?.message);
      },
    });

    // DELETE
    const deleteMutation: UseMutationResult<
      ResponseType<T>,
      AxiosError<{ message: string | string[] }>,
      string | number
    > = useMutation({
      mutationFn: async (id) => {
        if (!allowedMethods.includes("delete")) {
          throw new Error("Method not allowed");
        }
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
      onError: (error) => {
        messageError(error.response?.data?.message);
      },
    });

    // ✅ Conditional hanya di return, bukan di pemanggilan hook
    return {
      query: allowedMethods.includes("read") ? query : undefined,
      createMutation: allowedMethods.includes("create")
        ? createMutation
        : undefined,
      updateMutation: allowedMethods.includes("update")
        ? updateMutation
        : undefined,
      deleteMutation: allowedMethods.includes("delete")
        ? deleteMutation
        : undefined,
      useGlobalStore,
    };
  };

  return useCrud;
}
