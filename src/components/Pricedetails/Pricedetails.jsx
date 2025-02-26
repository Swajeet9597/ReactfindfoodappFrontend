import React, { useContext } from 'react';
import Inputbox from '../InputBox/Inputbox';
import { DataContext } from '../../contextApi/context';
import Button from '@mui/material/Button';
import Largeinputbox from '../Largeinputbox/Largeinputbox';
import {toast} from 'react-toastify'
import { BASE_URL } from '../../helper';
const Pricedetails = ({Btnname}) => {
    const {messDetails,activeStep, setActiveStep,priceDetails,setLoader,setUpdate}= useContext(DataContext)
    async function hanldeNext(e){
      e.preventDefault()
      if(messDetails.foodType !== "veg"){
        const isPriceDetailsValid = Object.values(priceDetails).every(value => value !== "");
        // console.log(isPriceDetailsValid);
          if(!isPriceDetailsValid){
            return toast.error("Please fill all fields")
          }
      }
     
      if(priceDetails.monthlyCharges == "" || priceDetails.specialDayVegCharges == "" || priceDetails.singleDayCharges == "" ){
          return toast.error("Please fill all fields")
      }

        if(activeStep < 3){
            setActiveStep((prev)=>prev+1)
        }
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

        const response = await fetch(`${BASE_URL}/api/user/savePriceDetails`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(priceDetails)
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

    console.log("check type",priceDetails);

    

  return (
    <div className='messdetailsform' style={{position:"relative"}} >
        

        <div className="addForm" style={{width:"80%"}}>

        <span
        style={{ fontFamily: "roboto", fontSize: "2rem", fontWeight: "500" }}
        >
        Price
        </span>

        <div className="add1" style={{flexDirection:"column"}} >
        <Largeinputbox lable="Monthly membership charges" type="number" width="80%" name="monthlyCharges"/>
        <Largeinputbox lable="Single time meal charges" type="number" width="80%" name="singleDayCharges"/>
        <Largeinputbox lable="Special day veg charges" type="number" width="80%" name="specialDayVegCharges"/>
        {messDetails.foodType == "veg" ? <></>:   <Largeinputbox lable="Special day non-veg charges" type="number" width="80%" name="specialDaynonVegCharges"/>}
      
        
        </div>

        </div>

        {Btnname ?  <div className="nextandprev" style={{width:"94%", display:"flex",justifyContent:"flex-end", position:"absolute", bottom:"-120%", gap:"2rem" }}>
      <Button onClick={handleSave} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem",marginLeft:"3rem"}} variant="contained">{Btnname}</Button>
      </div> : <div className="nextandprev" style={{width:"94%", display:"flex",justifyContent:"flex-end", gap:"2rem" }}>
      <Button onClick={hanldePrev} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem",marginLeft:"3rem"}} variant="contained">Previous</Button>
      <Button onClick={hanldeNext} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem"}} variant="contained">Next</Button>
      </div>}
        


    </div>
  );
}

export default Pricedetails;
