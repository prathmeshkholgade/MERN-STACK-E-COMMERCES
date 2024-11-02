import { Rating, Typography } from "@mui/material";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../app/features/products/productSlice";
import { Await } from "react-router-dom";
export default function ReviewCard({ productId, review }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(
        deleteReview({ id: productId, reviewId: review?._id })
      ).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  const user = useSelector((state) => state?.Auth?.User);
  return review ? (
    <div className="w-full sm:w-[45%] max-h-44  overflow-hidden relative">
      <div className="info flex gap-4">
        <div
          className="img  w-14 h-14 rounded-full text-center"
          // style={{
          //   backgroundImage: `url("https://i.pinimg.com/736x/93/2d/dc/932ddc620841866672b545307a12ffde.jpg")`,
          //   backgroundPosition: "center",
          //   backgroundSize: "cover",
          // }}
        >
          {" "}
          <AccountCircleOutlinedIcon
            sx={{ width: "100%", height: "s90%" }}
          />{" "}
        </div>
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
      {user && user._id === review?.owner?._id && (
        <div className="absolute top-0 right-0" onClick={handleDelete}>
          <DeleteOutlineIcon fontSize="small" />
        </div>
      )}
    </div>
  ) : (
    "Loading.."
  );
}
