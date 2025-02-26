import React, { useContext, useEffect, useState } from 'react';
import VerticalLinearStepper from '../../components/Stepper/stepper';
import './Messform.css'
import logo from '../../assets/clogo.png'
import { DataContext } from '../../contextApi/context';
import Messdetails from '../../components/Messdetails/Messdetails';
import SimpleBackdrop from '../../components/Loader/Loader';
import Menudetails from '../../components/Menudetails/Menudetails';
import Pricedetails from '../../components/Pricedetails/Pricedetails';
import Timedetails from '../../components/Timedetails/Timedetails';
import Welcome from '../Welcome/Welcome';
import { BASE_URL } from '../../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingPage from '../../components/LoadPage/Loading';
const Messform = () => {

  const {activeStep,setActiveStep,timeDetails,priceDetails,menuDetails,messDetails,loader,setMessDetails,setMenuDetails,setPriceDetails,setTimeDetails,userId, setUserId} = useContext(DataContext)
  const[isWelcome,setIsWelcome] = useState(false)
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate()
  const forms = [
    <Messdetails/>,
    <Menudetails/>,
    <Pricedetails/>,
    <Timedetails setIsWelcome={setIsWelcome}/>
  ];
  console.log("rerender");

  const auth = async()=>{
    try {

      const checkAccess =await fetch(`${BASE_URL}/api/user/messFormRendering`,{
        method:"GET",
        credentials:"include"

      })

      const access = await checkAccess.json()

      if(!access.success){
        return navigate('/dashboard')
      }

      

      console.log(access);
      
      const response = await fetch(`${BASE_URL}/api/user/auth`,{
        method:"GET",
        credentials:"include"
      })

      const data = await response.json()

      if(data.data){
    

        setTimeDetails((prev)=>({...prev,userId: data.data.id }))
        setPriceDetails((prev)=>({...prev,userId: data.data.id }))
        setMenuDetails((prev)=>({...prev,userId: data.data.id }))
        setMessDetails((prev)=>({...prev,userId: data.data.id }))
        
      }

      if(!data.success){
        toast.error("User must login...")
        navigate('/login')
      }


      setLoading(false)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    auth()
  },[])
  return (
    <>
    
    {isWelcome ? <Welcome/> :  <div className='Messformpg' >

    

<div className="logo">
    <img src={logo} width={70} alt="" />
</div>

<div className="conMesspg">

<div className='verticalStepperbar' >
<VerticalLinearStepper/>
</div>

<div className="messformdiv">
{forms[activeStep]}
</div> 

</div>
{loader ?   <div className="loader">
<SimpleBackdrop/>
</div> :<></>}

{loading ? <LoadingPage/> : <></>}

</div>}
   

      </>
  );
}

export default Messform;
