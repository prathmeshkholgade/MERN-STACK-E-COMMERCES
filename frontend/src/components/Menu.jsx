import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu({ opt }) {
  return (
    <>
      <li
        className="p-2 text-sm font-semibol hover:bg-gray-200 rounded-lg"
        onClick={opt.onclick || null}
      >
        {" "}
        <NavLink to={opt.path}>
          {" "}
          {opt.icon} {opt.name}
        </NavLink>
      </li>
    </>
  );
}
