import React, { useContext } from 'react';
import TextField from "@mui/material/TextField";
import { DataContext } from '../../contextApi/context';

const Largeinputbox = ({lable,type,width,name}) => {

    const {setMessDetails,messDetails,priceDetails, setPriceDetails} = useContext(DataContext)

    const handleChange = (e)=>{

        let name = e.target.name
        let val = e.target.value
        if(lable == "Mess Name"){

            setMessDetails({
                ...messDetails,
                [name]:val
            })
        }
        if(lable == "Monthly membership charges" || lable == "Single time meal charges" || lable == "Special day veg charges" || lable == "Special day non-veg charges" ){
            setPriceDetails({
                ...priceDetails,
                [name]:val
            })
        }
    }

    // console.log(priceDetails);
  return (
    <TextField
    sx={{
      width: `${width}`,
      marginLeft: "3rem",
      marginTop: "2rem",
      "& .MuiOutlinedInput-root": {
        color: "Black", // Change text color
        fontSize: "1.5rem", // Change font size
      },
      "& .MuiInputLabel-root": {
        color: "#404040", // Change label color
        fontSize: "1.5rem",
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
    type={type}
    name={name}
    value={lable == "Mess Name" ? messDetails[name] : priceDetails[name] }
    onChange={handleChange}
    required
  />

  );
}

export default Largeinputbox;
