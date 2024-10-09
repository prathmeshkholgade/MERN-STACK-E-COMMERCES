import React from "react";

export default function SelectQunatity({ count, quantity }) {
  return (
    <div className="lg:w-[120px] w-[70px]">
      <select defaultValue={quantity}>
        {[...Array(count).keys()].map((n) => (
          <option key={n + 1} value={n + 1}>
            {n + 1}
          </option>
        ))}
      </select>
    </div>
  );
}
