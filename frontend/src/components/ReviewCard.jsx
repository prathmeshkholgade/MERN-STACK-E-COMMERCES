import { Rating, Typography } from "@mui/material";
import React from "react";

export default function ReviewCard({ review }) {
  return review ? (
    <div className="w-full sm:w-[45%] max-h-44  overflow-hidden">
      <div className="info flex gap-4">
        <div
          className="img bg-red-600 w-14 h-14 rounded-full text-center"
          style={{
            backgroundImage: `url("https://i.pinimg.com/736x/93/2d/dc/932ddc620841866672b545307a12ffde.jpg")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div>
          <p>
            <Typography component="legend">{review.owner.fullName}</Typography>
            <Rating name="read-only" value={review.rating} readOnly />
          </p>
        </div>
      </div>
      <div className="review py-2">
        <p>{review.comment}</p>
      </div>
    </div>
  ) : (
    "Loading.."
  );
}
