import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/routes.tsx";
import { store } from "./redux/store.ts";
import { Provider } from 'react-redux'
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
       <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
