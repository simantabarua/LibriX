import App from "@/App";
import layout from "@/layout/layout";
import Books from "@/pages/books";
import CreateBook from "@/pages/books/create-book";
import Borrow from "@/pages/borrow";
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
        path: "/borrow",
        Component: Borrow,
      },
      {
        path: "/create-book",
        Component: CreateBook,
      },
    ],
  },
]);

export default router;
