export interface BookType {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
export interface GetBooksParams {
  filter?: string;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
}
export interface BooksResponse {
  data: BookType[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
