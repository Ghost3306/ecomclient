import axios from 'axios';
import React, { useState } from 'react';
import ErrorMsg from '../Errors/ErrorMsg';
import { useNavigate } from "react-router-dom";
import { SHA256 } from 'crypto-js';
import { useEffect } from 'react';
const ForgotPass = () => {
    const [email,setEmail] = useState('');
    const [otp,setOTP] = useState('');
    const [newPass,setNewPass] = useState('');
    const [conPass,setConPass] = useState('');

    const [apikey,setApiKey] = useState('');
    const [serverotp,setServerOtp] = useState('');
    
    const [msgstate,setmsgState] = useState(null);
    const [msg,setMsg] = useState('')

    const [otpstate,setOTPState] = useState(false);
    const [passstatus,setPassStatus] = useState(false);
    const [passcheck, setPassCheck] = useState({
        'one':'red',
        'two':'red',
        'three':'red',
        'four':'red'
    })

    useEffect(()=>{
        document.title = 'Forgot Password';
    },[])

    const [divState,setDivState] = useState({
        'email':true,
        'otp':false,
        'newpass':false
    })

    const navigate = useNavigate();
    function hasUppercase(str) {
        for (let i = 0; i < str.length; i++) {
          if (/[A-Z]/.test(str[i])) {
            return true; 
          }
        }
        return false; 
      }

    function containsNumber(str) {
        return /\d/.test(str);
    }

    function containsSpecialCharacter(str) {
        
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
      
        return specialCharacterRegex.test(str);
      }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };
  const handleNewPassChange = (e) => {
    
    setNewPass(e.target.value);

    if(passcheck.one==='green' && passcheck.two==='green' && passcheck.three==='green' && passcheck.four ==='green'){
        setPassStatus(true);
    }else{
        setPassCheck(false);
    }


    if (hasUppercase(e.target.value)){
        setPassCheck(prevData => ({
            ...prevData,
            two: 'green'
          }));
    }else{
        setPassCheck(prevData => ({
            ...prevData,
            two: 'red'
          }));
    }

    if(newPass.length>=8){
        setPassCheck(prevData => ({
            ...prevData,
            one: 'green'
          }));
    }else{
        setPassCheck(prevData => ({
            ...prevData,
            one: 'red'
          }));
    }

    if(containsNumber(e.target.value)){
        setPassCheck(prevData => ({
            ...prevData,
            three: 'green'
          }));
    }else{
        setPassCheck(prevData => ({
            ...prevData,
            three: 'red'
          }));
    }

    if(containsSpecialCharacter(e.target.value)){
        setPassCheck(prevData => ({
            ...prevData,
            four: 'green'
          }));
    }else{
        setPassCheck(prevData => ({
            ...prevData,
            four: 'red'
          }));
    }


  };
  const handleConPassChange = (e) => {
    setConPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const verifyEmail = async ()=>{
    console.log('verify email');
    const formData = new FormData();
    formData.append('email',email)
    try{    
        const res = await axios.post('http://127.0.0.1:8000/users/sendotp/',formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
        },}) 

        console.log(res.data);
        if(res.data.status==='200'){
            console.log(res.data.otp);
            console.log(res.data.apikey);
            setServerOtp(res.data.otp)
            setApiKey(res.data.apikey);
            setDivState(prevData => ({
                ...prevData,
                email: false,
                otp:true
              }));
        }
        if(res.data.status==='400'){
            setmsgState(true)
            setMsg(res.data.message)
            setTimeout(() => {
                setmsgState(false);
            }, 2000);
        }
        if(res.data.status==='500'){
            setmsgState(true)
            setMsg(res.data.message)
            setTimeout(() => {
                setmsgState(false);
            }, 2000);
        }

    }catch(error){
        console.log(error);
    }
  }

  const verifyOTP = async()=>{
    console.log('verify otp');
    if(otp==serverotp){
        setOTPState(true);
        setDivState(prevData => ({
            ...prevData,
            otp:false,
            newpass:true
          }));
    }else{
        setmsgState(true);
        setMsg('Invalid OTP!');
        setTimeout(() => {
            setmsgState(false);
        }, 2000);
    }
  }

  

  const updatePass = async()=>{
    console.log('updating password');
    if(conPass===newPass && passstatus){
        const hashPass = SHA256(newPass).toString();
        const formData = new FormData();
        formData.append('apikey',apikey);
        formData.append('email',email);
        formData.append('password',hashPass)
        console.log(passstatus);
        try{
            const res = await axios.post('http://127.0.0.1:8000/users/forgot/',formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res.data);
            if(res.data.status==='200'){
                navigate('/login')
            }
            if(res.data.status==='401'){
                setmsgState(true)
                setMsg(res.data.message)
                setTimeout(() => {
                    setmsgState(false);
                }, 2000);
            }
        }catch(error){
            console.log(error);
        }
    }else{
        setmsgState(true);
            
        setTimeout(() => {
            setmsgState(false);
        }, 2000);
    }
   
  }

  return (
    <>
    {msgstate && <ErrorMsg msg={msg}/>}
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                    <h3 className="text-center">Forgot Password</h3>
                    </div>


                        {divState.email && <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" value={email} placeholder='abc@gmail.com' onChange={handleEmailChange} required/>
                                </div>
                                <div className="d-flex justify-content-center my-3">
                                    <button type="submit" onClick={verifyEmail} className="btn btn-primary btn-block">Verify Email</button>
                                </div>
                                
                            </form>
                        </div>}


                        
                           
                        {divState.otp && <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group ">
                                    <h4 className='text-center'>Enter OTP</h4>
                                    <div className="d-flex justify-content-center">
                                            <input value={otp} type="number" onChange={handleOTPChange} style={{width:'40%'}} className="form-control" id="otp" name="otp" inputMode='numeric'required placeholder='0000'/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center my-3">
                                    <button type="submit" className="btn btn-info btn-block" onClick={verifyOTP}>Verify OTP</button>
                                </div>         
                            </form>
                        </div>}
                              
                        {divState.newpass && <div className="card-body">
                            <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-evenly">
                                <div className="form-group">
                                    <label htmlFor="password">New Password</label>
                                    <input type="password" value={newPass} onChange={handleNewPassChange} className="form-control" id="password" name="password" placeholder='****' required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" value={conPass} onChange={handleConPassChange} className="form-control" id="confirmPassword" name="confirmPassword" placeholder='****' required/>
                                </div>
                            </div>    
                            <div className="d-flex justify-content-center my-3">
                                <div className="d-flex flex-column bd-highlight mb-3 text-center">
                                    <p style={{color:passcheck.one}}>should have length greater then 8 character</p>
                                    <p style={{color:passcheck.two}}>should container atleast 1 uppercase</p>
                                    <p style={{color:passcheck.three}}>should container atleast 1 number</p>
                                    <p style={{color:passcheck.four}}>should container atleast 1 special character</p>
                                </div>
                            </div>
                                <div className="d-flex justify-content-center my-3">
                                    <button type="submit" className="btn btn-primary btn-block" onClick={updatePass}>Submit</button>
                                    <button type="reset" className="btn btn-danger btn-block mx-2">Reset</button>
                                </div>   
                            </form>
                        </div>}


                </div>
                </div>
            </div>
            </div>
    </>
  );
};

export default ForgotPass;
