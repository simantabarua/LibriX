import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BookType } from "@/types/bookTypes";
import BookActions from "./BookActions";

type BookCardProps = {
  book: BookType;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 bg-white"
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
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
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-700">
              {book.copies}
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
            <span className="text-sm text-slate-500">Genre:</span>
            <Badge
              variant="outline"
              className="bg-slate-50 text-slate-700 border-slate-300 text-xs"
            >
              {book.genre}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">ISBN:</span>
            <span className="font-mono text-xs text-slate-600">{book.isbn}</span>
          </div>
          {book.description && (
            <div className="pt-2">
              <p className="text-sm text-slate-600 line-clamp-3">{book.description}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center mx-auto gap-1">
          <BookActions id={book._id} available={book.available} />
        </div>
      </CardFooter>
    </Card>
  );
}
