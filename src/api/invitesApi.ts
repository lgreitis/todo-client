import { createApi } from "@reduxjs/toolkit/query/react";
import { Invite, InviteExtended } from "../types";
import customFetchBase from "../utils/customFetchBase";

export const inviteApi = createApi({
  reducerPath: "invitesApi",
  baseQuery: customFetchBase,
  tagTypes: ["invites", "invite"],
  endpoints: (builder) => ({
    getInvite: builder.query<Invite, string>({
      query(inviteId) {
        return {
          url: `/invite/${inviteId}`,
          cache: "no-cache",
        };
      },
      transformResponse: (result: Invite) => result,
      providesTags: ["invite"],
    }),
    getOrganizationInvites: builder.query<InviteExtended[], string>({
      query(organizationId) {
        return {
          url: `/invite/organization/${organizationId}`,
          cache: "no-cache",
        };
      },
      transformResponse: (result: InviteExtended[]) => result,
      providesTags: ["invites"],
    }),
    addUser: builder.mutation<void, string>({
      query: (inviteId) => ({
        url: "/invite/addUser",
        method: "POST",
        body: { inviteId },
      }),
    }),
    createInvite: builder.mutation<
      Invite,
      { organizationId: string; expirationDate: number }
    >({
      query: ({ organizationId, expirationDate }) => ({
        url: "/invite",
        method: "POST",
        body: { organizationId, expirationDate },
      }),
      invalidatesTags: ["invites"],
    }),
    editInvite: builder.mutation<
      Invite,
      { id: string; expirationDate: number; disabled: boolean }
    >({
      query: (data) => ({
        url: "/invite",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["invites"],
    }),
  }),
});

export const {
  useGetInviteQuery,
  useAddUserMutation,
  useCreateInviteMutation,
  useGetOrganizationInvitesQuery,
  useEditInviteMutation,
} = inviteApi;
