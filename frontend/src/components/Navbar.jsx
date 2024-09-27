import React from "react";
import SearchInput from "./SearchInput";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex py-4 bg-gray-50 shadow-lg justify-evenly">
      <div>
        <p>ecommerce</p>
      </div>
      <div className="hidden sm:block">
        <SearchInput />
      </div>
      <div>
        <ul className="flex gap-10">
          <NavLink to={"/"}>
            <li>Home</li>{" "}
          </NavLink>
          <li>About</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
}
