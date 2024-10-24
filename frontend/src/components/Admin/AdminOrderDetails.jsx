import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrdersInDetails,
  updateOrderStatus,
} from "../../app/features/order/orderSlice";
import { useParams } from "react-router-dom";
import OrderCard from "../OrderCard";
import ShhipingAddress from "../ShhipingAddress";

import SelectBox from "../SelectBox";
import { Button } from "@mui/material";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.Order?.orderDetails);
  const getUserOrder = async () => {
    const res = await dispatch(getUserOrdersInDetails(id)).unwrap();
    console.log(res);
  };

  const [orderStatus, setOrderStatus] = useState("");
  console.log(orderStatus);
  const hanleChanges = async (orderStatus) => {
    try {
      const res = await dispatch(
        updateOrderStatus({ id, status: orderStatus })
      ).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
          <SelectBox
            option={selectOptions}
            defaultValue={order.orderStatus}
            setOrderStatus={setOrderStatus}
          />
        </div>
        <div>
          <OrderCard order={order.orderItems} orderDetails={order} />
        </div>

        <div className=" md:w-[80%] lg:w-[70%]">
          <div className="bg-white p-4">
            <p>totalQuantity : {order.totalQuantity}</p>
          </div>
          <div className="md:flex  p-2 justify-between">
            <div className="bg-white md:w-[40%] p-4">
              <p>UserName: {order.user.fullName}</p>
              <p>email: {order.user.email}</p>
            </div>

            <div className=" w-fit">
              <ShhipingAddress address={order.shippingAddress} />
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="contained"
              onClick={() => hanleChanges(orderStatus)}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
