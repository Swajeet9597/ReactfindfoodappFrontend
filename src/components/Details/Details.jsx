import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../../helper';
import { DataContext } from '../../contextApi/context';
import Messdetails from '../Messdetails/Messdetails';
import './Details.css'

const Details = () => {

    const {messDetails,setMessDetails,loader,setLoader,update,setUpdate} = useContext(DataContext)


    const getData = async()=>{
        try {
            setLoader(true)
            const response = await fetch(`${BASE_URL}/api/user/messDetailsData`,{
                method:"GET",
                credentials:"include"
            })

            const data = await response.json()

            if(data.success){
                console.log(data.data);
                const {__v,_id,...messObj} = data.data
                setMessDetails(messObj)
            }

            setLoader(false)
            

        } catch (error) {
            console.log(error);
        }
    }

    console.log("messdetails context",messDetails);

    useEffect(()=>{
        getData()
    },[update])

  return (
    <div className='detailss' >
      <Messdetails btnName="Save" />
    </div>
  );
}

export default Details;
