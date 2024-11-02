import React from "react";
import OrderCard from "../../components/OrderCard";
import { useSelector } from "react-redux";

export default function UserOrderPage() {
  const userOrder = useSelector((state) => state?.Auth?.User?.orders);
  console.log(userOrder);
  return (
    userOrder && (
      <div className="w-[90%] mx-auto">
        <h3 className="text-xl font-semibold">My Orders</h3>
        <div className="mb-2">
          {userOrder
            .slice()
            .reverse()
            .map((order) => (
              <OrderCard order={order.orderItems} orderDetails={order} />
            ))}
          {/* <OrderCard /> */}
        </div>
      </div>
    )
  );
}
