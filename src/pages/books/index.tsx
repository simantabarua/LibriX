import { BookOpen, Grid3X3, List, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { BookType } from "@/types/bookTypes";
import { useGetBooksQuery } from "@/redux/api/book-api";

import BookActions from "../../components/BookActions";
import { BookCard } from "@/components/BookCard";
import { cn } from "@/lib/utils";
import BookPagination from "@/components/Pagination";

export default function Books() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [page, setPage] = useState(1);
  const limit = 8;
  const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
  const bookData = data?.data || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                All Books
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                Browse and manage your complete collection
              </p>
            </div>
          </div>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-sm mb-8">
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">
                  Book Collection
                </CardTitle>
              </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <div className="flex bg-slate-100 rounded-lg p-1 justify-center sm:justify-start">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "px-3",
                      viewMode === "list"
                        ? "bg-gray-100 shadow-sm text-gray-600"
                        : "hover:bg-slate-200"
                    )}
                  >
                    <List className="h-4 w-4 mr-1" />
                    List
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "px-3",
                      viewMode === "grid"
                        ? "bg-gray-100 shadow-sm text-gray-600"
                        : "hover:bg-slate-200"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4 mr-1" />
                    Grid
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6">
            {isLoading ? (
              <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Loading book data...
                </span>
              </div>
            ) : isError ? (
              <div className="w-full text-center py-10 text-red-600 font-medium">
                Failed to load books.
              </div>
            ) : bookData.length === 0 ? (
              <div className="w-full text-center py-10 text-gray-500 font-medium">
                No books found.
              </div>
            ) : viewMode === "list" ? (
              // List View
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Inventory</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookData.map((book: BookType) => (
                      <TableRow
                        key={book._id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-slate-50 text-slate-700 border-slate-300"
                          >
                            {book.genre}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-slate-600">
                          {book.isbn}
                        </TableCell>
                        <TableCell>{book.copies}</TableCell>
                        <TableCell>
                          <Badge
                            variant={book.available ? "default" : "secondary"}
                            className={
                              book.available
                                ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                : "bg-slate-100 text-slate-600 border-slate-300"
                            }
                          >
                            {book.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <BookActions
                              id={book._id}
                              available={book.available}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {bookData.map((book: BookType) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <BookPagination
          currentPage={page}
          totalPages={data?.meta?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
