import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css'
import VerticalLinearStepper from '../../components/Stepper/stepper';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helper';
import { toast } from 'react-toastify';
import LoadingPage from '../../components/LoadPage/Loading';
import MessOwnerSideBar from '../../components/MessOwnerSideBar/MessOwnerSideBar';
import DashboardMain from '../../components/DashboardMain/DashboardMain';
import Profile from '../../components/Profile/Profile';
import Details from '../../components/Details/Details';
import Menu from '../../components/Menu/Menu';
import Price from '../../components/Price/Price';
import Time from '../../components/Time/Time';
import { DataContext } from '../../contextApi/context';
import SimpleBackdrop from '../../components/Loader/Loader';
import PopupBox from '../../components/PopupBox/PopupBox';

const Dashboard = () => {

  const navigate = useNavigate()

  const [rating,setRating] = useState([])

  const [data, setData] = useState([]);

  const [views,setViews]= useState(0)

  const [period,setPeriod] = useState("daily")

  const{loader,setLoader,popup,setPopup}= useContext(DataContext)

  const [path,setPath] = useState("")

  const auth = async()=>{
    try {     
      setLoader(true) 
      const response = await fetch(`${BASE_URL}/api/user/auth`,{
        method:"GET",
        credentials:"include"
      })

      const data = await response.json()

      console.log("auth data",data);

      if(!data.success){

        toast.error("User must login...")
        navigate('/login')
      }

      

      setLoader(false) 

    } catch (error) {
      console.log(error);
    }
  }

  const getRatings = async()=>{
    try {


      setLoader(true) 

      const response = await fetch(`${BASE_URL}/api/user/getRatingData`,{
        method:"GET",
        credentials:"include"
      })

      const data = await response.json()

      console.log(data.data);

      setRating(data.data)

      const res1 = await fetch (`${BASE_URL}/api/user/getViews`,{
        method:"GET",
        credentials:"include",
      })



      const data1 = await res1.json()

      setViews(data1.data)
      
      setLoader(false) 
      
    } catch (error) {
      console.log(error);
    }
  }

  const getChartData = async()=>{
    try {
      const res2 = await fetch(`${BASE_URL}/api/user/views`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({period:period})
      })
  
      const data2 = await res2.json()
  
      // console.log("viesa anlysis",data2);
  
      setData(data2)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getChartData()
  },[period])


  useEffect(()=>{

    auth()
    if (window.location.hash) {
      navigate("/not-found"); // Redirect to a different page or show an error
    }
    getRatings()
  },[])

  useEffect(() => {
    console.log("dashboard page",window.location.pathname);
  }, [window.location.pathname]);
  return (
    <div className='Dashpage' >
      <div className="sideBar">
        <MessOwnerSideBar/>
      </div>

      <div className="main">
        {
        window.location.pathname == "/dashboard"
        ?  <DashboardMain period={period} setPeriod={setPeriod} data={data} rating={rating} views={views}/>
        :  window.location.pathname == "/dashboard/feedback"
        ?   <Profile rating={rating}/> 
        :  window.location.pathname == "/dashboard/details"
        ? <Details/> 
        : window.location.pathname == "/dashboard/menu"
        ? <Menu/> 
        : window.location.pathname == "/dashboard/price"
        ? <Price/> 
        :  window.location.pathname == "/dashboard/time"
        ? <Time/> 
        : window.location.pathname == "/dashboard/"
        ?  <DashboardMain/>
        :  window.location.pathname == "/dashboard/profile/"
        ?   <Profile/> 
        :  window.location.pathname == "/dashboard/details/"
        ? <Details/> 
        : window.location.pathname == "/dashboard/menu/"
        ? <Menu/> 
        : window.location.pathname == "/dashboard/price/"
        ? <Price/> 
        :  window.location.pathname == "/dashboard/time/"
        ? <Time/> 
        : null
        }
      </div>
      {loader ?   <div className="loader">
<SimpleBackdrop/>
</div> :<></>}
{popup ? <div style={{width:"100%", height:"100%", position:"absolute", top:"0", background:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center",alignItems:"center"}}>

<PopupBox/>
</div> : <></>}

    </div>
  );
}

export default Dashboard;
