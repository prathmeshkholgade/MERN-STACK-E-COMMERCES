import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Layout() {
  return (
    <div className=" min-h-screen flex flex-col bg-[#f1f3f6] ">
      <Navbar />
      <div className="flex-grow ">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
