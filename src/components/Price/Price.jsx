import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../contextApi/context';
import { BASE_URL } from '../../helper';
import Pricedetails from '../Pricedetails/Pricedetails';

const Price = () => {

    const{priceDetails, setPriceDetails,messDetails,setMessDetails} = useContext(DataContext)

    const getData = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/api/user/priceDetailsData`,{
                method:"GET",
                credentials:"include"
            })

            const data = await response.json()

            if(data.success){
                // console.log(data.data);
                const {__v,_id,...priceObj} = data.data
                setPriceDetails(priceObj)
            }
            
            const response1 = await fetch(`${BASE_URL}/api/user/messDetailsData`,{
                method:"GET",
                credentials:"include"
            })

            const data1 = await response1.json()

            if(data1.success){
                // console.log(data1.data);
                const {__v,_id,...messObj} = data1.data
                setMessDetails(messObj)
            }
            

        } catch (error) {
            console.log(error);
        }
    }

    console.log("messdetails context",priceDetails);

    useEffect(()=>{
        getData()
    },[])

  return (
    <div>
      <Pricedetails Btnname="Save"/>
    </div>
  );
}

export default Price;
