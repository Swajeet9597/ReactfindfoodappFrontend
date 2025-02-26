import React, { useContext, useEffect, useState } from 'react';
import './Ratingpopup.css'
import messimg from '../../assets/punjabi-mess-3-cropped-1568798950-1590740061.jpg'
import emptyStar from '../../assets/unfillstar.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import close from '../../assets/close.png'
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { DataContext } from '../../contextApi/context';
import { BASE_URL } from '../../helper';
import { toast } from 'react-toastify';

const Ratingpopup = ({setRatepopup,customerId}) => {

    const{ratingDetails,setRatingDetails} = useContext(DataContext)



    const [stars,setStars] = useState(0)

    function handleStarClick(star) {
        console.log("Rating",star);
        setStars(star)
        
    }

    function handleinput(e) {
        setRatingDetails({
            ...ratingDetails,
            feedback:e.target.value
        })
    }

    async function handleSubmit() {

        if(ratingDetails.feedback == "" || ratingDetails.rating == "" ){
            return toast.error("plz fill all details")
        }

        const response = await fetch(`${BASE_URL}/api/user/saveRating`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(ratingDetails)
        })

        const data = await response.json()

        console.log(data);
        
        setRatepopup(false)
        console.log(ratingDetails);
    }

    useEffect(()=>{
        setRatingDetails({
            ...ratingDetails,
            rating : stars
        })
    },[stars])

  

  return (
    <div className='ratingPop' >

        <div className="ratingpopupBox">

            <img onClick={()=>setRatepopup(false)} style={{position:"absolute",right:"0", top:"0",cursor:"pointer"}}  width={40} src={close} alt="" />

                <div className="rateStarbbox">

                    <div className="imgandMessname">
                        <img src={messimg} alt="image" />
                        <span style={{fontSize:"1.5rem",marginLeft:"1rem"}} >mess name</span>
                    </div>

                    <span style={{marginTop:"0.5rem"}} >How would you rate your experience ?</span>
                    <span style={{marginTop:"0.5rem"}}>Click to rate</span>

                    <div className="starimgs"style={{marginTop:"0.8rem", display:"flex", gap:"0.5rem"}} >

                        {/* <img src={emptyStar} width={30} alt="" />
                        <img src={emptyStar} width={30} alt="" />
                        <img src={emptyStar} width={30} alt="" />
                        <img src={emptyStar} width={30} alt="" />
                        <img src={emptyStar} width={30} alt="" /> */}
                         {[...Array(5)].map((_, index) => (
        index < stars ? <StarIcon onClick={()=>handleStarClick(index+1)} key={index} style={{ color: "gold" }} /> : <StarBorderIcon onClick={()=>handleStarClick(index+1)} key={index} style={{ color: "gray" }} />
      ))}
                    </div>

                </div>

                <div className="rateStarbbox">

                    <span style={{marginBottom:"1rem"}} > Please ! tell us about our food and service.</span>

                    <TextField onChange={handleinput} id="standard-basic" label="Feedback" variant="standard" />

                    <Button onClick={handleSubmit} sx={{marginTop:"1rem"}} variant="contained">Submit Feedback</Button>
                    
                </div>

        </div>
      
    </div>
  );
}

export default Ratingpopup;
