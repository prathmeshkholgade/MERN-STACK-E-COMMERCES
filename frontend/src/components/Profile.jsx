import { Box, TextField } from "@mui/material";
import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAddress, updateAddress } from "../app/features/auth/authSlice";

export default function Profile({ userInfo, address }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      if (address) {
        console.log("updating data");
        console.log(data);
        await dispatch(updateAddress({ id: address._id, data })).unwrap();
      } else {
        await dispatch(addAddress(data)).unwrap();
        console.log("adding data", data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(address);
  return (
    userInfo && (
      <div>
        <p className="text-2xl font-semibold mb-8"> Profile</p>
        <div className="">
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: { xs: "100%", sm: "25ch", md: "30ch", lg: "40ch" },
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "#f6f7f8",
                borderRadius: "10px",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="UserName"
                id="filled-size-small"
                defaultValue={userInfo.username}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ backgroundColor: "#f6f7f8" }}
                variant="filled"
                size="small"
              />
              <TextField
                label="FullName"
                defaultValue={userInfo.fullName}
                InputProps={{
                  readOnly: true,
                }}
                {...register("fullName")}
                id="filled-size-small"
                variant="filled"
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Email"
                defaultValue={userInfo.email}
                {...register("email")}
                InputProps={{
                  readOnly: true,
                }}
                id="filled-size-small"
                variant="filled"
                size="small"
              />
              <TextField
                label="Number"
                id="filled-size-small"
                {...register("number", { required: true })}
                defaultValue={address?.number}
                variant="filled"
                size="small"
              />
            </div>
            <div>
              <TextField
                label="City/Town"
                {...register("city", { required: true })}
                id="filled-size-small"
                defaultValue={address?.city}
                variant="filled"
                size="small"
              />
              <TextField
                label="State"
                id="filled-size-small"
                {...register("state", { required: true })}
                defaultValue={address?.state}
                variant="filled"
                size="small"
              />
            </div>
            <div>
              <TextField
                label="landmark"
                id="filled-size-small"
                {...register("landmark", { required: true })}
                defaultValue={address?.landmark}
                variant="filled"
                size="small"
              />
              <TextField
                label="Zip Code"
                id="filled-size-small"
                {...register("zipCode", { required: true })}
                defaultValue={address?.zipCode}
                variant="filled"
                size="small"
              />
            </div>
            <div className="">
              <TextField
                label="address?"
                id="filled-size-small"
                {...register("address", { required: true })}
                defaultValue={address?.address}
                variant="filled"
                size="small"
              />
            </div>
            <div className=" text-end mr-8 mb-8">
              <Button
                bgColor={"#1c252e"}
                textColor={"#ffffff"}
                text={"Save Changes"}
              />
            </div>
          </Box>
        </div>
      </div>
    )
  );
}
