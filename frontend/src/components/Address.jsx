import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import indiaStates from "../utils/indiaState";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAddress } from "../app/features/auth/authSlice";

export default function Address({ showForm, setshowForm }) {
  const { register, handleSubmit, reset } = useForm();
  const width = {
    xs: "20ch", // Extra-small devices (0px - 600px)
    sm: "30ch", // Small devices (600px - 960px)
    md: "25ch", // Medium devices (960px - 1280px)
    lg: "25ch", // Large devices (1280px - 1920px)
    xl: "35ch", // Extra-large devices (1920px and above)
  };
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(addAddress(data));
    reset();
    setshowForm(false);
  };
  return (
    <div className="w-full md::w-1/2">
      <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
        <Box
          // component="form"

          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: width,
            },
          }}
        >
          <div
            className="w-full my-2 text-lg
          "
          >
            <h4>Personal details</h4>
          </div>
          <div className="flex  w-full">
            <div className=" ">
              <TextField
                id="outlined-basic"
                label="Frist Name"
                {...register("fristName", { required: { value: true } })}
                type="text"
                // sx={{width:"400px"}}
                size="small"
              />
            </div>
            <div className="">
              <TextField
                id="outlined-basic"
                {...register("lastName", { required: { value: true } })}
                label="Last Name"
                type="text"
                size="small"
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className=" ">
              <TextField
                id="outlined-basic"
                {...register("email", { required: { value: true } })}
                label="Email Address"
                type="text"
                size="small"
              />
            </div>
            <div className="">
              <TextField
                id="outlined-basic"
                {...register("number", { required: { value: true } })}
                label="Phone Number"
                type="text"
                size="small"
              />
            </div>
          </div>
          <div
            className="w-full my-2 text-lg
          "
          >
            <h4>Shhipping details</h4>
          </div>
          <div className="flex w-full">
            <div className="w-full ">
              <TextField
                id="outlined-basic"
                {...register("address", { required: { value: true } })}
                label="Address (Area ans Street)"
                type="text"
                // sx={{ width: { xs: "100%" } }}
                size="small"
              />
            </div>
            <div className="">
              <TextField
                id="outlined-basic"
                {...register("city", { required: { value: true } })}
                label="City/District/Town"
                type="text"
                size="small"
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className=" ">
              <FormControl sx={{ m: 1, minWidth: width }} size="small">
                <InputLabel id="demo-select-small-label">
                  Select State
                </InputLabel>
                <Select
                  {...register("state", { required: { value: true } })}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // value={age}
                  //   size="small"
                  //   sx={{ width: "300px" }}
                  label="Age"
                  // onChange={handleChange}
                >
                  {indiaStates.map((state) => (
                    <MenuItem value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="">
              <TextField
                id="outlined-basic"
                label="LandMark (Optional)"
                {...register("landmark", { required: { value: true } })}
                type="text"
                size="small"
              />
            </div>
          </div>
          <div className="flex">
            <div className="">
              <TextField
                id="outlined-basic"
                {...register("zipCode", { required: { value: true } })}
                label="ZIP Code"
                type="text"
                size="small"
              />
            </div>
            <div className="">
              <TextField
                id="outlined-basic"
                {...register("alternateNumber", { required: { value: true } })}
                label="Alternate Phone (Optional)"
                type="text"
                size="small"
              />
            </div>
          </div>
          <div className=" text-white">
            <button
              type="submit"
              className="bg-[#fb641b] my-2 py-2 px-4 w-[30%] rounded-lg"
            >
              Add
            </button>
          </div>
        </Box>
      </form>
    </div>
  );
}
