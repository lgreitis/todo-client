import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi } from "./api/authApi";
import { directoryApi } from "./api/directoryApi";
import { inviteApi } from "./api/invitesApi";
import { organizationApi } from "./api/organizationApi";
import { userApi } from "./api/userApi";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth: authSlice,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [inviteApi.reducerPath]: inviteApi.reducer,
    [directoryApi.reducerPath]: directoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(organizationApi.middleware)
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(directoryApi.middleware)
      .concat(inviteApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
