import { ArrowLeft, BookOpen, Edit, Grid3X3, List, Plus } from "lucide-react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Books() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const filteredBooks = [];
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">All Books</h1>
                <p className="text-slate-600">
                  Browse and manage your complete collection
                </p>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Book Collection
                  </CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  {/* View Toggle Buttons */}
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`px-3 ${
                        viewMode === "list"
                          ? "bg-gray-100 shadow-sm text-gray-600"
                          : "hover:bg-slate-200"
                      }`}
                    >
                      <List className="h-4 w-4 mr-1" />
                      List
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`px-3 ${
                        viewMode === "grid"
                          ? "bg-gray-100 shadow-sm text-gray-600"
                          : "hover:bg-slate-200"
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4 mr-1" />
                      Grid
                    </Button>
                  </div>

                  <Link to="/create-book">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Book
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {viewMode === "list" ? (
                // List View
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="font-semibold text-slate-700">
                          Title
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          Author
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          Genre
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          ISBN
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          Inventory
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.map((book) => (
                        <TableRow
                          key={book.id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <TableCell className="font-semibold text-slate-900">
                            {book.title}
                          </TableCell>
                          <TableCell className="text-slate-700">
                            {book.author}
                          </TableCell>
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
                          <TableCell className="font-medium text-slate-700">
                            {book.available}/{book.copies}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                book.available > 0 ? "default" : "secondary"
                              }
                              className={
                                book.available > 0
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                  : "bg-slate-100 text-slate-600 border-slate-300"
                              }
                            >
                              {book.available > 0 ? "Available" : "Unavailable"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Link to={`/books/${book.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-blue-50 hover:text-blue-700"
                                >
                                  <BookOpen className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link to={`/edit-book/${book.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-blue-50 hover:text-blue-700"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>

                              <Link to={`/borrow/${book.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={book.available === 0}
                                  className="hover:bg-green-50 hover:text-green-700 disabled:opacity-50"
                                >
                                  <BookOpen className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBooks.map((book) => (
                    <Card
                      key={book.id}
                      className="group hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 bg-white"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge
                            variant={
                              book.available > 0 ? "default" : "secondary"
                            }
                            className={
                              book.available > 0
                                ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                                : "bg-slate-100 text-slate-600 border-slate-300"
                            }
                          >
                            {book.available > 0 ? "Available" : "Unavailable"}
                          </Badge>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-slate-700">
                              {book.available}/{book.copies}
                            </div>
                            <div className="text-xs text-slate-500">copies</div>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                          {book.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600 font-medium">
                          by {book.author}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                              Genre:
                            </span>
                            <Badge
                              variant="outline"
                              className="bg-slate-50 text-slate-700 border-slate-300 text-xs"
                            >
                              {book.genre}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                              ISBN:
                            </span>
                            <span className="font-mono text-xs text-slate-600">
                              {book.isbn}
                            </span>
                          </div>
                          {book.description && (
                            <div className="pt-2">
                              <p className="text-sm text-slate-600 line-clamp-3">
                                {book.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
