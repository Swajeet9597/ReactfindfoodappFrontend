import React, { useEffect, useState } from 'react';
import "./LoginPg.css"
import Login from '../../components/Login/Login';
import LoadingPage from '../../components/LoadPage/Loading';
const LoginPg = () => {
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
    <div className="loginPage">
      {screeSize.width < 850 ? <div style={{color:"white",fontSize:"2rem", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"nowrap",textAlign:"center"}}> This website is designed to work best on PCs and laptops for an enhanced experience. </div> :
          <>
              <Login setLoad={setLoad}/>
              {load ? <LoadingPage/> : <></>}
          </>
      }
    </div>
  );
}

export default LoginPg;
