import React, { useContext, useState } from "react";
import "./Messdetails.css";
import TextField from "@mui/material/TextField";
import Inputbox from "../InputBox/Inputbox";
import Largeinputbox from "../Largeinputbox/Largeinputbox";
import RowRadioButtonsGroup from "../RadioBtn/RadioBtn";
import InputFileUpload from "../UploadBtn/UploadBtn";
import Button from '@mui/material/Button';
import { DataContext } from "../../contextApi/context";
import {toast} from 'react-toastify'
import { BASE_URL } from "../../helper";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Messdetails = ({btnName}) => {

    const {activeStep,setActiveStep,messDetails,loader,setLoader,popup,setPopup,urlDel,setUrlDl,update,setUpdate,setMessArray} = useContext(DataContext)
  

    const hanldeNext =async(e) =>{
        e.preventDefault()
          if (!messDetails.messName.trim() || !messDetails.foodType.trim()){
              
              return toast.error("Please fill all fields")
        } 

          if (Object.values(messDetails.address).some(value => !value.trim())) return toast.error("Please fill all fields")

          // Check if any contact field is empty
          if (Object.values(messDetails.contact).some(value => !value.trim())) return toast.error("Please fill all fields")

          // Check if license number or license image is empty
          if (!messDetails.license.licenseNumber.trim() || !messDetails.license.licenseImage.trim()) return toast.error("Please fill all fields")

          // Ensure at least one mess image is present
          if (messDetails.messImages.length === 0) return toast.error("Please fill all fields")
                if(activeStep < 3){
                    setActiveStep((prev)=>prev+1)
                }
                console.log("messdetails",messDetails);

    }

    async function handleSave(){
      try {

        setLoader(true)

        const response = await fetch(`${BASE_URL}/api/user/saveMessDetails`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(messDetails)
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

    async function handleUpdate(e,arr){
        console.log(e,arr);
        try {
          setMessArray(arr)
          setUrlDl(e)
          setPopup(true)

        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className="messdetailsform">

      <Largeinputbox lable="Mess Name" type="text" width="80%" name="messName" />

      <br />

      <span
        style={{ fontSize: "0.9rem", marginLeft: "3rem", marginTop: "2rem" }}
      >
        Customer will see this name on beetljet web
      </span>

      <div className="addForm">

        <span
          style={{ fontFamily: "roboto", fontSize: "2rem", fontWeight: "500" }}
        >
          Address
        </span>

        <div className="add1">

      <Inputbox lable="Shop number / Building number" type="number" width="48%" name="shopNumber" section="address" />
      <Inputbox lable="Area/ Locality" type="text" width="48%" name="area" section="address" />
       
        </div>


        <div className="add1" style={{marginTop:"1.7rem"}}>

      <Inputbox lable="City " type="text" width="48%" name="city" section="address" />
      <Inputbox lable="Pincode" type="number" width="48%" name="pincode" section="address" />
       
        </div>

        
        <div className="add1" style={{marginTop:"1.7rem"}}>

      <Inputbox lable="Add nearby landmark " type="text" width="100%" name="landmark" section="address" />

       
        </div>


      </div>

      <div className="addForm">

<span
  style={{ fontFamily: "roboto", fontSize: "2rem", fontWeight: "500" }}
>
  Contact
</span>

<div className="add1" >

<Inputbox lable="Mobile number " type="number" width="48%" name="mobileNumber" section="contact" />
<Inputbox lable="Email id" type="text" width="48%" name="email" section="contact"/>
 
  </div>

</div>


<div className="addForm">

<span
  style={{ fontFamily: "roboto", fontSize: "2rem", fontWeight: "500" }}
>
Licence
</span>

<div className="add1" >

<Inputbox lable="Food license number" type="text" width="48%" name="licenseNumber" section="license" />
{/* <Inputbox lable="Food license Photo" type="text" width="48%" /> */}
<InputFileUpload width="48%" label="Food license Photo" section="license"/>

 
  </div>

  <div className="add1" style={{justifyContent:"flex-end"}} >
{messDetails.license.licenseImage ? <div style={{background:"#a9d7f5", padding:"10px", position:"relative"}}>

  {btnName ? <span onClick={()=>handleUpdate(messDetails.license.licenseImage)} style={{position:"absolute", top:"0", right:"0"}} ><DeleteForeverIcon color="error"/></span>: null }
<img src={messDetails.license.licenseImage} width={100} height={90} alt={messDetails.license.licenseImage.split("/upload/")[1]} />
</div>:<></>}
  </div>


</div>

<div className="addForm" style={{marginTop:"1rem"}} >

<div className="add1" style={{marginTop:"1rem"}}>

      <RowRadioButtonsGroup/>
 
  </div>



</div>


<div className="addForm" >

<span
  style={{ fontFamily: "roboto", fontSize: "2rem", fontWeight: "500" }}
>
Add your mess images
</span>

<div className="add1"  >

<InputFileUpload width="100%" label="upload mess images"/>

  </div>

  <div className="add1" style={{justifyContent:"flex-start",gap:"1rem",flexWrap:"wrap"}} >
  {messDetails.messImages.length > 0 ? <> {messDetails.messImages.map((img,index)=>(
    <div key={index} style={{background:"#a9d7f5", padding:"10px", position:"relative"}}>
       {btnName ? <span onClick={()=>handleUpdate(img,"array")} style={{position:"absolute", top:"0", right:"0"}} ><DeleteForeverIcon color="error"/></span> : <></> }
        <img src={img}  width={100} height={90} alt={img.split("/upload/")[1]} />
    </div>
))}</>:<></>}
  </div>

</div>

{btnName ? <>
  <div className="btnNext">
<Button onClick={handleSave} style={{width:"15%",marginBottom:"2rem"}} variant="contained">{btnName}</Button>
</div>
</>:<div className="btnNext">
<Button onClick={hanldeNext} style={{width:"15%",marginBottom:"2rem"}} variant="contained">Next</Button>
</div>}


 


    </div>
  );
};

export default Messdetails;
