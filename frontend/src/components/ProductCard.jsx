import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate =useNavigate()
  console.log(product);
  return (
    <div className="w-[40%] h-72 md:w-48 p-2 shadow-md " onClick={()=>{navigate(`product/${product._id}`)}}>
      <div className="w-full h-44 ">
        <img
          src={`${product.image[0].url}`}
          className="w-full h-full object-cover hover:scale-105 "
        />
      </div>
      <div className="py-1">
        <p>{product.name} </p>
      </div>
      <div className="flex gap-10 ">
        <p>{product.sellingPrice}</p>{" "}
        <p className="line-through">{product.price}</p>
      </div>
    </div>
  );
}
