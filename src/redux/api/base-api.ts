import type { BookType } from "@/types/bookTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api-node.vercel.app/api",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBook: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    addBook: builder.mutation<BookType, Omit<BookType, "_id" | "available">>({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
    updateBook: builder.mutation<
      BookType,
      { id: string; book: Omit<BookType, "_id" | "available"> }
    >({
      query: ({ id, book }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBookQuery,
  useUpdateBookMutation,
  useAddBookMutation,
  useGetBookByIdQuery,
  useDeleteBookMutation,
} = baseApi;
