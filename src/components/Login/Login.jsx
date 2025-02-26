import React, { useEffect, useState } from 'react';
import './Login.css'
import google from '../../assets/google.png'
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper';


const   Login = ({setLoad}) => {


    const[verify,setVerify] = useState(false)

    const[userInput, setUserInput] = useState({
        userId:"",
        password:""
    })

    function onChangeCaptcha(value) {
        setVerify(true)
        console.log("Captcha value:", value);
      }
    const navigate = useNavigate()

    async function handleSubmit(e){
        
        e.preventDefault();
        setLoad(true)

        console.log(verify);

        

        if(userInput.email == "" || userInput.password == ""){
            setLoad(false)
            return toast.error("Please enter credentials")
        }

        const response = await fetch(`${BASE_URL}/api/user/login`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userInput)

        })

        const data = await response.json()
        console.log(data);
        if(data.success){
            navigate(`/${data.role}`)
            toast.success(data.msg)
            console.log(data.data);
        }else{
            toast.error(data.msg)
        }

        setLoad(false)
    }

    function handleChange(e){
        let val = e.target.value
        let name = e.target.name

        setUserInput({
            ...userInput,
            [name]:val
        })

    }

  return (
    <div className='LoginBox' >
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className='loginform' >
            <div className="input">
            <label htmlFor="userId">Email/Mobile number </label>
            <input onChange={handleChange} type="text" name="userId" id='userId' required/>
            </div>
            <div className="input">
            <label htmlFor="pass">Password :</label>
            <input onChange={handleChange} type="text" name="password" id='pass'  required />
            </div>
  
            <button type='submit' >Login</button>
        </form>

        <div className="acc">
            <span>Don't have an account ?</span>
            <Link to={"/"} className='reg' >Register</Link>
        </div>

        <div className="Hline"></div>

        <div className="googleSign">
            <img src={google} />
            <span>Continue With Google</span>
        </div>

    </div>
  );
}

export default Login;
