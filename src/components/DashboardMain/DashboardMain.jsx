import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../helper';
import './DashboardMain.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Rating from '@mui/material/Rating';

import uptrend from '../../assets/uptrend.png'
import CustomerVisitChart from '../CustomerVisitChart/CustomerVisitChart';

const DashboardMain = ({rating,views,data,setPeriod,period}) => {

console.log("lklklk",data);

  return (
    <div className='dashContent' >
      
        <div className="dashHead">
            <span style={{fontSize:"2rem",fontWeight:"500"}} >Dashboard</span>
             <NotificationsIcon/>
        </div>

        <div className="ratingviews">
            <div className="ratingC">
                <span style={{marginLeft:"1rem",fontWeight:"500"}} >Customer reviews</span>

               <div style={{display:"flex", marginLeft:"1.3rem", marginTop:"1rem",fontSize:"0.9rem", alignItems:"center",gap:"0.5rem"}} >  
                  <Rating name="half-rating-read" value={(rating?.reduce((sum,item)=>sum+item.rating,0)/rating.length).toFixed(1)} precision={0.5} readOnly /> 
                  <span> { rating.length > 0 ? (rating?.reduce((sum,item)=>sum+item.rating,0)/rating.length).toFixed(1) : null} Out of 5</span>
                </div>

                <span style={{marginLeft:"1.3rem",fontSize:"0.8rem"}}>{rating.length} Global ratings</span>

                <div style={{display:"flex", gap:"0.6rem", alignItems:"center", width:"100%",marginTop:"0.7rem"}} >
                    <span style={{width:"13%"}} >5 Star</span>
                    <div className="ratingBar" style={{width:"70%",height:"1.5rem",background:"#C0C0C0"}}>
                      {/* <div style={{width:`${Math.round((rating.filter((item)=> item.rating == 5).length)*100/rating.length)}%`,height:"1.5rem", background:"#404040",}} ></div> */}
                      <div style={{width: rating.length > 0 ? `${Math.round((rating.filter((item)=> item.rating == 5).length)*100/rating.length)}%` : "0%",height:"1.5rem", background:"#404040",}} ></div>
                      <div></div>
                    </div>
                    <span> {rating.length > 0 ? <>  {Math.round((rating.filter((item)=> item.rating == 5).length)*100/rating.length)}% </>: "0%"}</span>
                </div>

                <div style={{display:"flex", gap:"0.6rem", alignItems:"center", width:"100%",marginTop:"0.7rem"}} >
                    <span style={{width:"13%"}} >4 Star</span>
                    <div className="ratingBar" style={{width:"70%",height:"1.5rem",background:"#C0C0C0"}}>
                      <div style={{width:rating.length > 0 ? `${Math.round((rating.filter((item)=> item.rating == 4).length)*100/rating.length)}%` : "0%",height:"1.5rem", background:"#404040",}} ></div>
                      <div></div>
                    </div>
                    <span>{rating.length > 0 ? <>  {Math.round((rating.filter((item)=> item.rating == 4).length)*100/rating.length)}% </>: "0%"}</span>
                </div>
                <div style={{display:"flex", gap:"0.6rem", alignItems:"center", width:"100%",marginTop:"0.7rem"}} >
                    <span style={{width:"13%"}} >3 Star</span>
                    <div className="ratingBar" style={{width:"70%",height:"1.5rem",background:"#C0C0C0"}}>
                      <div style={{width:rating.length > 0 ? `${Math.round((rating.filter((item)=> item.rating == 3).length)*100/rating.length)}%` : "0%",height:"1.5rem", background:"#404040",}} ></div>
                      <div></div>
                    </div>
                    <span>{rating.length > 0 ? <>  {Math.round((rating.filter((item)=> item.rating == 3).length)*100/rating.length)}% </>: "0%"}</span>
                </div>
                <div style={{display:"flex", gap:"0.6rem", alignItems:"center", width:"100%",marginTop:"0.7rem"}} >
                    <span style={{width:"13%"}} >2 Star</span>
                    <div className="ratingBar" style={{width:"70%",height:"1.5rem",background:"#C0C0C0"}}>
                      <div style={{width:rating.length > 0 ? `${Math.round((rating.filter((item)=> item.rating == 2).length)*100/rating.length)}%` : "0%",height:"1.5rem", background:"#404040",}} ></div>
                      <div></div>
                    </div>
                    <span>{rating.length > 0 ? <>  {Math.round((rating.filter((item)=> item.rating == 2).length)*100/rating.length)}% </>: "0%"}</span>
                </div>
                <div style={{display:"flex", gap:"0.6rem", alignItems:"center", width:"100%",marginTop:"0.7rem"}} >
                    <span style={{width:"13%"}} >1 Star</span>
                    <div className="ratingBar" style={{width:"70%",height:"1.5rem",background:"#C0C0C0"}}>
                      <div style={{width:rating.length > 0 ? `${Math.round((rating.filter((item)=> item.rating == 1).length)*100/rating.length)}%` : "0%",height:"1.5rem", background:"#404040",}} ></div>
                      <div></div>
                    </div>
                    <span>{rating.length > 0 ? <>  {Math.round((rating.filter((item)=> item.rating == 1).length)*100/rating.length)}% </>: "0%"}</span>
                </div>






            </div>
            <div className="foodServ">



            </div>
            <div className="totalView">

              <span style={{marginLeft:"0.5rem",fontWeight:"500",fontSize:"1.5rem"}} >Total customer viewed</span>
              <span style={{marginLeft:"0.5rem",fontWeight:"600",fontSize:"1.9rem",marginTop:"1rem"}} >{views}</span>
              <img src={uptrend} style={{margin:"0.5rem 0.5rem"}} width={70} alt="" />
              

            </div>
        </div>


    <div className="chartVisit" style={{marginTop:"2rem"}}>
      <CustomerVisitChart period={period} setPeriod={setPeriod} data={data}/>
    </div>

        

    </div>
  );
}

export default DashboardMain;
