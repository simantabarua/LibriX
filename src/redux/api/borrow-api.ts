import type { BorrowType } from "@/types/borrowTypes";
import { baseApi } from "./base-api";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<BorrowType, Omit<BorrowType, "_id">>({
      query: (borrow) => ({
        url: `/borrow`,
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["Books"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
    }),
  }),
});
export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
