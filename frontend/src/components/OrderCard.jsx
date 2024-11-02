import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/helper";
export default function OrderCard({ order, orderDetails }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  console.log(pathname);
  console.log(id);
  console.log(order);
  console.log(orderDetails);
  const user = useSelector((state) => state.Auth.User);
  const navigate = useNavigate();
  const handleOnClick = (id) => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };
  const handleOrderClick = () => {
    navigate(`/order/${orderDetails._id}`);
  };
  return (
    user &&
    order && (
      // <Link to={`/order/${orderDetails._id}`}>
      <div
        className=" border-2 p-2  mt-2 md:w-[80%] lg:w-[70%] bg-white"
        onClick={!id && handleOrderClick}
      >
        <div className="flex justify-between">
          <h4>OrderId: {orderDetails.paymentInfo.razorpayOrderId}</h4>{" "}
          <p> ordered date :{formatDate(orderDetails.createdAt)}</p>
        </div>

        {order.map((order) => (
          //  {id &&  <Link to={`/product/${order.product._id}`}>}
          <div
            className="flex  items-center "
            onClick={id ? () => handleOnClick(order.product._id) : null}
          >
            <div className="w-24 h-24">
              <img
                src={order.product.image[0].url}
                alt=""
                className="w-full h-full p-2"
              />
            </div>
            <div className="p-2 flex-grow sm:ml-4 ">
              <p className="">{order.product.name}</p>
              <div className="flex py-1 gap-4">
                <p className="">₹{order.price}</p>*<p>Qty:{order.quantity}</p>
              </div>
            </div>
            <div className="p-2  mx-2 sm:mx-4">
              <p>₹{order.totalprice}</p>
            </div>
            {
              <div className="p-2 hidden sm:block">
                <p>Delivered on few days</p>
              </div>
            }
          </div>
          // </Link>
        ))}
        <div className="text-right py-2 mr-4">
          <p>
            {" "}
            TotalPrice:{" "}
            <span className="text-lg"> ₹{orderDetails.totalPrice}</span>
          </p>
        </div>
        <div className="text-end sm:hidden">
          <p>Delivered on few days</p>
        </div>
      </div>
      // </Link>
    )
  );
}
