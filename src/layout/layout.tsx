import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

export default function layout() {
  return (
    <>
      <Navbar />
      <main className="flex h-full min-h-[80vh] flex-col items-center ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
