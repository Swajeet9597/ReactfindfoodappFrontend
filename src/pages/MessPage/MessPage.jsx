import React, { useContext, useEffect, useState } from 'react';
import './MessPage.css'
import { DataContext } from '../../contextApi/context';
import { BASE_URL } from '../../helper';
import LoadingPage from '../../components/LoadPage/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import veg from '../../assets/vegicon.png';
import nonveg from '../../assets/nonveg-icon.png';
import dot from '../../assets/dot.png'
import CallIcon from '@mui/icons-material/Call';
import DirectionsIcon from '@mui/icons-material/Directions';
import rightArrow from '../../assets/up-arrow.png'
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Ratingpopup from '../../components/Ratingpopup/Ratingpopup';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
// import StarBorderIcon from "@mui/icons-material/StarBorder";

const MessPage = () => {

    const [load,setLoad] = useState(true)

    

    const navigate = useNavigate()

    const [ratePopup,setRatepopup] = useState(false)

    const {ratingDetails,setRatingDetails,timeDetailsArray,ratingArray,messDetailsArray,setMessDetaislArray,setMenuDetaislArray,setPriceDetaislArray,setTimeDetaislArray,setRatingArray} = useContext(DataContext)

    const [currIndex,setCurrIndex] = useState(0)

    let customerId = ""

    // const [images,setImages] = useState([])

    const path = window.location.pathname.split("/")[2]


    const auth = async()=>{

        try {
            const response = await fetch(`${BASE_URL}/api/user/auth`,{
                method:"GET",
                credentials:"include"
              })
        
              const data = await response.json()
    
              if(!data.success){
                toast.error("User must login...")
                navigate('/login')  
              }

              setRatingDetails({
                ...ratingDetails,
                customerUserId:data.data.id ,
                messUserId:window.location.pathname.split("/")[2]
            })


              const res2 = await fetch(`${BASE_URL}/api/user/getAllMess`,{
                method:"GET",
                credentials:"include"
              })

              const data2 = await res2.json()

            setMessDetaislArray(data2.messDetails)
            setMenuDetaislArray(data2.menuDetails)
            setPriceDetaislArray(data2.priceDetails)
            setTimeDetaislArray(data2.timeDetails)
            setRatingArray(data2.rating)  
            // setImages(messDetailsArray.filter((i)=>(i?.userId == path))[0]?.messImages)
         
            
            setLoad(false)

        } catch (error) {
            console.log(error);
        }
    }

    const addViews = async()=>{
      try {
        
        const response = await fetch(`${BASE_URL}/api/user/addViews`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({messUserId:path})
        })



      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
        auth()
    },[ratePopup])

    useEffect(()=>{
      addViews()
        console.log("Mess view");
    },[])


    function nextImg() {
   
        setCurrIndex((curr)=> curr == messDetailsArray.filter((i)=>(i?.userId == path))[0]?.messImages.length-1 ? 0 : currIndex+1)
    }
    
    function prevImg() {
        setCurrIndex((curr)=> curr == 0 ? messDetailsArray.filter((i)=>(i?.userId == path))[0]?.messImages.length-1 : currIndex-1)
        
    }

    const convertTo12Hour = (time24) => {
        if (!time24) return "";
        let [hours, minutes] = time24.split(":").map(Number);
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
      };

      function handleClick() {
        console.log("Rating...");
        setRatepopup(true)
      }

      function handleBack() {
        navigate("/customer")
      }


  return (
    <div className='messPg' >

        <div className="messPgbox">

            <ArrowBackIcon onClick={handleBack} sx={{position:"absolute", fontSize:"2rem", left:"10px", top:"10px"}} />

                <div className="imgBoxMess">
                    <img style={{width:"100%",height:"100%"}} src={messDetailsArray.filter((i)=>(i?.userId == path))[0]?.messImages ? messDetailsArray.filter((i)=>(i?.userId == path))[0]?.messImages[currIndex] : ""} alt="" />
                    <button onClick={prevImg}  className='leftBtn' >&#60;</button>
                    <button onClick={nextImg}  className='rightBtn'>&#62;</button>
                </div>

                <div className="messCardInfo" style={{width:"85%",marginTop:"1.5rem", gap:"1rem"}} >

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1.9rem", fontWeight: "500", cursor: "pointer" }}>
                    {messDetailsArray.filter((i)=>(i?.userId == path))[0]?.messName}
                  </span>
                  <span>
                    {messDetailsArray.filter((i)=>(i?.userId == path))[0]?.foodType === "veg" ? (
                      <img src={veg} width={40} alt="Veg Icon" />
                    ) : (
                      <>
                        <img src={veg} width={40} alt="Veg Icon" />
                        <img src={nonveg} width={40} alt="Non-Veg Icon" />
                      </>
                    )}
                  </span>
                </div>

                <div className="messAdd" style={{ fontSize:"1.5rem", fontWeight:"400",width:"auto" }} >
                  Address
                  <PlaceIcon sx={{ fontSize: 30,marginLeft:"0.3rem" }} />
                  <span style={{marginLeft:"2rem",display:"flex",width:"auto",alignItems:"center"}} >
                     {/* <img src={dot} width={30} alt="" /> */}
                  
                  <div className="messTime" style={{width:"auto",marginTop:"0",height:"auto",display:"flex",flexWrap:"wrap",columnGap:"1.5rem"}}>
                  <span className="messMornig">
                    <LightModeIcon />

                    {convertTo12Hour(timeDetailsArray.filter((i)=>(i?.userId == path))[0]?.morning.from)} to{" "}


                    {convertTo12Hour(timeDetailsArray.filter((i)=>(i?.userId == path))[0]?.morning.to)}





                  </span>

                  <span className="messMornig" style={{ marginLeft: "0rem" }}>
                    <BedtimeIcon />
                    {convertTo12Hour(timeDetailsArray.filter((i)=>(i?.userId == path))[0]?.evening.from)} to{" "}
                    {convertTo12Hour(timeDetailsArray.filter((i)=>(i?.userId == path))[0]?.evening.to)}
                  </span>
                </div>

                  
                   </span>
                </div>

                

                {/* Rating */}
                <span>{messDetailsArray.filter((i)=>(i?.userId == path))[0]?.address.landmark}, {messDetailsArray.filter((i)=>(i?.userId == path))[0]?.address.area}, {messDetailsArray.filter((i)=>(i?.userId == path))[0]?.address.city}</span>
                <div className="rating">
                  {ratingArray.some((item) => item?.messUserId === messDetailsArray.filter((i)=>(i?.userId == path))[0]?.userId) ? (
                    <>
                      <span onClick={handleClick} className="ratingdisplay">{((ratingArray.filter((i)=>(i?.messUserId == path)).reduce((sum, item) => sum + item.rating, 0) / ratingArray.filter((i)=>(i?.messUserId == path)).length).toFixed(1))}</span>

                      <span className="ratingdisplayStar">
                        {/* <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarBorderIcon /> */}
                                           {/* {[...Array(5)].map((_, index) => (
        index < Math.round(ratingArray.filter((i)=>(i?.messUserId == path)).reduce((sum, item) => sum + item.rating, 0) / ratingArray.filter((i)=>(i?.messUserId == path)).length) ? <StarIcon key={index} style={{ color: "gold" }} /> : <StarBorderIcon key={index} style={{ color: "gray" }} />
      ))} */}
      <Rating name="half-rating-read" defaultValue={(ratingArray.filter((i)=>(i?.messUserId == path)).reduce((sum, item) => sum + item.rating, 0) / ratingArray.filter((i)=>(i?.messUserId == path)).length).toFixed(1)} precision={0.5} readOnly />
                      </span>

                    </>

                  ) : (
                    <>Your feedback makes us better! Rate us!    </>
                  )}
                  <RateReviewIcon onClick={handleClick} sx={{marginLeft:"1rem" , cursor:"pointer"}} />
                </div>

                <div className="contactAmenu">
                  <div className="contactNum">
                    <CallIcon />
                    {messDetailsArray.filter((i)=>(i?.userId == path))[0]?.contact.mobileNumber}
                  </div>

                  <div className="contactNum"><img src={rightArrow} width={30} alt="" /></div>
                </div>

                  <div className="dir" style={{width:"85%",display:"flex",gap:"2rem",alignItems:"center",marginTop:"2rem"}} >

                  <div className="contactNum">
                    <DirectionsIcon/>
                    {/* {mess.contact.mobileNumber} */}
                    Direction
                  </div>

                  <div className="contactNum">Notify Mess Owner</div>


                  </div>


            </div>    

        </div>
        {load ? <LoadingPage/> : null}
        {ratePopup ? <Ratingpopup customerId={customerId} setRatepopup={setRatepopup}/> : null }
    </div>
  );
}

export default MessPage;
