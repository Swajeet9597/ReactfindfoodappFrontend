import React, { useContext, useEffect, useState } from 'react';
import Inputbox from '../InputBox/Inputbox';
import { Select } from '@mui/material';
import Button from '@mui/material/Button';
import BasicSelect from '../Select/Select';
import RadioButtonsGroup from '../../VerticaleRadioBtn/VerticleRadioBtn';
import { DataContext } from '../../contextApi/context';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Welcome from '../../pages/Welcome/Welcome';
import { BASE_URL } from '../../helper';

const Timedetails = ({setIsWelcome,Btnname}) => {
  const navigate = useNavigate()

  const {activeStep, setActiveStep,timeDetails,priceDetails,menuDetails,messDetails,setLoader,setUpdate}= useContext(DataContext)
  
    async function hanldeNext(e){
      e.preventDefault()

      const isValid = (obj) => {
        return Object.values(obj).every(value => 
            typeof value === "object" ? isValid(value) : value !== ""
        );
    }

    if(!isValid(timeDetails)){
      return toast.error("Plz fill all fields")
    }

       const response = await fetch(`${BASE_URL}/api/user/messData`,{
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({timeDetails,messDetails,menuDetails,priceDetails})
          })        

          const data = await response.json()

          console.log(data);
    
        toast.success("Form save successfully");

        setIsWelcome(true)
        setTimeout(()=>{
          navigate('/dashboard')
        },5000)



    }

    function hanldePrev(){

        if(activeStep > 0){
            setActiveStep((prev)=>prev-1)
        }
    }

    
    async function handleSave(){

      // 
      try {

        setLoader(true)

        const response = await fetch(`${BASE_URL}/api/user/saveTimeDetails`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(timeDetails)
        })

        const data = await response.json()

        if(data.success){
          console.log();
          toast.success(data.msg)
        }

        setUpdate(prev=>!prev)
        setLoader(false)
        
      } catch (error) {
        console.log(error);
      }

    }
  return (
  <div className='messdetailsform'>
    <div className="addForm" style={{width:"80%"}}>

<span
style={{ fontFamily: "roboto", fontSize: "2rem", fontWeight: "500" }}
>
Time
</span>

<span style={{ fontSize: "1.6rem", marginTop: "2rem", marginLeft: "0.5rem", marginBottom: "1rem" }} >Morning time</span>
<div style={{ display: "flex", width: "90%", justifyContent: "space-around" }} >
<div className="wrap" style={{ display: "flex", flexDirection: "column", width: "40%", gap: "0.5rem" }} >
  <span>From</span>
  <Inputbox lable="" type="time" width="100%" name="from" section="morning" />
</div>
<div className="wrap" style={{ display: "flex", flexDirection: "column", width: "40%", gap: "0.5rem" }} >
  <span>To</span>
  <Inputbox lable="" type="time" width="100%" name="to" section="morning" />
</div>
</div>

<span style={{ fontSize: "1.6rem", marginTop: "2rem", marginLeft: "0.5rem", marginBottom: "1rem" }} >Evening time</span>
<div style={{ display: "flex", width: "90%", justifyContent: "space-around" }} >
<div className="wrap" style={{ display: "flex", flexDirection: "column", width: "40%", gap: "0.5rem" }} >
  <span>From</span>
  <Inputbox lable="" type="time" width="100%" name="from" section="evening" />
</div>
<div className="wrap" style={{ display: "flex", flexDirection: "column", width: "40%", gap: "0.5rem" }} >
  <span>To</span>
  <Inputbox lable="" type="time" width="100%" name="to" section="evening" />
</div>
</div>

<span style={{ fontSize: "1.6rem", marginTop: "2rem", marginLeft: "0.5rem", marginBottom: "1rem" }} >Holiday</span>

<div style={{ display: "flex", flexDirection:"column", width: "70%", justifyContent: "flex-start", marginLeft: "2.3rem" }} >

<BasicSelect />

<RadioButtonsGroup/>

</div>

</div>

{Btnname ? <div className="nextandprev" style={{width:"94%", display:"flex",justifyContent:"flex-end", gap:"2rem" }}>
<Button onClick={handleSave} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem",marginLeft:"3rem"}} variant="contained">{Btnname}</Button>
</div> : <div className="nextandprev" style={{width:"94%", display:"flex",justifyContent:"flex-end", gap:"2rem" }}>
<Button onClick={hanldePrev} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem",marginLeft:"3rem"}} variant="contained">Previous</Button>
<Button onClick={hanldeNext} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem"}} variant="contained">Done</Button>
</div> }

  

  </div>
    
  );
}

export default Timedetails;
