import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../contextApi/context';
import { BASE_URL } from '../../helper';
import Timedetails from '../Timedetails/Timedetails';

const Time = () => {
    const{timeDetails, setTimeDetails}= useContext(DataContext)
    const getData = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/api/user/timeDetailsData`,{
                method:"GET",
                credentials:"include"
            })

            const data = await response.json()

            if(data.success){
                console.log(data.data);
                const {__v,_id,...timeObj} = data.data
                setTimeDetails(timeObj)
            }
            

        } catch (error) {
            console.log(error);
        }
    }

    console.log("timedetails context",timeDetails);

    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
      <Timedetails Btnname="Save" />
    </div>
  );
}

export default Time;
