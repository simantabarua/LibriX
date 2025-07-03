import App from "@/App";
import layout from "@/layout/layout";
import Books from "@/pages/books";
import CreateBook from "@/pages/books/create-book";
import EditBook from "@/pages/books/edit-book";
import ViewBook from "@/pages/books/view-book";
import BorrowSummary from "@/pages/borrow";
import Borrow from "@/pages/borrow/borrow";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: layout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/create-book",
        Component: CreateBook,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/books/:id",
        Component: ViewBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/borrow/:id",
        Component: Borrow,
      },
    ],
  },
]);

export default router;
