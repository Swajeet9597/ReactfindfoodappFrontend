import React, { useState } from 'react';
import google from '../../assets/google.png'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { BASE_URL } from '../../helper';
import './Register.css'
import ReCAPTCHA from "react-google-recaptcha";

const Register = ({setLoad}) => {

    const navigate = useNavigate()

    const[userRole,setUserRole]= useState("")
 
    const[userInfo, setUserInfo] = useState({
      userId:"",
      password:"",
      cpassword:"",
      role:""
    })

    
     const handleSubmit = async(e)=>{
      e.preventDefault();
      setLoad(true)
      console.log(userInfo);

      if(userInfo.password != userInfo.cpassword){
        setLoad(false)
       return toast.error("Password is not matched")
      }
      if(userInfo.password == "" || userInfo.email == "" || userInfo.role==""){
        setLoad(false)
        return toast.error("Please fill all fields")
      }
    
      const response = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json()

      if(result.success){
        navigate("/login")
        setLoad(false)
       return toast.success(result.msg)
      }else{
        setLoad(false)
        return toast.error(result.msg)
      }
    }

    function handleChange(e){
      console.log(e.target.name);
      let val = e.target.value
      let name = e.target.name

      setUserInfo({
        ...userInfo,
        [name]:val
      })

      
    }

    const handleRadioBtn = (e)=>{
        try {
            
            setUserRole(e.target.value)
            // console.log(userRole);
            setUserInfo({
                ...userInfo,
                role:e.target.value
            })

        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='LoginBox' >
    <h1>Register</h1>
    <form onSubmit={handleSubmit} className='loginform' >
        <div className="input">
        <label htmlFor="userId">Email/Mobile number</label>
        <input onChange={handleChange} type="text" name="userId" id='userId' required />
        </div>
        <div className="input">
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="text" name="password" id='password' required />
        </div>
        <div className="input">
        <label htmlFor="cpassword">Confirm Password</label>
        <input onChange={handleChange} type="text" name="cpassword" id='cpassword'  required />
        </div>

        <div className="radio">
        <label className='radioL'  htmlFor="admin"> <input type="radio" checked={userRole=="admin"} value="admin" id='admin'  onChange={handleRadioBtn}/>Admin</label>
        <label className='radioL'  htmlFor="Mess"><input type="radio" checked={userRole=="messOwner"} value="messOwner" onChange={handleRadioBtn} id='Mess' />Mess owner </label>
        <label className='radioL'  htmlFor="Customer"> <input type="radio" checked={userRole=="customer"} value="customer" onChange={handleRadioBtn} id='Customer' />Customer</label>
        </div>


        <button type='submit' >Register</button>
    </form>
    <div className="googleSign">
        <img src={google} />
        <span>Continue With Google</span>
    </div>
    <div className="Hline"></div>

    <div className="acc">
        <span>Already have an account?</span>
        <Link to={"/login"} className='reg' >Login</Link>
    </div>



</div>
  );
}

export default Register;
