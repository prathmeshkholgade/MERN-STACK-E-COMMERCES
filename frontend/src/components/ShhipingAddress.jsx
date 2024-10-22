import React from "react";

export default function ShhipingAddress({ address }) {
  console.log(address);
  return (
    <div className="border w-fit p-4 mt-2 bg-white">
      {" "}
      <h2 className="text-lg font-semibold">Shipping Address</h2>
      <p>
        {" "}
        <span> {address?.address}</span> <span>{address.landmark}</span>{" "}
        <span>{address.city}</span> <span>{address.zipCode}</span>{" "}
        <span>{address.state}</span>
      </p>
    </div>
  );
}
