import { Box, TextField } from "@mui/material";
import React from "react";
import Button from "../Button";

export default function ChangePassword() {
  return (
    <div className="bg-white md:w-[80%] mx-auto">
      <div className=" flex  justify-end">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: { xs: "100%", sm: "25ch", md: "30ch", lg: "80ch" },
            },
            "& .MuiFilledInput-root": {
              backgroundColor: "#f6f7f8",
              borderRadius: "10px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="p-4">
            <p className="text-xl font-semibold">Change Password</p>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Old Password"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="New Password"
              variant="outlined"
            />
          </div>{" "}
          <div>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
            />
          </div>
          <div className="place-content-end flex py-2">
            <Button
              text={"Save Changes"}
              bgColor={"#1c252e"}
              textColor={"#ffffff"}
            />
          </div>
        </Box>
      </div>
    </div>
  );
}
