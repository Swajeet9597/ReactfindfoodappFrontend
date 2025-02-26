import React from 'react';
import './Profile.css'
import Rating from '@mui/material/Rating';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = ({rating}) => {
  return (
    <div className='feedback' >
      <div style={{marginTop:"2rem"}} >

      <span style={{fontSize:"2rem",marginLeft:"1.5rem",fontWeight:"500"}} >Feedback</span>
      </div>

      {rating.map(item=>(
            <div className="feedBackCard">
                <span style={{display:"flex", alignItems:"center", gap:"1rem"}} >
                    <AccountCircleIcon sx={{fontSize:"3rem"}} />
                    <span style={{fontSize:"1.3rem"}} >{item.customerUserId}</span>             
                </span>
                <Rating sx={{marginTop:"1rem"}} name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                <div style={{marginTop:"0.5rem",display:"flex",justifyContent:"space-between",alignItems:"center"}} >
                <span style={{marginTop:"0.5rem",fontSize:"1.3rem"}} >{item.feedback}</span>
                <span style={{fontSize:"1.3rem"}} >time</span>
                </div>
            </div>
      ))}
     
    </div>
  );
}

export default Profile;
