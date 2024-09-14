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
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
