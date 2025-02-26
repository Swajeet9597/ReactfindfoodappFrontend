
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

export default function AccordionExpandDefault({ time, setNext,Btnname }) {
  const { menuDetails, setMenuDetails,menuOptions, setMenuOptions } = useContext(DataContext);
  // const [menuOptions, setMenuOptions] = useState(["Holiday", "Chapatii", "Rice", "Daal", "Papad", "Salad", "Curd"]);

  const [menu, setMenu] = useState(() =>
    menuDetails[time] && Object.keys(menuDetails[time]).length > 0
      ? menuDetails[time]
      : daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: ["Chapatii","Rice"] }), {})
  );

  const [newItems, setNewItems] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: "" }), {})
  );

  const handleCheckboxChange = (day, item) => {
    console.log("without Changes",Btnname);
    setMenu((prevMenu) => {
      const updatedDayMenu = prevMenu[day]?.includes(item)
        ? prevMenu[day].filter((i) => i !== item)
        : [...prevMenu[day], item]; 

      return { ...prevMenu, [day]: updatedDayMenu };
    });

  };



  const handleInputChange = (day, value) => {
    setNewItems((prevItems) => ({ ...prevItems, [day]: value }));
  };

  const handleAddItem = (day) => {
    console.log("bbbbbb",newItems);
    const newItem = newItems[day].trim();
    if (!newItem) return;

    setMenuOptions( {
      ...menuOptions,
      [time]:{
        ...menuOptions[time],
        [day]:[
          ...menuOptions[time][day], newItem
        ]
      }
    });
    setNewItems((prevItems) => ({ ...prevItems, [day]: "" }));
  };

  function handleAddItemEverywhere(day, value){
    const newItem = newItems[day].trim();
    if (!newItem) return;

    setMenuOptions((prevMenu) => {
      const updatedTimeOfDay = Object.keys(prevMenu[time]).reduce((acc, day) => {
          acc[day] = [...prevMenu[time][day], newItem]; // Add newItem to each day
          return acc;
      }, {});

      return {
          ...prevMenu,
          [time]: updatedTimeOfDay, // Update morning/evening menu
      };
  });
    setNewItems((prevItems) => ({ ...prevItems, [day]: "" }));
  }
  
  console.log("special log menu details",menuDetails);




  // Sync menu state with menuDetails
  useEffect(() => {
    setMenuDetails((prev) => ({
      ...prev,
      [time]: menu,
    }));

    // setNext(Object.values(menu).every((dayMenu) => dayMenu.length > 0))
  }, [menu, setMenuDetails, setNext, time]);



  return (
    <div style={{ width: "88%", margin: "auto" }}>
      {daysOfWeek.map((day) => (
        <Accordion key={day} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>{day}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* Checkboxes for default menu options */}
            {menuOptions[time][day].map((item) => (
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
            ))}

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
              <Button variant="contained" onClick={() => handleAddItemEverywhere(day)} sx={{ textTransform: "none" }}>
                Add Everywhere
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
