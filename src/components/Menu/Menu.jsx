import React, { useContext, useEffect } from 'react';
import { BASE_URL } from '../../helper';
import { DataContext } from '../../contextApi/context';
import Menudetails from '../Menudetails/Menudetails';

const Menu = () => {
    const {menuDetails, setMenuDetails,update,setLoader} = useContext(DataContext)

    const getData = async()=>{
        try {
            setLoader(true)
            console.log("fun called");
            const response = await fetch(`${BASE_URL}/api/user/menuDetailsData`,{
                method:"GET",
                credentials:"include"
            })

            const data = await response.json()

            console.log("response responsejson",data);

            if(data.success){
                console.log("response menu",data.data);
                const {__v,_id,...menuObj} = data.data
                setMenuDetails(menuObj)
            }
            
            setLoader(false)
        } catch (error) {
            console.log(error);
        }
    }

    console.log("menudetails context",menuDetails);

    useEffect(()=>{

        getData()
    },[update])
  return (
    <div className='menuOp' style={{ height: "100%",
        width: "100%",
        overflowY: "scroll",
        overflowX: "hidden"}} >

      <Menudetails Btnname="Save" />
    </div>
  );
}

export default Menu;
