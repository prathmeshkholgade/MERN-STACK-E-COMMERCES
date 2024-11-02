import React from "react";

export default function Button({ bgColor, textColor, text }) {
  return (
    <div>
      <button
        style={{ backgroundColor: bgColor, color: textColor }}
        className="px-4 py-2 rounded-md"
      >
        {text}
      </button>
    </div>
  );
}
