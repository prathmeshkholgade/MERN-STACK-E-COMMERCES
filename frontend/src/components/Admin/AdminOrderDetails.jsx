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
import OrderTracking from "../order/OrderTracking";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state) => state?.Order?.orderDetails);

  const [loading, setLoading] = useState(false); // Loading state for button
  console.log(order);
  const getUserOrder = async () => {
    try {
      const res = await dispatch(getUserOrdersInDetails(id)).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false when update is complete
    }
  };
  useEffect(() => {
    getUserOrder();
  }, [id, dispatch]);

  console.log(orderStatus);
  const hanleChanges = async (orderStatus) => {
    setLoading(true); // Set loading to true when button is clicked
    try {
      const res = await dispatch(
        updateOrderStatus({ id, status: orderStatus })
      ).unwrap();
      console.log("fetch re-again user");
      getUserOrder();

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const selectOptions = [
    "Pending",
    "Processing",
    "Shipping",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  return (
    order && (
      <div className="w-[90%] mx-auto p-4 ">
        <h4 className="text-lg">Order Details</h4>
        <div className="md:w-[80%] lg:w-[70%] flex gap-8 justify-end">
          <SelectBox
            option={selectOptions}
            defaultValue={order.orderStatus}
            setOrderStatus={setOrderStatus}
          />
          <div className="mt-4">
            <Button
              variant="contained"
              onClick={() => hanleChanges(orderStatus)}
              disabled={loading} // Disable button while updating
            >
              {loading ? "Updating..." : "Save Changes"}{" "}
              {/* Show updating text */}
            </Button>
          </div>
        </div>
        <div className="md:w-[70%]">
          <OrderTracking status={order.orderStatus} />
        </div>
        <div>
          <OrderCard order={order.orderItems} orderDetails={order} />
        </div>

        <div className=" md:w-[80%] lg:w-[70%]">
          <div className="bg-white p-4">
            <p>totalQuantity : {order.totalQuantity}</p>
            <p className="py-2">
              paymentStatus:{order.isPaymentPaid ? "Paid" : "UnPaid"}
            </p>
            <p>Payment:{order.paymentMethod}</p>
            <p>PaymentId: {order.paymentInfo.razorpayPaymentId}</p>
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
        </div>
      </div>
    )
  );
}
