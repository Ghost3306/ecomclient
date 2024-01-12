import React from "react";
import { useState,useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

// import axios from 'axios'
function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showPass, setshowPass] = useState(false)
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('')
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
        
      };

      useEffect(() => {
        const login = async () => {
          // Your asynchronous logic here
    
          try {
            let url = `http://127.0.0.1:8000/users/login/?username=${username}&password=${password}`;
            let data = await fetch(url);
    
            if (!data.ok) {
              throw new Error(`Error: ${data.status} - ${data.statusText}`);
            }
    
            let parseData = await data.json();
            console.log(parseData);
          } catch (error) {
            console.error("An error occurred:", error.message);
          }
        };
    
       
        login()
      }, []);
    const login = async()=>{
        // const formData = new FormData();
        // formData.append('username',username);
        // formData.append('password',password);
        try {
            let url = `http://127.0.0.1:8000/users/login/?username=${username}&password=${password}`;
            let data = await fetch(url);
    
            if (!data.ok) {
              throw new Error(`Error: ${data.status} - ${data.statusText}`);
            }
    
            let parseData = await data.json();
            console.log(parseData);
          } catch (error) {
            console.error("An error occurred:", error.message);
          }
    }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="login-container p-4 border rounded" style={{ maxWidth: "400px", width: "100%" }}>
                <form>
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
                        

                        <div className="form-check">
                            <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberMe"
                                    checked={rememberMe} 
                                    onChange={handleRememberMeChange} 
                                />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>


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
                    
                    {/* <div className="div my-2">
                        <ReCAPTCHA 
                        sitekey="6Lc0AUopAAAAAG2Rv3cZ0eMnvtZz0-9uA2tx50Od"
                        onChange={onChange}
                        />
                    </div> */}
                    <button type="submit" onClick={login} disabled={disabled} className="btn btn-primary btn-block mt-3" onSubmit={handleSubmit}>Login</button>
                    {/* <button type="reset" className="btn btn-danger btn-block mt-3 mx-2">Reset</button> */}
                    <div className="form-group mt-3 text-center">
                        <a href="#" className="text-muted">Forgot Password?</a>
                    </div>
                    <div className="form-group text-center">
                        <p className="mb-0">Don't have an account? <a href="#" className="text-primary">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
  );
}

export default Login;
