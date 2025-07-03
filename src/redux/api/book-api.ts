import { baseApi } from "./base-api";
import type {
  BooksResponse,
  BookType,
  GetBooksParams,
} from "@/types/bookTypes";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<BooksResponse, GetBooksParams>({
      query: ({ filter, sortBy, sort, limit = 8, page = 1 } = {}) => ({
        url: "/books",
        params: { filter, sortBy, sort, limit, page },
      }),
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
    getGenres: builder.query({
      query: () => "/books/genres",
      providesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetGenresQuery,
} = bookApi;
