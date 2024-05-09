import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorMsg from '../Errors/ErrorMsg';
import { useNavigate } from "react-router-dom";
import { SHA256 } from 'crypto-js';
const ForgotPassSeller = () => {
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

    useEffect(()=>{
        document.title = 'Forgot Password Seller';
    },[])
    const [divState,setDivState] = useState({
        'email':true,
        'otp':false,
        'newpass':false
    })

    const navigate = useNavigate();
    
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };
  const handleNewPassChange = (e) => {  
    setNewPass(e.target.value);
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
        const res = await axios.post('http://127.0.0.1:8000/seller/sendotp/',formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
        },}) 

        console.log(res.data);
        if(res.data.status==='200'){
            console.log(res.data.otp);
            console.log(res.data.apikey);
            setServerOtp(res.data.otp)
            setApiKey(res.data.uniquekey);
            console.log(res.data);
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
    if(conPass===newPass){
        console.log(apikey);
        const hashPass = SHA256(newPass).toString();
        const formData = new FormData();
        formData.append('apikey',apikey);
        formData.append('email',email);
        formData.append('password',hashPass)
        console.log(passstatus);
        try{
            const res = await axios.post('http://127.0.0.1:8000/seller/forgot/',formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res.data);
            if(res.data.status==='200'){
                navigate('/sellerlogin')
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

export default ForgotPassSeller;
