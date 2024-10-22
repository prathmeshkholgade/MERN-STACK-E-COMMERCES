import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import {RazorPay} from "razorpay"
import {
  checkOut,
  paymentVerify,
  setCheckOutProducts,
} from "../app/features/order/checkOutSlice";
import { addErrorMessage } from "../app/features/error/errorSlice";

export default function CheckOut({
  subTotal,
  total,
  paymentMode,
  selectedAddress,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartsProduct = useSelector((state) => state?.Cart?.Cart?.items);
  const checkOutProducts = useSelector((state) => state?.CheckOut?.products);
  const totalQuantity =
    checkOutProducts &&
    checkOutProducts.reduce((currV, product) => {
      console.log(currV);
      console.log(product);
      return currV + product.quantity;
    }, 0);
  console.log(totalQuantity);
  const user = useSelector((state) => state?.Auth?.User);
  const dispatch = useDispatch();
  const handleCheckOut = async () => {
    if (pathname === "/cart") {
      dispatch(setCheckOutProducts(cartsProduct));
      navigate("/checkout");
    } else if (pathname === "/checkout") {
      if (!selectedAddress) {
        dispatch(addErrorMessage("Select Address"));
        return;
      }
      if (!paymentMode) {
        dispatch(addErrorMessage("Select Payment Mode"));
        return;
      }
      if (paymentMode && paymentMode === "cod") {
        console.log(" cod payment is prosessing");
      } else if (paymentMode && paymentMode === "netbanking") {
        const products = checkOutProducts.map((product) => ({
          product: product.product._id,
          productName: product.product.name,
          quantity: product.quantity,
          price: product.product.sellingPrice,
          totalprice: product.quantity * product.product.sellingPrice,
        }));
        console.log(products);
        const orderData = {
          amount: total,
          userId: user._id,
          products: products,
          shhippingAddress: selectedAddress,
          totalQuantity: totalQuantity,
        };
        console.log(orderData);
        const response = await dispatch(checkOut(orderData)).unwrap();
        console.log(response);
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: response.amount,
          image:
            "https://i.pinimg.com/736x/f1/7d/8f/f17d8f93876e51c06cf33035d6defaf0.jpg",
          name: "New Samarat EnterPrices",
          description: "Test Transaction",
          order_id: response.id,
          // callback_url: "http://localhost:8080/order/payment/verification",
          handler: async function (response) {
            console.log("response", response);
            const paymentData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              // orderDetails: orderResponse,
            };
            dispatch(paymentVerify(paymentData));
            console.log(paymentData);
          },
          prefill: {
            name: user.fullName,
            email: user.email,
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
        };
        // console.log(window);
        const rzp = new window.Razorpay(options);
        rzp.open();
        console.log("net banking payment is processing");
      }
    }
  };
  return (
    <div className="border shadow-md  w-full xl:w-[70%] p-6 h-fit rounded-2xl mx-auto">
      <h3 className="font-semibold text-lg py-2">Summary</h3>
      <div className="summary-item py-2 flex justify-between">
        <span>Price</span> <span className="font-semibold">₹{subTotal}</span>
      </div>
      <div className="summary-item py-2 flex justify-between">
        <span>Discount</span>{" "}
        <span className="font-semibold">-₹{subTotal - total}</span>
      </div>{" "}
      <div className="summary-item mt-2 mb-10 flex justify-between ">
        <span>Shipping</span>
        <span className="font-semibold mr-2">
          Free <span className="line-through">₹490 </span>{" "}
        </span>{" "}
      </div>
      <div className="py-2 flex justify-between border-t text-lg font-semibold mb-6">
        <span className="">Total</span> <span>₹{total}</span>
      </div>
      <div>
        <button
          onClick={handleCheckOut}
          className="bg-[#1c252e] py-3 text-white w-full rounded-lg font-bold leading-tight hover:bg-gray-600 transition-all duration-300 ease-in-out"
        >
          {pathname === "/cart" ? "  CheckOut" : "Place Order"}
        </button>
      </div>
    </div>
  );
}
