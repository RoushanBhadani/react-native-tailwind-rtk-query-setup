// redux/authApi.ts
import { api } from "./api";

type LoginResponse = {
  data?: {
    token: string;
    user: { id: string; email: string; username: string };
  };
  message?: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<
      void,
      { username: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation, useLoginMutation } = authApi;
