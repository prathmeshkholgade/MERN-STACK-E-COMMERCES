import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getUserOrders } from "../../app/features/order/checkOutSlice";
import OrderCard from "../../components/OrderCard";
import ShhipingAddress from "../../components/ShhipingAddress";
import OrderTracking from "../../components/order/OrderTracking.jsx";


export default function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.CheckOut?.userOrders);
  console.log(orders);
  const getUserOrderDetails = async () => {
    try {
      const res = await dispatch(getUserOrders(id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserOrderDetails();
  }, [id]);

  return (
    orders && (
      <div className="w-[90%] mx-auto">
        <p>Order Details</p>
      
        <div className=" md:w-[70%]">
          <OrderTracking status={orders.orderStatus} />
        </div>
        <div>
          <OrderCard order={orders.orderItems} orderDetails={orders} />
        </div>
        <div>
          <ShhipingAddress address={orders.shippingAddress} />
        </div>
      </div>
    )
  );
}
