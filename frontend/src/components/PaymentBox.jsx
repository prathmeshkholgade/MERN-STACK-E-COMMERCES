import React from "react";

export default function PaymentBox({
  text,
  icon,
  value,
  selectedValue,
  onChange,
}) {
  return (
    <div
      className="sm:w-[40%] border flex justify-between p-2"
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        value={value}
        className="pr-4"
        checked={selectedValue === value}
        onChange={() => {}}
        // defaultChecked={idx === addresses.length - 1}
      />
      <p>{text}</p>
      <p>{icon}</p>
    </div>
  );
}
