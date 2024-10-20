import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SelectQunatity from "./SelectQunatity";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../app/features/cart/cartSlice";
export default function ProductCart({ product }) {
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    console.log(e.target.nodeName);
    if (
      e.target.nodeName === "IMG" ||
      e.target.nodeName === "P" ||
      e.target.nodeName === "DIV"
    ) {
      navigate(`/product/${product.product._id}`);
    }
  };
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFromCart(product.product._id));
  };
  const finalProductPrice = product.quantity * product.product.sellingPrice;
  const productPrice = product.quantity * product.product.price;
  return (
    <div
      className="flex items-center border-t-2 pt-2 mt-2 relative"
      onClick={handleOnClick}
    >
      <div className="flex lg:w-[420px] sm:w-[420px] ">
        <div className="sm:w-24 sm:h-24 w-20 h-20">
          <img
            src={product?.product?.image[0]?.url}
            className="w-full h-full bg-zinc-100 rounded-lg object-center"
          />
        </div>
        <div
          className="flex flex-col justify-evenly
        sm:justify-center sm:max-w-[300px] w-[210px] px-2"
        >
          <p className="ml-4">{product.product.name} </p>
          <div className="sm:hidden flex">
            Qty{" "}
            <SelectQunatity
              count={product.product.countInStock}
              id={product.product._id}
              quantity={product.quantity}
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <SelectQunatity
          count={product.product.countInStock}
          id={product.product._id}
          quantity={product.quantity}
        />
      </div>

      <div className="lg:w-[120px]  flex gap-4 flex-grow">
        {" "}
        <p className="line-through">₹{productPrice}</p>
        <p className="font-semibold ">₹{finalProductPrice}</p>
      </div>
      <span className="px-1 absolute right-2 top-2" onClick={handleDelete}>
        <DeleteOutlineIcon fontSize="small" sx={{ color: "#e91e63" }} />
      </span>
    </div>
  );
}
