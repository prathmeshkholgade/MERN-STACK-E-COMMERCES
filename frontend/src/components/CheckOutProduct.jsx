import React from "react";
import SelectQunatity from "./SelectQunatity";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../app/features/cart/cartSlice";
import { deleteFromChekout } from "../app/features/order/checkOutSlice";
export default function CheckOutProduct({ product }) {
  const finalProductPrice = product.quantity * product.product.sellingPrice;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFromChekout({id:product?.product?._id}));
  };
  return (
    <div className="w-full flex">
      <div className="w-20 2-20">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={product?.product?.image[0]?.url}
          alt=""
        />
      </div>
      <div className="flex-grow p-2">
        <p>{product.product.name}</p>
        <p className="font-semibold py-2">{finalProductPrice}</p>
        <SelectQunatity
          count={product.product.countInStock}
          id={product.product._id}
          quantity={product.quantity}
        />
      </div>
      <div>
        {" "}
        <DeleteOutlineIcon
          fontSize="small"
          sx={{ color: "#768490" }}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
