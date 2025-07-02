import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function layout() {
  return (
    <>
      <Navbar />
      <main className="h-full min-h-[80vh] ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
