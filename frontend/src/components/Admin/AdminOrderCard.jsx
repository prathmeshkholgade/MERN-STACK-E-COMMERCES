import React from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function AdminOrderCard({ order }) {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const hanldeOnClick = () => {
    navigate(`/orders/${order._id}`);
    dispatch(fetch)
    
  };
  return (
    <TableRow
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
          <div className="flex">
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
      <TableCell align="center">{order.orderStatus}</TableCell>
    </TableRow>
  );
}
