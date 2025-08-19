// redux/userApi.ts
import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<
      { data: { user: { username: string; email: string } } },
      void
    >({
      query: () => "profile",
    }),
  }),
  overrideExisting: false,
});

export const { useProfileQuery } = userApi;
