import React, { useEffect, useState } from 'react';
import './MessOwnerSideBar.css'
import logo from '../../assets/clogo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helper';
import { toast } from 'react-toastify';

const MessOwnerSideBar = () => {

    const [path,setPath] = useState("")

    const navigate = useNavigate()

    async function handleClick (e){

            if(e.target.id == "logout"){
                const response = await fetch(`${BASE_URL}/api/user/logout`,{
                    method:"POST",
                    credentials:"include"
                })
                const data = await response.json()
                navigate("/login")
                return toast.success(data.msg)
            }

            if(!e.target.id){
                return console.log("okk");
            }
            if(e.target.id == "dashboard"){
                console.log("inside",e.target.id);
                navigate("/dashboard")
                return  setPath(window.location.pathname)
            }

            navigate(`/dashboard/${e.target.id}`)
            setPath(window.location.pathname)

    }


    useEffect(()=>{
        setPath(window.location.pathname)
    },[])
  return (
    <div className='sidebarCompo' >
        <div className="sideLogo">
            <img src={logo} width={100} alt="" />
            <div className="lineHori"></div>
        </div>
        <div onClick={handleClick} className="options">
            <div id='dashboard' style={{background: path == "/dashboard" ? "#a9d7f5" : path == "/dashboard/" ? "#a9d7f5" : "aliceblue"}} ><DashboardIcon/>Dashboard</div>
            <div id='feedback' style={{background: path == "/dashboard/feedback" ? "#a9d7f5" : ""}}><AccountCircleIcon/>Profile</div>
            <div id='details' style={{background: path == "/dashboard/details" ? "#a9d7f5" : ""}}><InfoIcon/>Details</div>
            <div id='menu' style={{background: path == "/dashboard/menu" ? "#a9d7f5" : ""}}><RestaurantMenuIcon/>Menu</div>
            <div id='price' style={{background: path == "/dashboard/price" ? "#a9d7f5" : ""}}><CurrencyRupeeIcon/>Price</div>
            <div id='time' style={{background: path == "/dashboard/time" ? "#a9d7f5" : ""}}><AccessTimeIcon/>Time</div>
            <div id='logout' style={{background: path == "/dashboard/logout" ? "#a9d7f5" : ""}}><LogoutIcon/>Log out</div>
        </div>
        <div className="empty">

        </div>
    </div>
  );
}

export default MessOwnerSideBar;
