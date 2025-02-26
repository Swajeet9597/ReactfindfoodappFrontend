import React, { useContext } from 'react';
// import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import './PopupBox.css'
import { DataContext } from '../../contextApi/context';
import { BASE_URL } from '../../helper';

const PopupBox = () => {
    const{setPopup,urlDel,update,setUpdate,loader,setLoader,messArray,setMessArray} = useContext(DataContext)

    function handleCancel () {
        setPopup(false)
    }

    async function handleDelete(){
            setLoader(true)
            setPopup(false)
            console.log(urlDel);
            if(messArray == "array"){
                console.log("mess array")
                const response = await fetch(`${BASE_URL}/api/user/deleteImageMess`,{
                    method:"DELETE",
                    credentials:"include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({url:urlDel})
                  })
        
                  const data =await response.json()
        
                  console.log(data)

                  
          if(data.success){
            setUpdate(prev=>!prev)
          }

                return setLoader(false)
                
            }
            const response = await fetch(`${BASE_URL}/api/user/deleteImage`,{
            method:"DELETE",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({url:urlDel})
          })

          const data =await response.json()

          console.log(data)

          setLoader(false)

          if(data.success){
            setUpdate(prev=>!prev)
          }

    }

  return (
    <div className='poopupDiv'>
      <ClearIcon/>
      <span style={{fontSize:"2rem",marginTop:"1rem",zIndex:1}} >Are you sure</span>
      <span style={{fontSize:"1rem",marginTop:"1rem"}} >Do you really want to delete these  </span>
      <span>image?</span>
      <div className="delBtn">
      <Button onClick={handleCancel} variant="contained">Cancel</Button>
      <Button onClick={handleDelete} variant="contained">Delete</Button>
      </div>
    </div>
  );
}

export default PopupBox;
