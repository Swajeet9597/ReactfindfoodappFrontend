import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DataContext } from '../../contextApi/context';

export default function RowRadioButtonsGroup() {
    const {messDetails, setMessDetails} = React.useContext(DataContext)
    const handleFoodType = (e)=>{
        let val = e.target.value
        setMessDetails({
            ...messDetails,
            foodType:val
        })
    }
  return (
    <FormControl 
  sx={{ 
    borderRadius: "8px", // Adds rounded corners
    width: "50%", // Adjusts width// Moves it down
  }}
>
  <FormLabel 
    sx={{
      fontSize: "2rem", 
      color: "black", 
      fontWeight: "500",
      "&.Mui-focused": { color: "black" },  
    }} 
    id="demo-row-radio-buttons-group-label"
  >
    Food you serve
  </FormLabel>
  
  <RadioGroup
    row
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
    onChange={handleFoodType}
    value={messDetails.foodType}
  >
    <FormControlLabel 
      value="veg" 
      control={<Radio sx={{ color: "#404040", '&.Mui-checked': { color: "green" } }} />} 
      label={<span style={{ color: "black", fontSize: "1.5rem" }}>Veg</span>} 
    />
    
    <FormControlLabel 
      value="nonveg" 
      control={<Radio sx={{ color: "#404040", '&.Mui-checked': { color: "red" } }} />} 
      label={<span style={{ color: "black", fontSize: "1.5rem" }}>Non-Veg</span>} 
    />
  </RadioGroup>
</FormControl>

  );
}