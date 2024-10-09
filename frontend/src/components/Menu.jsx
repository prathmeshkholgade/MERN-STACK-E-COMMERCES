import React from "react";
import { Link } from "react-router-dom";

export default function Menu({ opt }) {
  return (
    <>
      <li
        className="p-2 text-sm font-semibol hover:bg-gray-200 rounded-lg"
        onClick={opt.onclick ? opt.onclick : "undefined"}
      >
        {" "}
        <Link>
          {" "}
          {opt.icon} {opt.name}
        </Link>
      </li>
    </>
  );
}
