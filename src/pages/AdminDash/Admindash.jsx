import React, { useEffect } from 'react';
import { BASE_URL } from '../../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admindash = () => {
    const navigate = useNavigate()

    const auth = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/api/user/auth`,{
                method:"GET",
                credentials:"include"
              })
        
              const data = await response.json()
    
        
              if(!data.success){
                toast.error("User must login...")
                navigate('/login')  
              }
        
        
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        auth()
    },[])
  return (
    <div style={{color:"black"}} >
      Admin dash
    </div>
  );
}

export default Admindash;
