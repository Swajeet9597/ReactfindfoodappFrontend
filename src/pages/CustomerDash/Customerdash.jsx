import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper';
import { useNavigate } from 'react-router-dom';
import './Customerdash.css'
import logo from '../../assets/clogo.jpg'
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Messcard from '../../components/MessCard/Messcard';
import LoadingPage from '../../components/LoadPage/Loading';
import { DataContext } from '../../contextApi/context';
import Filter from '../../components/Filter/Filter';
import TemporaryDrawer from '../../components/Drawer/Drawer';
import Menucustomer from '../../components/MenuCustomer/Menucustomer';

const Customerdash = () => {

    const navigate = useNavigate()

    const [load,setLoad] = useState(true)
    const[search,setSearch] = useState("")

    // const [filter,setFilter] = useState(false)

    const {loc,setLoc,setMessDetaislArray,setMenuDetaislArray,setPriceDetaislArray,setTimeDetaislArray,setRatingArray,openMenu} = useContext(DataContext)

    const auth = async()=>{

        try {
            const response = await fetch(`${BASE_URL}/api/user/auth`,{
                method:"GET",
                credentials:"include"
              })
        
              const data = await response.json()

              
        
              if(!data.success || data.data.role != "customer"){
                // toast.error("User must login...")
                navigate('/login')  
              }

              const res2 = await fetch(`${BASE_URL}/api/user/getAllMess`,{
                method:"GET",
                credentials:"include"
              })

              const data2 = await res2.json()

              // console.log(data2);

            setMessDetaislArray(data2.messDetails)
            setMenuDetaislArray(data2.menuDetails)
            setPriceDetaislArray(data2.priceDetails)
            setTimeDetaislArray(data2.timeDetails)
            setRatingArray(data2.rating)  
            
        
              setLoad(false)
        } catch (error) {
            console.log(error);
        }
    }

    const [selectLocation, setSelectLocation] = useState("")

    function handleSetLoc(val){
      // setSelectLocation(val)
      setLoc(val)
    }

    console.log("loc loc",loc);

    useEffect(()=>{
        auth()
    },[])

  return (
    <div className='CustDash' style={{color:"black"}}>
      
    <nav  >
        <img  src={logo} alt="" width={50} />
        <TextField type='search' sx={{width:"45%", borderRadius:"10px"}} onChange={(e)=>setSearch(e.target.value)} id="filled-basic" label="Search" variant="filled"  />
        <div  className="filter" style={{ height:"70%",fontSize:"1.3rem", display:"flex", alignItems:"center", border:"1px solid black",borderRadius:"5px", padding:"0 80px 0 10px",gap:"0.4rem"}}>
        <FilterAltIcon/>
        <TemporaryDrawer/>
        </div>
        <select style={{cursor:'pointer',fontWeight:"500",borderRadius:"5px", height:"70%",padding:"0 60px 0 10px",fontSize:"1.3rem",background:"aliceblue",color:"#1976d2"}} value={loc} onChange={(e) => handleSetLoc(e.target.value)}>
        <option value="location">Location</option>
        <option value="Pune">Pune</option>
        <option value="Kolhapur">Kolhapur</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Karad">Karad</option>
      </select>
    </nav>

    <main>
        <Messcard search={search}/>
    </main>

    {load ? <LoadingPage/> : null}
    {openMenu ? <Menucustomer/> : null}
    </div>
  );
}

export default Customerdash;
