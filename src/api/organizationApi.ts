import { createApi } from "@reduxjs/toolkit/query/react";
import { Organization } from "../types";
import customFetchBase from "../utils/customFetchBase";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: customFetchBase,
  tagTypes: ["organization", "organizationAll"],
  endpoints: (builder) => ({
    getOrganizations: builder.query<Organization[], void>({
      query() {
        return {
          url: "/organization",
          cache: "no-cache",
        };
      },
      transformResponse: (result: Organization[]) => result,
      providesTags: ["organization"],
    }),
    getOrganization: builder.query<Organization, string>({
      query(id) {
        return {
          url: `/organization/${id}`,
          cache: "no-cache",
        };
      },
      transformResponse: (result: Organization) => result,
    }),
    getOrganizationsSuperAdmin: builder.query<Organization[], void>({
      query() {
        return {
          url: "/organization/superadmin",
          cache: "no-cache",
        };
      },
      transformResponse: (result: Organization[]) => result,
      providesTags: ["organization"],
    }),
    postOrganization: builder.mutation<Organization, { name: string }>({
      query: (body) => ({
        url: "/organization",
        method: "POST",
        body: body,
      }),
      transformResponse: (response: Organization) => response,
      invalidatesTags: ["organization"],
    }),
    editOrganization: builder.mutation<
      Organization,
      { name: string; organizationId: string }
    >({
      query: (body) => ({
        url: "/organization",
        method: "PATCH",
        body: { name: body.name, id: body.organizationId },
      }),
      invalidatesTags: ["organization"],
    }),
    deleteOrganization: builder.mutation<void, string>({
      query: (organizationId) => ({
        url: `/organization/${organizationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["organization"],
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useGetOrganizationsQuery,
  useGetOrganizationsSuperAdminQuery,
  usePostOrganizationMutation,
  useEditOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;
