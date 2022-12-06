import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { login, logout } from "../slices/authSlice";
import { RootState } from "../store";
import { Tokens } from "../types";

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// FUCK REDUX TOOLKIT QUERY HOLY FUCKING SHIT IT'S FUCKING DOGSHIT WTF
const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (
    (result.error &&
      (result.error?.data as { message: string }).message ===
        "Invalid token") ||
    (result.data as { message: string }).message === "Invalid token"
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const refreshToken = (api.getState() as RootState).auth.refreshToken;

      try {
        const refreshResult = await baseQuery(
          {
            url: "auth/regenerateToken",
            body: { refreshToken },
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Retry the initial query
          const data = refreshResult.data as Tokens;
          api.dispatch(
            login({
              ...data,
            })
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          window.location.href = "/login";
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchBase;
