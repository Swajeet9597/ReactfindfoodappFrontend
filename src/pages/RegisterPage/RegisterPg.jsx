import React from 'react';
import "./RegisterPg.css"
import Register from '../../components/Register/Register';
const RegisterPg = () => {
  const [load,setLoad] = useState(false)
  return (
    <div className="loginPage">
        <Register setLoad={setLoad}/>
        {load ? <LoadingPage/> : <></>}
    </div>
  );
}

export default RegisterPg;
