import React, { useContext } from 'react';
import TextField from "@mui/material/TextField";
import { DataContext } from '../../contextApi/context';
const Inputbox = ({lable,type,width,name,section}) => {
  const {setMessDetails,messDetails,timeDetails, setTimeDetails} = useContext(DataContext)

  const handleChange = (e)=>{
      // console.log("ll");
      let name = e.target.name
      let val = e.target.value

      setMessDetails({
          ...messDetails,
          [name]:val
      })
  }

  const handleNestedChange = (e,section)=>{
      let val = e.target.value
      let name = e.target.name

      // console.log(val);

      if(type == "time"){
        return setTimeDetails({
          ...timeDetails,
          [section]:{
            ...timeDetails[section] ,
            [name]:val
          }
        })
      }

      setMessDetails({
        ...messDetails,
        [section]:{
        ...messDetails[section],
          [name]:val
        }
      })
      
  }
  // console.log(timeDetails);
  return (
    <TextField
    sx={{
      width: `${width}`,
      height:"auto",
      "& .MuiOutlinedInput-root": {
        color: "Black", // Change text color
        fontSize: "1.2rem", // Change font size
      },
      "& .MuiInputLabel-root": {
        color: "#404040", // Change label color
        fontSize: "1rem",
      },
      "& .MuiOutlinedInput-input": {
        padding: "10px 5px", // Adjusts internal padding of the input text
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#404040", // Change border color
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#404040", // Change border color on hover
      },
    }}
    id="outlined-basic"
    label={lable}
    variant="outlined"
    value={type == "time" ?  timeDetails[section][name] : messDetails[section][name]}
    type={type}
    name={name}
    onChange={!section ? handleChange : (e)=>handleNestedChange(e,section)}
    required
    
  />
  );
}

export default Inputbox;
