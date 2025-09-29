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

//Helper success
const messageSuccess = (res?: string | object[]) => {
  if (typeof res === "string") {
    toast.success(res, { position: "top-center" });
  } else if (Array.isArray(res)) {
    res.forEach((message) => {
      if (typeof message === "string") {
        toast.success(message, { position: "top-center" });
      }
    });
  }
};

// Helper error
const messageError = (
  res?: string | Array<string | string[]> | Record<string, string[]>
) => {
  if (typeof res === "string") {
    toast.error(res, { position: "top-center" });
  } else if (Array.isArray(res)) {
    res.forEach((item) => {
      if (typeof item === "string")
        toast.error(item, { position: "top-center" });
      else
        item.forEach((message) =>
          toast.error(message, { position: "top-center" })
        );
    });
  } else if (res && typeof res === "object") {
    Object.values(res).forEach((messages) => {
      messages.forEach((message) =>
        toast.error(message, { position: "top-center" })
      );
    });
  }
};

// Factory
export function createGlobalStore<
  TResponse,
  TResource extends string,
  TRequest = Partial<TResponse> | FormData
>(
  resource: TResource,
  allowedMethods: AllowedMethods = ["read", "create", "update", "delete"],
  callback?: (res: ResponseType<TResponse>) => void
) {
  type StoreType = GlobalState<TResource, TResponse>;
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
    const query: UseQueryResult<ResponseType<TResponse>> = useQuery({
      queryKey: [resource, options?.id, options?.params],
      queryFn: async () => {
        const url = options?.id
          ? `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${options.id}`
          : `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}`;

        // NOTE: only one generic for axios -> response data type
        const { data } = await useAxios.get<ResponseType<TResponse>>(url, {
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
      ResponseType<TResponse>,
      AxiosError<{ message: string | string[] }>,
      TRequest
    > = useMutation({
      // explicitly indicate return type is ResponseType<TResponse>
      mutationFn: async (payload): Promise<ResponseType<TResponse>> => {
        if (!allowedMethods.includes("create")) {
          throw new Error("Method not allowed");
        }

        // IMPORTANT: only provide the response-data generic for axios
        const response = await useAxios.post<ResponseType<TResponse>>(
          `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}`,
          payload
        );
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [resource] });
        useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
        if (data?.success && data?.message) {
          messageSuccess(data.message);
        }

        callback?.(data);
      },
      onError: (error) => {
        messageError(error.response?.data?.message);
      },
    });

    // UPDATE
    const updateMutation: UseMutationResult<
      ResponseType<TResponse>,
      AxiosError<{ message: string | string[] }>,
      { id: string | number; payload: TRequest }
    > = useMutation({
      mutationFn: async ({ id, payload }): Promise<ResponseType<TResponse>> => {
        if (!allowedMethods.includes("update")) {
          throw new Error("Method not allowed");
        }

        const response = await useAxios.put<ResponseType<TResponse>>(
          `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${id}`,
          payload
        );
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [resource] });
        useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
        if (data?.success && data?.message) {
          messageSuccess(data.message);
        }
        callback?.(data);
      },
      onError: (error) => {
        messageError(error.response?.data?.message);
      },
    });

    // DELETE
    const deleteMutation: UseMutationResult<
      ResponseType<TResponse>,
      AxiosError<{ message: string | string[] }>,
      string | number
    > = useMutation({
      mutationFn: async (id): Promise<ResponseType<TResponse>> => {
        if (!allowedMethods.includes("delete")) {
          throw new Error("Method not allowed");
        }

        const response = await useAxios.delete<ResponseType<TResponse>>(
          `${import.meta.env.VITE_PUBLIC_BASE_URL}/${resource}/${id}`
        );
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [resource] });
        useGlobalStore.setState({ [alias]: data } as unknown as StoreType);
        if (data?.success && data?.message) {
          messageSuccess(data.message);
        }
        callback?.(data);
      },
      onError: (error) => {
        messageError(error.response?.data?.message);
      },
    });

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
