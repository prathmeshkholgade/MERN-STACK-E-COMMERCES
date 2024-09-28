import { Box, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addReview } from "../app/features/products/productSlice";
import { useParams } from "react-router-dom";
export default function ReviewInput() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [value, setRatingValue] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const onSubmit = async (data) => {
    try {
      if (!data.rating) {
        data.rating = 1; // Default rating if not selected
      }
      await dispatch(addReview(id)).unwrap();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full md:w-1/2 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-semibold mb-2">
          Write a Review for this product
        </h1>
        <div className="rating">
          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Typography component="legend">Your Rating</Typography>
            <Rating
              name="simple-controlled"
              //   {...register("rating", {
              //     required: { value: true, message: "please choice rating" },
              //   })}
              value={value}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
                setValue("rating", newValue);
              }}
            />
            {errors.rating && (
              <p className="text-red-400">{errors.rating.message}</p>
            )}
          </Box>
        </div>
        <div className="my-2">
          <label htmlFor="comment" className="">
            Your Review
          </label>
          <textarea
            className="w-full h-28 border border-gray-300 p-2 "
            placeholder="Write a review here"
            {...register("comment", {
              required: { value: true, message: "Please write a review" },
              maxLength: {
                value: 260,
                message: "Your review can't exceed 250 characters",
              },
            })}
          ></textarea>
          {errors.comment && (
            <p className="text-red-400">{errors.comment.message}</p>
          )}
        </div>
        <div>
          <button
            disabled={isSubmitting}
            className="bg-zinc-100 hover:bg-zinc-900 hover:text-white rounded border border-black  py-2 px-4 transition duration-75 ease-in-out"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
