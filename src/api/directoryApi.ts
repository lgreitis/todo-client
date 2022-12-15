import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { TreeElement } from "../types";
import customFetchBase from "../utils/customFetchBase";

interface Direcory {
  id: string;
  name: string;
  parentId: string;
  type: "file" | "folder";
}

const transformResponseData = (data: { items: Direcory[] }) =>
  data.items.map((el) => {
    return {
      key: el.id,
      title: el.name,
      parentId: el.parentId,
      type: el.type,
      children: [],
      isLeaf: el.type === "file",
    };
  });

export const directoryApi = createApi({
  reducerPath: "directoryApi",
  baseQuery: customFetchBase,
  tagTypes: ["directory"],
  endpoints: (builder) => ({
    getDirectoryRoot: builder.query<TreeElement[], string>({
      query(organizationId) {
        return {
          url: `/directory/${organizationId}`,
          cache: "no-cache",
        };
      },
      transformResponse: (response: { items: Direcory[] }) =>
        transformResponseData(response),
    }),
    getDirectoryItems: builder.query<
      TreeElement[],
      { organizationId: string; parentId: string }
    >({
      query(data) {
        return {
          url: `/directory/${data.organizationId}/${data.parentId}`,
          cache: "no-cache",
        };
      },
      transformResponse: (response: { items: Direcory[] }) =>
        transformResponseData(response),
    }),
    createDirectoryItem: builder.mutation<
      TreeElement[],
      {
        name: string;
        type: "file" | "folder";
        organizationId: string;
        parentId?: string;
      }
    >({
      query: (data) => ({
        url: "/directory",
        cache: "no-cache",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { items: Direcory[] }) =>
        transformResponseData(response),
    }),
    editDirectoryItem: builder.mutation<
      TreeElement[],
      {
        name: string;
        type: "file" | "folder";
        id: string;
      }
    >({
      query: (data) => ({
        url: "/directory",
        cache: "no-cache",
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: { items: Direcory[] }) =>
        transformResponseData(response),
    }),
    deleteDirectoryItem: builder.mutation<
      TreeElement[],
      {
        type: "file" | "folder";
        id: string;
      }
    >({
      query: (data) => ({
        url: `/directory/${data.id}/${data.type}`,
        cache: "no-cache",
        method: "DELETE",
      }),
      transformResponse: (response: { items: Direcory[] }) =>
        transformResponseData(response),
    }),
  }),
});

export const {
  useGetDirectoryRootQuery,
  useCreateDirectoryItemMutation,
  useEditDirectoryItemMutation,
  useDeleteDirectoryItemMutation,
} = directoryApi;
