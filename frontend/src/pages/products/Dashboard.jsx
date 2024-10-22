import React from "react";
import SideBar from "../../components/SideBar";

export default function Dashboard() {
  return (
    <div className="">
      {" "}
      <div className="bg-red-200 w-[40%] sm:w-[30%] md:w-[20%] h-screen">
        <SideBar />
      </div>
    </div>
  );
}
