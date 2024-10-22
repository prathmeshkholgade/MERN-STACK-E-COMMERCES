import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectBox({ option ,defaultValue}) {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="w-40">
      <Box sx={{ Width: "200px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            defaultValue={defaultValue}
            label="Order Status"
            onChange={handleChange}
          >
            {option.map((opn) => (
              <MenuItem value={opn}>{opn}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
