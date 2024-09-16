/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../../redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation<any, any>({
      query: (userInfo) => {
        console.log("User Info in Mutation =>", userInfo); // Log to verify
        return {
          url: "/auth/signup",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    getUsers: builder.query<any, any>({
      query: () => {
        // Log to verify
        return {
          url: "/auth",
          method: "GET",
        };
      },
      providesTags: ["Room"],
    }),
    updateUser: builder.mutation<any, any>({
      query: ({ role, id }) => {
        return {
          url: `/auth/role/${id}`,
          method: "PATCH",
          body: { role },
        };
      },
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} = authApi;
