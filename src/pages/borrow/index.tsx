import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/api/borrow-api";
import type { BorrowSummary } from "@/types/borrowTypes";
export default function BorrowSummary() {
  const { data } = useGetBorrowSummaryQuery(undefined);
  const borrowSummary = data?.data || [];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Borrowed Books Summary</CardTitle>
            <CardDescription>
              Aggregated view of all borrowed books and their quantities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {borrowSummary.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Total Quantity Borrowed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowSummary.map((item: BorrowSummary) => (
                      <TableRow key={item.book.isbn}>
                        <TableCell className="font-medium">
                          {item.book.title}
                        </TableCell>
                        <TableCell>{item.book.isbn}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {item.book.isbn}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">
                            {item.totalQuantity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No books borrowed yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start borrowing books to see them appear in this summary
                </p>
                <Link to="/">
                  <Button>Browse Books</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
