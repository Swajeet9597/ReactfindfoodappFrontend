import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataContext } from "../../contextApi/context";

export default function BasicSelect() {
  // Ensure default state is an empty string
  const [holiday, setholiday] = useState("");

  const {timeDetails, setTimeDetails} = useContext(DataContext)

  const handleChange = (event) => {
    const h = event.target.value
    setTimeDetails({
      ...timeDetails,
      holiday:{
        ...timeDetails.holiday,day: h
      }
    })
    setholiday(h)
  };
  // console.log("Holiday value:", holiday);

  return (
    <Box sx={{ width:"40%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">holiday</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeDetails.holiday.day} 
          label="Holiday"
          onChange={handleChange}

        >
                <MenuItem value="None">None</MenuItem> 
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem> 
                <MenuItem value="Wednesday">Wednesday</MenuItem>           <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
            
        </Select>
      </FormControl>
    </Box>
  );
}
