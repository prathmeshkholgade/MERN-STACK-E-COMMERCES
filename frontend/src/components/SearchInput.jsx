import React from "react";
import SearchIcon from "@mui/icons-material/Search";
export default function SearchInput() {
  return (
    <div className="md:w-72 lg:w-96 relative">
      <div>
        <input
          type="text"
          placeholder="Searching for  ?"
          className="w-full focus:border-2 focus:border-gray-200 pl-4 border-2  bg-[#f3f5f9] rounded-md py-1"
        />
      </div>
      <div>
        <div className="absolute right-0 bottom-0  h-full flex items-center text-center  px-2">
          <SearchIcon sx={{ color: "#327bf1" }} />{" "}
        </div>
      </div>
    </div>
  );
}
