import { baseApi } from "./base-api";
import type { BookType } from "@/types/bookTypes";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBook: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
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
    updateBook: builder.mutation<
      BookType,
      { id: string; book: Omit<BookType, "_id" | "available"> }
    >({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
