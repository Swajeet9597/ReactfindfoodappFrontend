import React, { useContext, useState } from 'react';
import AccordionExpandDefault from '../Accordion/Accordion';
import { DataContext } from '../../contextApi/context';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper';
import AccordionExpand from '../Accordion/AccordionDash';


const Menudetails = ({Btnname}) => {
    const {messDetails,activeStep, setActiveStep,menuDetails,setLoader,setUpdate}= useContext(DataContext)

    const[next,setNext] = useState(false)

    console.log("next val",next);

    async function hanldeNext(e){
        e.preventDefault()

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
        try {
          
          // setLoader(true)

          const response = await fetch(`${BASE_URL}/api/user/saveMenuDetails`,{
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(menuDetails)
          })
  
          const data = await response.json()
  
          if(data.success){
            toast.success(data.msg)
          }
  
          setUpdate(prev=>!prev)
          // setLoader(false)


        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className="messdetailsform">
      {
      Btnname ? 
      <>

      <h2 style={{margin:"auto",textAlign:"center", marginTop:"2rem",marginBottom:"2rem"}} >Morning menu</h2>
      <AccordionExpand Btnname="Changes" time="morning" setNext={setNext} />
      <h2 style={{margin:"auto",textAlign:"center", marginTop:"2rem",marginBottom:"2rem"}} >Evening menu</h2>
      <AccordionExpand Btnname="Changes" time="evening" setNext={setNext}/>
      <div className="nextandprev" style={{width:"94%", display:"flex",justifyContent:"flex-end", gap:"2rem" }}>
      <Button onClick={handleSave} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem",marginLeft:"3rem"}} variant="contained">{Btnname}</Button>
      </div> 

      </>
      
      :
      <>

      <h2 style={{margin:"auto",textAlign:"center", marginTop:"2rem",marginBottom:"2rem"}} >Morning menu</h2>
      <AccordionExpandDefault Btnname="Changes" time="morning" setNext={setNext} />
      <h2 style={{margin:"auto",textAlign:"center", marginTop:"2rem",marginBottom:"2rem"}} >Evening menu</h2>
      <AccordionExpandDefault Btnname="Changes" time="evening" setNext={setNext}/>
      <div className="nextandprev" style={{width:"94%", display:"flex",justifyContent:"flex-end", gap:"2rem" }}>
      <Button onClick={hanldePrev} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem",marginLeft:"3rem"}} variant="contained">Previous</Button>
      <Button onClick={hanldeNext} style={{width:"15%",marginBottom:"2rem",marginTop:"3rem"}} variant="contained">Next</Button>
      </div> 

      </>
      
      }
       
      
    </div>
  );
}

export default Menudetails;
