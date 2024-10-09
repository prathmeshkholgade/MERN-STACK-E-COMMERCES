import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helper";
import StarIcon from "@mui/icons-material/Star";
export default function ProductCard({ product }) {
  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) return null;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgrating = (total / reviews.length).toFixed(1);
    return avgrating;
  };
  const avgRating = calculateAvgRating(product.reviews);

  return (
    <div className="w-[40%] max-h-72  hover:bg-zinc-100 md:w-48 p-2 shadow-md ">
      <Link to={`/product/${product._id}`} className="h-full flex flex-col">
        <div className="w-full h-40 ">
          <img
            src={`${product.image[0].url}`}
            className="w-full h-full object-contain hover:scale-105 "
          />
        </div>
        <div className="flex flex-col flex-grow p-1  justify-between">
          <div className="py-1  flex justify-between">
            <div>
              <p className="font-semibold">
                {capitalizeFirstLetter(
                  product.name.length > 20
                    ? product.name.slice(0, 21) + "."
                    : product.name
                )}
              </p>
            </div>{" "}
            {avgRating && (
              <div>
                {" "}
                <span className="text-sm text-center mt-1 bg-gray-200 flex w-fit px-[3px] items-center rounded-md">
                  <p className="px-[2px]"> {avgRating}</p>{" "}
                  <StarIcon sx={{ fontSize: 18, color: "#faaf00" }} />
                </span>{" "}
              </div>
            )}
          </div>
          <div className="  ">
            <div className=" flex gap-6">
              <p className="font-medium ">₹{product.sellingPrice}</p>{" "}
              <p className="line-through">₹{product.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
