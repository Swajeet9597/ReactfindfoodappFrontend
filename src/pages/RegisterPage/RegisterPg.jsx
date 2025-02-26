import React, { useState } from 'react';
import "./RegisterPg.css"
import Register from '../../components/Register/Register';
import LoadingPage from '../../components/LoadPage/Loading';
const RegisterPg = () => {
  const [load,setLoad] = useState(false)
  return (
    <div className="Regpage">
        <Register setLoad={setLoad}/>
        {load ? <LoadingPage/> : <></>}
    </div>
  );
}

export default RegisterPg;
