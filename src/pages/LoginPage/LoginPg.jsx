import React, { useState } from 'react';
import "./LoginPg.css"
import Login from '../../components/Login/Login';
import LoadingPage from '../../components/LoadPage/Loading';
const LoginPg = () => {
  const [load,setLoad] = useState(false)
  return (
    <div className="loginPage">
        <Login setLoad={setLoad}/>
        {load ? <LoadingPage/> : <></>}
    </div>
  );
}

export default LoginPg;
