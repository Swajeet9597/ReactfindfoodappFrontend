import React, { useContext, useEffect, useState } from "react";
import "./Messcard.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import veg from '../../assets/vegicon.png';
import nonveg from '../../assets/nonveg-icon.png';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import CallIcon from '@mui/icons-material/Call';
import { DataContext } from "../../contextApi/context";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';

const Messcard = ({ search }) => {
  const { val,loc, messDetailsArray, timeDetailsArray, valType, setMessMenu, ratingArray, setOpenMenu, menuDetailsArray,setMessDetaislArray } = useContext(DataContext);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  const navigate = useNavigate();

  const [newMessArray, setNewMessArray] = useState([])

  // Store image index separately for each mess
  const [messImageIndices, setMessImageIndices] = useState({});

  console.log("ppp",messDetailsArray);

  // Function to handle next image for a specific mess
  const goToNext = (index, mess) => {
    setMessImageIndices((prev) => ({
      ...prev,
      [index]: prev[index] === undefined
        ? 1
        : (prev[index] + 1) % mess.messImages.length
    }));
  };

  // Function to handle previous image for a specific mess
  const goToPrev = (index, mess) => {
    setMessImageIndices((prev) => ({
      ...prev,
      [index]: prev[index] === undefined
        ? mess.messImages.length - 1
        : (prev[index] - 1 + mess.messImages.length) % mess.messImages.length
    }));
  };

  const convertTo12Hour = (time24) => {
    if (!time24) return "";
    let [hours, minutes] = time24.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const isMessOpen = (morning, evening) => {
    const getCurrentTime = () => {
      const now = new Date();
      return now.getHours() * 60 + now.getMinutes();
    };

    const convertToMinutes = (time24) => {
      if (!time24) return 0;
      let [hours, minutes] = time24.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const currentTime = getCurrentTime();
    const morningOpen = convertToMinutes(morning.from);
    const morningClose = convertToMinutes(morning.to);
    const eveningOpen = convertToMinutes(evening.from);
    const eveningClose = convertToMinutes(evening.to);

    const closingThreshold = 30;

    if (
      (currentTime >= morningOpen && currentTime < morningClose) ||
      (currentTime >= eveningOpen && currentTime < eveningClose)
    ) {
      if (
        (currentTime >= morningClose - closingThreshold && currentTime < morningClose) ||
        (currentTime >= eveningClose - closingThreshold && currentTime < eveningClose)
      ) {
        return { status: "Closing Soon", color: "orange" };
      }
      return { status: "Open", color: "green" };
    }

    return { status: "Closed", color: "red" };
  };

  console.log("rating array ",ratingArray,newMessArray);

  useEffect(()=>{
    console.log("mess card useeffect");

    const updatedMessArray = messDetailsArray.map(mess => {
      const ratingObj = ratingArray.find(r => r.messUserId === mess.userId);
      return { ...mess, rating: ratingObj ? ratingObj.rating : 0 }; // Default to 0 if no rating found
    });

    console.log(updatedMessArray);

    setNewMessArray(updatedMessArray);
    // setMessDetaislArray(updatedMessArray);

  },[messDetailsArray])

  return (
    <>
      {
      newMessArray
        .filter((item) => (val === "any" ? item : item.rating >= val+0.0))
        .filter((item) => (loc?.toLowerCase() === "location" ? item : item.address.city.toLowerCase().includes(loc.toLowerCase())))
        .filter((item) => (valType.toLowerCase() === "any" ? item : item.foodType.toLowerCase() == valType.toLowerCase()))
        .filter((item) => (search.toLowerCase() === "" ? item : item.messName.toLowerCase().includes(search)))
        .map((mess, index) => {
          const morningTime = timeDetailsArray[index].morning;
          const eveningTime = timeDetailsArray[index].evening;
          const { status, color } = isMessOpen(morningTime, eveningTime);

          const handleMenu = (menuMess) => {
            setMessMenu(menuMess);
            setOpenMenu(true);
          };

          const handleClickOnName = (userId) => {
            navigate(`/customer/${userId}`);
          };

          return (

            <> 

            <div key={index} className="messcard">
              {/* Image Carousel */}
              <div className="carousel">
                <img
                  className="carousel-image"
                  src={mess.messImages[messImageIndices[index]] || mess.messImages[0]}
                  alt="Mess Images"
                />

                {/* Prev Button */}
                <button className="carousel-control prev" onClick={() => goToPrev(index, mess)}>
                  <ArrowBackIosIcon sx={{ color: "black" }} />
                </button>

                {/* Next Button */}
                <button className="carousel-control next" onClick={() => goToNext(index, mess)}>
                  <ArrowForwardIosIcon sx={{ color: "black" }} />
                </button>
              </div>

              {/* Mess Information */}

              <div className="messCardInfo">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span onClick={() => handleClickOnName(mess.userId)} style={{ fontSize: "1.9rem", fontWeight: "500", cursor: "pointer" }}>
                    {mess.messName}
                  </span>
                  <span>
                    {mess.foodType === "veg" ? (
                      <img src={veg} width={40} alt="Veg Icon" />
                    ) : (
                      <>
                        <img src={veg} width={40} alt="Veg Icon" />
                        <img src={nonveg} width={40} alt="Non-Veg Icon" />
                      </>
                    )}
                  </span>
                </div>

                <div className="messAdd">
                  <PlaceIcon sx={{ fontSize: 30 }} />
                  {mess.address.landmark}, {mess.address.area}, {mess.address.city}
                </div>

                {/* Rating */}
                <div className="rating">
                  {ratingArray.some((item) => item?.messUserId === mess.userId) ? (
                    <>
                      <span className="ratingdisplay">{(ratingArray.filter((i)=>(i?.messUserId == mess.userId)).reduce((sum, item) => sum + item.rating, 0) / ratingArray.filter((i)=>(i?.messUserId == mess.userId)).length).toFixed(1)}</span>
                      <span className="ratingdisplayStar">
                        {/* <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarBorderIcon /> */}
                                                             {/* {[...Array(5)].map((_, index) => (
        index < Math.round(ratingArray.filter((i)=>(i?.messUserId == mess.userId)).reduce((sum, item) => sum + item.rating, 0) / ratingArray.filter((i)=>(i?.messUserId == mess.userId)).length) ? <StarIcon key={index} style={{ color: "gold" }} /> : <StarBorderIcon key={index} style={{ color: "gray" }} />
      ))} */}
      <Rating name="half-rating-read" defaultValue={(ratingArray.filter((i)=>(i?.messUserId == mess.userId)).reduce((sum, item) => sum + item.rating, 0) / ratingArray.filter((i)=>(i?.messUserId == mess.userId)).length).toFixed(1)} precision={0.5} readOnly />
                      </span>
                    </>
                  ) : (
                    <>Your feedback makes us better! Rate us!</>
                  )}
                </div>

                {/* Mess Timings */}
                <div className="messTime">
                  <span className="messMornig">
                    <LightModeIcon />
                    {convertTo12Hour(timeDetailsArray[index].morning.from)} to{" "}
                    {convertTo12Hour(timeDetailsArray[index].morning.to)}
                  </span>

                  <span className="messMornig" style={{ marginLeft: "2rem" }}>
                    <BedtimeIcon />
                    {convertTo12Hour(timeDetailsArray[index].evening.from)} to{" "}
                    {convertTo12Hour(timeDetailsArray[index].evening.to)}
                  </span>
                </div>

                {/* Open/Closed Status */}
                <div style={{ fontSize: "1.5rem", fontWeight: "500", marginTop: "1.3rem", color }}>
                  {days[today] === timeDetailsArray[index].holiday.day ? (
                    <span style={{ color: "red" }}> Closed for {timeDetailsArray[index].holiday.period}</span>
                  ) : (
                    status
                  )}
                </div>

                {/* Contact & Menu */}
                <div className="contactAmenu">
                  <div className="contactNum">
                    <CallIcon />
                    {mess.contact.mobileNumber}
                  </div>

                  <div onClick={() => handleMenu(menuDetailsArray[index])} className="contactNum">Menu</div>
                </div>
              </div>
            </div>

            </>
          );
        })}
    </>
  );
};

export default Messcard;
