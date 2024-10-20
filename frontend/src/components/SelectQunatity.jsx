import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateProductQuantity } from "../app/features/cart/cartSlice";
import { useLocation, useParams } from "react-router-dom";
import { updateProductQuantityOfCheckOut } from "../app/features/order/checkOutSlice";

export default function SelectQunatity({ count, quantity, id }) {
  const { register, handleSubmit } = useForm();
  const { pathname } = useLocation();
  console.log(pathname);
  // const {id}=useParams();

  const dispatch = useDispatch();
  const onSubmit = (quantity) => {
    if (pathname === "/checkout") {
      console.log(quantity);
      console.log(id);
      dispatch(updateProductQuantityOfCheckOut({id,quantity}));
    } else {
      dispatch(updateProductQuantity({ id, quantity }));
    }
  };
  return (
    <div className="lg:w-[120px] w-[70px]">
      <form onChange={handleSubmit(onSubmit)}>
        <select {...register("quantity")} defaultValue={quantity}>
          {[...Array(count).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>
              {n + 1}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
