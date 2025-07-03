import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router";
import { useGetBookByIdQuery } from "@/redux/api/book-api";

export default function ViewBook() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBookByIdQuery(id || "");
  const book = data?.data;

  if (isLoading) {
    return <p className="text-center py-10 text-blue-600">Loading book...</p>;
  }

  if (isError || !book) {
    return <p className="text-center py-10 text-red-600">Failed to load book</p>;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>by {book.author}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="flex justify-between">
              <span className="font-medium">Genre:</span>
              <Badge variant="outline" className="text-xs">
                {book.genre}
              </Badge>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">ISBN:</span>
              <span className="font-mono">{book.isbn}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Copies:</span>
              <span>{book.copies}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <Badge
                className={
                  book.available > 0
                    ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                    : "bg-slate-100 text-slate-600 border-slate-300"
                }
              >
                {book.available > 0 ? "Available" : "Unavailable"}
              </Badge>
            </div>

            {book.description && (
              <div>
                <p className="font-medium">Description:</p>
                <p className="mt-1 text-slate-600">{book.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
