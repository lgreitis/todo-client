import { createApi } from "@reduxjs/toolkit/query/react";
import { Tokens } from "../types";
import customFetchBase from "../utils/customFetchBase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    postLogin: builder.mutation<Tokens, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: Tokens) => {
        return response;
      },
    }),
    postRegister: builder.mutation<
      Tokens,
      { email: string; username: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: Tokens) => {
        return response;
      },
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = authApi;
