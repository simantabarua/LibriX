import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { useGetBookByIdQuery } from "@/redux/api/book-api";
import { useForm } from "react-hook-form";
import type { BookType } from "@/types/bookTypes";
import { useBorrowBookMutation } from "@/redux/api/borrow-api";
import PageHeader from "@/components/PageHeader";

type BorrowForm = {
  quantity: number;
  dueDate: string;
};

export default function Borrow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookByIdQuery(id || "");
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const book: BookType = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowForm>();

  const onSubmit = async (formData: BorrowForm) => {
    try {
      await borrowBook({ book: id!, ...formData }).unwrap();
      navigate("/borrow-summary");
    } catch (error) {
      console.error("Failed to borrow book:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading book data...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500 text-center">Failed to load book.</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Book not found</h2>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (book.available === false) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Book Unavailable</h2>
            <p className="text-muted-foreground mb-4">
              "{book.title}" is currently not available for borrowing.
            </p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Borrowed Books Summary"
        description="Aggregated view of all borrowed books and their quantities"
      />

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{book.title}</CardTitle>
                <CardDescription>by {book.author}</CardDescription>
              </div>
              <Badge variant="default">{book.available} available</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Genre:</span>
                <span className="ml-2">{book.genre}</span>
              </div>
              <div>
                <span className="text-muted-foreground">ISBN:</span>
                <span className="ml-2 font-mono">{book.isbn}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Borrow Details</CardTitle>
            <CardDescription>Enter the borrowing information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-between gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Minimum quantity is 1" },
                      max: {
                        value: book.copies,
                        message: `Maximum quantity is ${book.copies}`,
                      },
                      valueAsNumber: true,
                    })}
                    placeholder="Enter quantity"
                    disabled={isBorrowing}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-600">
                      {errors.quantity.message}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Maximum available: {book.copies}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    {...register("dueDate", { required: true })}
                    min={new Date().toISOString().split("T")[0]}
                    disabled={isBorrowing}
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-600">Due date is required</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isBorrowing} className="flex-1">
                  {isBorrowing ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Borrowing...
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Borrow Book
                    </>
                  )}
                </Button>
                <Link to="/" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled={isBorrowing}
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
