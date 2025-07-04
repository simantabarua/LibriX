import GenreSelect from "@/components/GenreSelect";
import PageHeader from "@/components/PageHeader";
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
import { useAddBookMutation } from "@/redux/api/book-api";
import type { BookType } from "@/types/bookTypes";
import { Loader2, Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

type FormBook = Omit<BookType, "_id" | "available">;

export default function CreateBook() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormBook>();
  const navigate = useNavigate();

  const [addBook, { isLoading: isAdding, error }] = useAddBookMutation();
  const onSubmit = async (data: FormBook) => {
    try {
      await addBook(data).unwrap();
      toast.success("Book added successfully!", {
        description: `${data.title} by ${data.author}`,
      });
      navigate("/");
      reset();
    } catch (error) {
      toast.error("Failed to add book. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Create Book"
        description="Fill out the form below to add a new book to the library"
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
          <CardDescription>Enter the details for the new book</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">Title is required</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  {...register("author", { required: true })}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">Author is required</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Controller
                  name="genre"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value && value !== "All"
                        ? true
                        : "Please select a valid genre",
                  }}
                  render={({ field }) => (
                    <GenreSelect
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.genre && (
                  <p className="text-red-500 text-sm">{errors.genre.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  {...register("isbn", { required: true })}
                  placeholder="Enter ISBN"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm">ISBN is required</p>
                )}

                {error && "data" in error && (
                  // @ts-expect-error ignore
                  <p className="text-red-500 text-sm">{error.data?.message}</p>
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
              <Button type="submit" disabled={isAdding} className="flex-1">
                {isAdding ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Adding book...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Book
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
  );
}
