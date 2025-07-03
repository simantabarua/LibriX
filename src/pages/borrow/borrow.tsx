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
import { ArrowLeft, BookOpen } from "lucide-react";
import { useGetBookByIdQuery } from "@/redux/api/book-api";
import { useForm } from "react-hook-form";
import type { BookType } from "@/types/bookTypes";
import { useBorrowBookMutation } from "@/redux/api/borrow-api";

type BorrowForm = {
  quantity: number;
  dueDate: string;
};

export default function Borrow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useGetBookByIdQuery(id || "");
  const [borrowBook] = useBorrowBookMutation();

  const book: BookType = data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowForm>();

  const onSubmit = async (formData: BorrowForm) => {
    console.log(formData);
    try {
      await borrowBook({ book: id!, ...formData }).unwrap();
      navigate("/borrow-summary");
    } catch (error) {
      console.error("Failed to borrow book:", error);
    }
  };

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Borrow Book</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Book Info Card */}
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

          {/* Borrow Form */}
          <Card>
            <CardHeader>
              <CardTitle>Borrow Details</CardTitle>
              <CardDescription>Enter the borrowing information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...register("quantity", {
                      required: true,
                      min: 1,
                      max: book.copies,
                      valueAsNumber: true,
                    })}
                    placeholder="Enter quantity"
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-600">
                      Valid quantity required (1 - {book.available})
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
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-600">Due date is required</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Borrow Book
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
    </div>
  );
}
