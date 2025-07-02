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
import { useAddBookMutation } from "@/redux/api/base-api";
import type { BookType } from "@/types/bookTypes";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

type FormBook = Omit<BookType, "_id" | "available">;

export default function CreateBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormBook>();

  const [addBook] = useAddBookMutation();

  const onSubmit = async (data: FormBook) => {
    try {
      await addBook(data).unwrap();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Book Information</CardTitle>
            <CardDescription>
              Enter the details for the new book
            </CardDescription>
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
                    {...register("isbn", { required: true })}
                    placeholder="Enter ISBN"
                  />
                  {errors.isbn && (
                    <p className="text-red-500 text-sm">ISBN is required</p>
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
                <Button type="submit" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Book
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
