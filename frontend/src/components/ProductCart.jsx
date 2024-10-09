import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SelectQunatity from "./SelectQunatity";
export default function ProductCart({ product }) {
  console.log(product);
  return (
    <div className="flex items-center border-t-2 pt-2 mt-2 relative">
      <div className="flex lg:w-[420px] sm:w-[420px] ">
        <div className="sm:w-24 sm:h-24 w-20 h-20">
          <img
            src={product?.product?.image[0]?.url}
            className="w-full h-full bg-zinc-100 rounded-lg object-center"
          />
        </div>
        <div
          className="flex flex-col justify-evenly
        sm:items-center sm:justify-center sm:max-w-[300px] w-[210px] px-2"
        >
          <p>{product.product.name} best product ever</p>
          <div className="sm:hidden flex">
            Qty{" "}
            <SelectQunatity
              count={product.product.countInStock}
              quantity={product.quantity}
            />
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <SelectQunatity
          count={product.product.countInStock}
          quantity={product.quantity}
        />
      </div>

      <div className="lg:w-[120px]  flex-grow">
        {" "}
        <p>{product.product.sellingPrice}</p>
      </div>
      <div className="px-1 absolute right-2 top-2">
        <DeleteOutlineIcon fontSize="small" sx={{ color: "#e91e63" }} />
      </div>
    </div>
  );
}
