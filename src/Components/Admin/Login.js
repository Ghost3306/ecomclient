import React from "react";
import { useState,useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useCookies } from "react-cookie";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "../Errors/ErrorMsg";
import { SHA256 } from 'crypto-js';
function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [showPass, setshowPass] = useState(false)
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [res,setres] = useState(null);
    const [cookies, setCookie] = useCookies(['user']);
    const [msg, setmsg] = useState('');
    const [msgstate,setmsgState] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        document.title = 'Login'
        console.log('login useeffect');
    },[])


    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleShowPass = () => {
        
        setshowPass(!showPass);
    };

    async function onChange(value) {
        setDisabled(false)

    }

    const handleuserChange = (event)=>{
        setUsername(event.target.value)
    }
    
    const handlepassChange = (event)=>{
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
    }

    function setdata(res){
        try{
            setCookie('remember',rememberMe,{path:'/'})
            setCookie('name',res.name,{ path: '/' })
            setCookie('email',res.email,{ path: '/' })
            setCookie('phone',res.phone,{ path: '/' })
            setCookie('address',res.address,{ path: '/' })
            setCookie('apikey',res.apikey,{ path: '/' })
            setCookie('birthdate',res.birthdate,{ path: '/' })
        }catch(error){
            console.log(error);
        }
        
    }
      
    const login = async()=>{
        const formData = new FormData();
        const hashPass = SHA256(password).toString();
        formData.append('username',username);
        formData.append('password',hashPass);
        
        try {
            const res = await axios.post('http://127.0.0.1:8000/users/login/', formData,
             {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            
            console.log(res.data.status);
            if(res.data.status==='401'){
                setmsg(res.data.message)
                setmsgState(true)
                setTimeout(() => {
                    // console.log('timeout complete');
                    setmsgState(false);
                }, 2000);
            }
            if(res.data.status==='200'){
                // console.log(res.data.data);
                setres(res.data.data)
                setdata(res.data.data)
                navigate('/')
            }
            if(res.data.status==='500'){
                setmsg(res.data.message)
                setmsgState(true)
                setTimeout(() => {
                    setmsgState(false);
                }, 2000);
            }
            
        } catch (error) {
            console.error('Error', error);
        }
    }

  return (
    <>
    {msgstate && <ErrorMsg msg ={msg}/>}
    <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="login-container p-4 border rounded" style={{ maxWidth: "400px", width: "100%" }}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4">Login</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="email" value={username} onChange={handleuserChange} className="form-control" id="username" placeholder="Username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type={showPass?'text':'password'} value={password} onChange={handlepassChange} className="form-control" id="password" placeholder="Password" required />
                    </div>
                    <div className="d-flex justify-content-between my-2">
                        

                        {/* <div className="form-check">
                            <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                    checked={rememberMe} 
                                    onChange={handleRememberMeChange} 
                                />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div> */}


                        <div className="form-check">
                            <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="show"
                                    checked={showPass} 
                                    onChange={handleShowPass} 
                                />
                            <label className="form-check-label" htmlFor="rememberMe">Show</label>
                        </div>
                    </div>
                    
                    <div className="div my-2">
                        <ReCAPTCHA 
                        sitekey="6Lc0AUopAAAAAG2Rv3cZ0eMnvtZz0-9uA2tx50Od"
                        onChange={onChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button  button type="submit" onClick={login} disabled={disabled} className="btn btn-primary btn-block mt-3" >Login</button>
                    </div>
                    
                    {/* <button type="reset" className="btn btn-danger btn-block mt-3 mx-2">Reset</button> */}
                    <div className="form-group mt-3 text-center">
                        <Link to="/forgot" className="text-muted">Forgot Password?</Link>
                    </div>
                    <div className="form-group text-center">
                        <p className="mb-0">Don't have an account? <Link to="/register" className="text-primary">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </>
  );
}

export default Login;
