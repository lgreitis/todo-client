import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../slices/userSlice";
import { User } from "../types";
import customFetchBase from "../utils/customFetchBase";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["user"],

  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query() {
        return {
          url: "/user",
        };
      },
      transformResponse: (result: User) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
