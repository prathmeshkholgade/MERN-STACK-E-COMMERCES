import React from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatDate } from "../../utils/helper";
export default function AdminOrderCard({ order }) {
  console.log(order);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hanldeOnClick = () => {
    navigate(`/orders/${order._id}`);
    dispatch(fetch);
  };
  return (
    <TableRow
      className="hover:bg-zinc-100 "
      // key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      onClick={hanldeOnClick}
    >
      <TableCell component="th" scope="row">
        {order.paymentInfo.razorpayOrderId}
      </TableCell>
      <TableCell>{order.user.fullName}</TableCell>
      <TableCell>
        {order.orderItems.map((order) => (
          <div className="flex ">
            {" "}
            <div className="w-14 h-14">
              {" "}
              <img src={order.product.image[0].url} alt="" />
            </div>
            <div className="px-2">
              <p className=""> {order.product.name}</p>
              <p>
                {order.product.sellingPrice} * {order.quantity}
              </p>
            </div>
          </div>
        ))}
      </TableCell>
      <TableCell align="right">{order.totalQuantity}</TableCell>
      <TableCell align="right">{order.totalPrice}</TableCell>
      <TableCell align="right">{formatDate(order.createdAt)}</TableCell>
      <TableCell align="center">
        <span
          className={`p-2 rounded-md ${
            order.orderStatus === "Pending"
              ? "bg-red-100 text-red-600"
              : order.orderStatus === "Delivered"
              ? "bg-green-100 text-green-600"
              : order.orderStatus === "Processing"
              ? "bg-orange-100 text-orange-400"
              : order.orderStatus === "Cancelled"
              ? "bg-red-400 text-white"
              : order.orderStatus === "Returned"
              ? "bg-red-300 text-black"
              : ""
          }`}
        >
          {" "}
          {order.orderStatus}
        </span>
      </TableCell>
    </TableRow>
  );
}
