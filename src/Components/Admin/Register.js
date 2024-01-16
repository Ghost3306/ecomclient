import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import ErrorMsg from '../Errors/ErrorMsg';
import { Link, useNavigate } from "react-router-dom";
import { SHA256 } from 'crypto-js';
function Register() {
    const[name,setName] = useState('');
    const[phone,setPhone] = useState('');
    const[email,setEmail] = useState('');
    const [address,setAddress] = useState('')
    const [dob, setDob] = useState(null)
    const [newPass,setNewPass] = useState('');
    const [conPass,setConPass] = useState('');
    const [passstatus,setPassStatus] = useState(false);
    const [msg,setMsg] = useState('');
    const [msgstate,setmsgState] = useState(null);
    const [otp,setOTP] = useState('');
    const [serverotp,setServerOtp] = useState('');
    const [sendotp,setSendOTP] = useState(false);
    const [emveri, setEm] = useState(false);
    const [passcheck, setPassCheck] = useState({
        'one':'red',
        'two':'red',
        'three':'red',
        'four':'red'
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


      const handleName = (e)=>{
        setName(e.target.value)
      }
      const handleEmail = (e)=>{
        setEmail(e.target.value)
      }
      const handlePhone = (e)=>{
        setPhone(e.target.value)
      }
      
      const handleAddress = (e)=>{
        setAddress(e.target.value)
      }
      const handleDob = (e)=>{
        setDob(e.target.value)
      }

      const submitClick = async()=>{
        console.log(dob);
        
        if(conPass===newPass && passstatus && emveri){
        const formdata = new FormData();
        const hashPass = SHA256(newPass).toString();
        formdata.append('name',name);
        formdata.append('email',email);
        formdata.append('phone',phone);
        formdata.append('address',address);
        formdata.append('birthdate',dob);
        formdata.append('password',hashPass);
        
        try{
            const res = await axios.post('http://127.0.0.1:8000/users/registercustomer/',formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res.data);
            if(res.data.status==='409'){
                setmsgState(true);
                setMsg(res.data.message);
                setEm(false)
                setSendOTP(false)
                setTimeout(() => {
                    setmsgState(false);
                }, 2000);
                
            }

            if(res.data.status==='500'){
                setmsgState(true);
                setMsg(res.data.message);
                setTimeout(() => {
                    setmsgState(false);
                }, 2000);
                navigate('/homepage');
            }

            if(res.data.status==='200'){
                setmsgState(true);
                setMsg(res.data.message);
                navigate('/login');

            }

        }catch(erro){
            console.log(erro);
        }
    }else{
        setmsgState(true);
        setMsg('Invalid Password...Please rewrite');
    }
      }

      const handleotp = (e)=>{
        setOTP(e.target.value);
      }
      const otpbtn = async()=>{
        try{
            const formdata = new FormData();
            formdata.append('email',email);
            const res = await axios.post('http://127.0.0.1:8000/users/sendotp/',formdata,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
        },}) 

        console.log(res.data);
        if(res.data.status==='200'){
            console.log(res.data.otp);
            setServerOtp(res.data.otp)
            setSendOTP(true);
            
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

      const checkotp =()=>{
        console.log(typeof(otp));
        console.log(typeof(serverotp));
        if(parseInt(otp)===serverotp){
            setmsgState(true)
                setMsg('email verified')
                setEm(true)
                setTimeout(() => {
                    setmsgState(false);
                    setSendOTP(false)
                }, 2000);

        }else{
            setmsgState(true)
            setMsg('otp didnt match!')
            setTimeout(() => {
                    setmsgState(false);
                    
                }, 2000);
        }
      }

  return (
    <div className="container ">
        {msgstate && <ErrorMsg msg={msg}/>}
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h4 className='text-center'>Registration Form</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" onChange={handleName} className="form-control" id="name" placeholder="Enter Name" required/>
                            </div>

                            <div className="d-flex justify-content-evenly my-2">
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" onChange={handleEmail}  className="form-control" id="email" placeholder="abc@gmail.com" required/>
                                    {!emveri && <button type="button" className='btn btn-info btn-sm my-3' onClick={otpbtn} style={{color:'#fff'}}>send otp</button>}
                                    {emveri && <p style={{color:'green'}}>Email verified!</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone:</label>
                                    <input type="number" onChange={handlePhone}  className="form-control" id="phone" placeholder="96085xxxxx "
                                        inputMode="numeric" required/>
                                </div>

                            </div>
                            
                            {sendotp && <div className="d-flex justify-content-center my-2">
                                <div className="form-group">
                                    <label htmlFor="number">OTP:</label>
                                    <input onChange={handleotp} type="number" className="form-control" placeholder='0000'    id="otp" required/>
                                    <button type="button" style={{color:'#fff'}} className='btn btn-primary text-center my-2' onClick={checkotp}>verify</button>
                                </div>

                            </div>}


                            <div className="form-group my-2">
                                <label htmlFor="address">Address:</label>
                                <textarea className="form-control" onChange={handleAddress}  id="address" placeholder="Enter your address" required></textarea>
                            </div>

                            <div className="d-flex justify-content-center my-2">
                                <div className="form-group">
                                    <label htmlFor="birthdate">Birthdate:</label>
                                    <input type="date" onChange={handleDob}  className="form-control" id="birthdate" required/>
                                </div>

                            </div>
                            
                            <div className="d-flex justify-content-evenly my-2">
                                <div className="form-group">
                                    <label htmlFor="text">Create Password:</label>
                                    <input type="text" className="form-control" id="crpassword" value={newPass} onChange={handleNewPassChange} placeholder="password" required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Confirm Password:</label>
                                    <input type="password" value={conPass} className="form-control" onChange={handleConPassChange} id="cnpassword" placeholder="********" required/>
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

                            <div className="d-flex justify-content-center">
                            <button type="submit"  onClick={submitClick} className="btn btn-primary">Register</button>
                            <button type="reset" className="btn btn-danger mx-3">Reset</button>

                            </div>
                            <div className="d-flex justify-content-center my-2">
                                <Link to="/login">Login</Link>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Register