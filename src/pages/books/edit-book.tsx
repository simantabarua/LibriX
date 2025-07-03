import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/base-api";
import type { BookType } from "@/types/bookTypes";
import { Plus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router";
import { useEffect } from "react";

type FormBook = Omit<BookType, "_id" | "available">;

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const bookId = id || "";
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookByIdQuery(bookId);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormBook>();
  const bookData = data?.data;

  useEffect(() => {
    if (bookData) {
      reset({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        isbn: bookData.isbn,
        description: bookData.description,
        copies: bookData.copies,
      });
    }
  }, [bookData, reset]);

  const onSubmit = async (formData: FormBook) => {
    try {
      updateBook({ id: bookId, book: formData }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading book data...</span>
      </div>
    );

  if (isError)
    return <p className="text-center text-red-500">Failed to load book.</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Book</CardTitle>
            <CardDescription>Update book information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    placeholder="Enter book title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    {...register("author", { required: "Author is required" })}
                    placeholder="Enter author name"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm">
                      {errors.author.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    {...register("genre")}
                    placeholder="Enter genre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN *</Label>
                  <Input
                    id="isbn"
                    {...register("isbn", { required: "ISBN is required" })}
                    placeholder="Enter ISBN"
                  />
                  {errors.isbn && (
                    <p className="text-red-500 text-sm">
                      {errors.isbn.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  min="1"
                  {...register("copies", { valueAsNumber: true })}
                  placeholder="Enter number of copies"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter book description"
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isUpdating} className="flex-1">
                  {isUpdating ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Update Book
                    </>
                  )}
                </Button>
                <Link to="/" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
