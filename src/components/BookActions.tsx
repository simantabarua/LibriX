import { BookOpen, Edit, Eye, Trash } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDeleteBookMutation } from "@/redux/api/base-api";

interface Props {
  id: string;
  available: number;
}

export default function BookActions({ id, available }: Props) {
  const [open, setOpen] = useState(false);
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      await deleteBook(id).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Link to={`/books/${id}`}>
        <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-700">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={`/edit-book/${id}`}>
        <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-700">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <Link to={`/borrow/${id}`}>
        <Button
          variant="ghost"
          size="sm"
          disabled={available === 0}
          className="hover:bg-green-50 hover:text-green-700 disabled:opacity-50"
        >
          <BookOpen className="h-4 w-4" />
        </Button>
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-700">
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
            <DialogDescription>This action cannot be undone. Are you sure?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
