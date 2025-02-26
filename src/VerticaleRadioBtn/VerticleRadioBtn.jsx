import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DataContext } from '../contextApi/context';

export default function RadioButtonsGroup() {

    const{timeDetails, setTimeDetails} = React.useContext(DataContext)

    function handleOnchange (e){
        let val = e.target.value
        let name = "holiday"
        setTimeDetails(prevState => ({
            ...prevState,
            holiday: {
                ...prevState.holiday, 
                period: val 
            }
        }));
     

    }

  return (
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleOnchange}
        value={timeDetails.holiday.period ? timeDetails.holiday.period : "" }
      >
        <FormControlLabel value="Full day" control={<Radio />} label="Full day" />
        <FormControlLabel value="Only morning" control={<Radio />} label="Only morning" />
        <FormControlLabel value="Only evening" control={<Radio />} label="Only evening
" />
      </RadioGroup>
    </FormControl>
  );
}