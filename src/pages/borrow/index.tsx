import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Borrow() {
  const totalBorrowed = 10;
  const borrowSummary = [];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Books Borrowed
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBorrowed}</div>
              <p className="text-xs text-muted-foreground">
                Copies currently on loan
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unique Titles
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{borrowSummary.length}</div>
              <p className="text-xs text-muted-foreground">
                Different books borrowed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Badge variant="default" className="h-4 w-4 rounded-full p-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Borrowing system operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Borrow Summary Table */}
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
                      <TableHead>Genre</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Total Quantity Borrowed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowSummary.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.bookTitle}
                        </TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.genre}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {item.isbn}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {item.totalQuantityBorrowed}{" "}
                            {item.totalQuantityBorrowed === 1
                              ? "copy"
                              : "copies"}
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
