
import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataContext } from "../../contextApi/context";
import { BASE_URL } from "../../helper";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AccordionExpand({ time, setNext,Btnname }) {
  const { menuDetails, setMenuDetails,setLoader,setUpdate } = useContext(DataContext);
  const [menuOptions, setMenuOptions] = useState(["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"]);

  const [menu, setMenu] = useState(() =>
    menuDetails[time] && Object.keys(menuDetails[time]).length > 0
      ? menuDetails[time]
      : daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: ["Chapatii","Rice"] }), {})
  );

  const [newItems, setNewItems] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: "" }), {})
  );


  const handleCheckboxChange = (day, item) => {
    console.log("without Changes",item);



    const updatedList = menuDetails[time][day].includes(item)  
                        ? 
                        // {...menuDetails,[time]:{...menuDetails[time][day].filter((i)=>i !== item)}} 
                        menuDetails[time][day].filter((i)=>i !== item)

                        : null
                   
         
    if(updatedList){
      setMenuDetails({
        ...menuDetails,
        [time]:{
          ...menuDetails[time],
          [day]:[
            ...updatedList
          ]
        }
      })
    }
    console.log("updated",updatedList);  
    
    if(!updatedList){
      setMenuDetails({
        ...menuDetails,
        [time]:{
            ...menuDetails[time],
            [day]:[
                ...menuDetails[time][day],
                item
            ]
        }
    })

    }

                        

    
  };



  const handleInputChange = (day, value) => {

    setNewItems((prevItems) => ({ ...prevItems, [day]: value }));

    console.log(day,value);

  };

  const handleAddItem = (day) => {
    const newItem = newItems[day].trim();
    if (!newItem) return;

    console.log(newItem);

    setMenuDetails({
      ...menuDetails,
      [time]:{
        ...menuDetails[time],
        [day]:[
          ...menuDetails[time][day], newItem
        ]
      }
    })

    // setMenuOptions((prevOptions) => [...prevOptions, newItem]);
    setNewItems((prevItems) => ({ ...prevItems, [day]: "" }));
  };
  console.log("special log menu details",menuDetails);


  const getData = async()=>{
    try {
        setLoader(true)
        // console.log("fun called");
        const response = await fetch(`${BASE_URL}/api/user/menuDetailsData`,{
            method:"GET",
            credentials:"include"
        })

        const data = await response.json()

        // console.log("response responsejson",data);

        if(data.success){
            // console.log("response menu",data.data);
            const {__v,_id,...menuObj} = data.data
            setMenuDetails(menuObj)
            
        }
        
        setLoader(false)
    } catch (error) {
        console.log(error);
    }
}




  useEffect(() => {
    setMenuDetails((prev) => ({
      ...prev,
      [time]: menu,
    }));
    // setNext(Object.values(menu).every((dayMenu) => dayMenu.length > 0))
  }, [menu, setMenuDetails, setNext, time]);

  useEffect(()=>{
    getData()
  },[setMenuDetails])



  return (
    <div style={{ width: "88%", margin: "auto" }}>
      {daysOfWeek.map((day) => (
        <Accordion key={day} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>{day}</Typography>
          </AccordionSummary>
          <AccordionDetails>
    
             {menuDetails[time][day] ? [...menuOptions.filter(i=> !menuDetails[time][day]?.includes(i)),...menuDetails[time][day]]?.map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={menuDetails[time][day]?.includes(item) ? menuDetails[time][day]?.includes(item) : false }
                    onChange={() => handleCheckboxChange(day, item)}
                  />
                }
                label={item}
              />
            )) : <></>}

            {/* Input for adding a new menu item */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <TextField
                label="Add your menu"
                variant="outlined"
                size="small"
                value={newItems[day]}
                onChange={(e) => handleInputChange(day, e.target.value)}
              />
              <Button variant="contained" onClick={() => handleAddItem(day)} sx={{ textTransform: "none" }}>
                Add
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
