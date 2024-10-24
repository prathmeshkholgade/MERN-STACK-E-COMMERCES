import React from "react";

export default function ShhipingAddress({ address }) {
  console.log(address);
  return (
    <div className="border w-fit p-4  bg-white">
      {" "}
      <h2 className="text-lg font-semibold">Shipping Address</h2>
      <p>
        Name: {address.firstName} {address.lastName}
      </p>
      <p>email: {address.email}</p>
      <p>
        {" "}
        address: <span> {address?.address}</span>{" "}
        <span>{address.landmark}</span> <span>{address.city}</span>{" "}
        <span>{address.zipCode}</span> <span>{address.state}</span>
      </p>
      <p>{address.number}</p>
      {address?.alternateNumber && <p>{address?.alternateNumber}</p>}
    </div>
  );
}
