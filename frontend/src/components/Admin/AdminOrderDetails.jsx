import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersInDetails } from "../../app/features/order/orderSlice";
import { useParams } from "react-router-dom";
import OrderCard from "../OrderCard";
import ShhipingAddress from "../ShhipingAddress";

import SelectBox from "../SelectBox";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.Order?.orderDetails);
  const getUserOrder = async () => {
    const res = await dispatch(getUserOrdersInDetails(id)).unwrap;
    console.log(res);
  };
  const selectOptions = [
    "Pending",
    "Processing",
    "Delivered",
    "Cancelled",
    "Returned",
  ];
  useEffect(() => {
    getUserOrder();
  }, [id]);
  return (
    order && (
      <div className="w-[90%] mx-auto p-4">
        <h4 className="text-lg">Order Details</h4>
        <div className="md:w-[80%] lg:w-[70%] flex justify-end">
          <SelectBox option={selectOptions} defaultValue={order.orderStatus} />
        </div>
        <div>
          <OrderCard order={order.orderItems} orderDetails={order} />
        </div>
        {/* <div>
          <ShhipingAddress address={order.shippingAddress} />
        </div> */}
      </div>
    )
  );
}
