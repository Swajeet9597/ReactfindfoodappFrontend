import React, { useEffect, useState } from 'react';
import "./RegisterPg.css"
import Register from '../../components/Register/Register';
import LoadingPage from '../../components/LoadPage/Loading';
const RegisterPg = () => {
  const [load,setLoad] = useState(false)

  const getScreen = () =>{ 
    return{
      width:window.innerWidth,
    };
  };

  const [screeSize, setScreenSize] = useState(getScreen());

  useEffect(()=>{
    const Screen = () =>{
        setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);

  },[]);

  return (
    <div className="Regpage">
       <div className="loginPage">
      {screeSize.width < 850 ? <div style={{color:"white",fontSize:"2rem", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"nowrap",textAlign:"center"}}> This website is designed to work best on PCs and laptops for an enhanced experience. </div> :
           <>
              <Register setLoad={setLoad}/>
              {load ? <LoadingPage/> : <></>}
           </>  
      }
    </div>
  );
}

export default RegisterPg;
