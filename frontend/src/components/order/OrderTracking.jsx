import React from "react";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
export default function OrderTracking({ status }) {
  console.log(status);
  const stages = [
    "Pending",
    "Processing",
    "Shipping",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  return (
    <div>
      <p>Track Order</p>
      <div className="bg-white mx-auto flex p-8 items-center">
        <div className="flex flex-col justify-center items-center ">
          <div
            className={`${
              status === "Pending" ||
              status === "Processing" ||
              status === "Delivered" ||
              status === "Shipping"
                ? "bg-[#d96377] text-white"
                : "bg-gray-300"
            } flex items-center justify-center py-2 sm:w-16 sm:h-16 w-10 h-10 rounded-full`}
          >
            <Inventory2Icon sx={{ fontSize: { sm: 30, xs: 25 } }} />
          </div>
          <p
            className="
    
             text-xs sm:text-sm"
          >
            Packaging
          </p>
        </div>

        <div
          className="
            
          flex-grow h-1 bg-gray-300 flex"
        >
          <div
            className={`${
              status === "Pending" ||
              status === "Processing" ||
              status === "Shipping" ||
              status === "Delivered"
                ? "bg-[#d96377] "
                : "bg-gray-300"
            } flex-grow`}
          ></div>
          <div
            className={`${
              status === "Processing" ||
              status === "Shipping" ||
              status === "Delivered"
                ? "bg-[#d96377] "
                : "bg-gray-300"
            } flex-grow`}
          ></div>
        </div>
        <div>
          <div
            className={`${
              status === "Shipping" ||
              status === "Delivered" ||
              status === "Processing"
                ? "bg-[#d96377] text-white"
                : "bg-gray-300"
            }  flex items-center justify-center py-2 sm:w-16 sm:h-16 w-10 h-10 rounded-full`}
          >
            <LocalShippingIcon sx={{ fontSize: { sm: 30, xs: 25 } }} />
          </div>

          <p className="text-xs sm:text-sm">Shipping</p>
        </div>

        <div className="flex-grow flex h-1 bg-gray-300">
          <div
            className={`${
              status === "Shipping" || status === "Delivered"
                ? "bg-[#d96377] "
                : "bg-gray-300"
            } flex-grow`}
          ></div>
          <div
            className={`${status === "Delivered" && "bg-[#d96377] "} flex-grow`}
          ></div>
        </div>

        <div>
          <div
            className={`${
              status === "Delivered" ? "bg-[#d96377] text-white" : "bg-gray-300"
            } flex items-center justify-center py-2 sm:w-16 sm:h-16 w-10 h-10 rounded-full`}
          >
            <CardGiftcardIcon sx={{ fontSize: { sm: 30, xs: 25 } }} />
          </div>

          <p className="text-xs sm:text-sm">Delivery</p>
        </div>
      </div>
    </div>
  );
}
