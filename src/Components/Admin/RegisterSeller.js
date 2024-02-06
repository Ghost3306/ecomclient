import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import ErrorMsg from '../Errors/ErrorMsg';
import { SHA256 } from 'crypto-js';
import { Link, useNavigate } from "react-router-dom";
function RegisterSeller() {
  const [businessName, setBusinessName] = useState('');
  // const [uniqueKey, setUniqueKey] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gst, setGst] = useState('');
  const [businessImage, setBusinessImage] = useState(null);

  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [taluka, setTaluka] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');

  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerName, setOwnerName] = useState('');

  const [bankName, setBankName] = useState('');
  const [accNo, setAccNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [crpass,setCrpass] = useState('');
  const [cnpass,setCnPass] = useState('');

  const [apikey,setApiKey] = useState('');
  const [serverotp,setServerOtp] = useState('');
  const [msgstate,setmsgState] = useState(null);
  const [msg,setMsg] = useState(false);
  const [otp, setotp] = useState('');
  const [div,setDiv] =useState(false);
  const [emmsg,setemmsg] = useState('');
  const [procced, setproc] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e, setStateFunction) => {
    setStateFunction(e.target.value);
  };
  const handleFile = (event)=>{
    console.log(businessImage);
    setBusinessImage(event.target.files[0]);
}

    const onSubmit = (e)=>{
        e.preventDefault();
    }
    const outfocus= async()=>{
        console.log(businessEmail);
        const formdata = new FormData();
        formdata.append('email',businessEmail)
        try{    
            const res = await axios.post('http://127.0.0.1:8000/users/sendotp/',formdata,
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
                setMsg(true)
                setemmsg('Otp sent to your email id')
                setDiv(true)
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

    const register = async()=>{
        const formdata = new FormData();
        const hashPass = SHA256(crpass).toString();
        formdata.append('bussinessname',businessName);
        formdata.append('bussinessemail',businessEmail);
        formdata.append('phone',phone);
        formdata.append('gst',gst);
        
        formdata.append('state',state);
        formdata.append('district',district);
        formdata.append('taluka',taluka);
        formdata.append('city',city);
        formdata.append('pin',pin);
        formdata.append('owneremail',ownerEmail);
        formdata.append('ownerphone',ownerPhone);
        formdata.append('ownername',ownerName);
        formdata.append('bankname',bankName);
        formdata.append('accno',accNo);
        formdata.append('ifsc',ifsc);
        formdata.append('aadharcard',aadharCard);
        formdata.append('password',hashPass);
        try{
            const res = await axios.post('http://127.0.0.1:8000/seller/showseller/',formdata,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            
            })
            console.log(res.data);
            if(res.data.status==='200'){
                navigate('/')
            }
        }catch(error){
            console.log(error);
        }

    }
    const otpver = ()=>{
        if(otp==serverotp){
            console.log('otpverifed');
            setemmsg('email verified');
            setproc(true)
            setDiv(false);
        }else{
            console.log('not verfied');
            setemmsg('invalid otp!');
        }
    }
  return (
    <>
    {/* {msgstate &&  <ErrorMsg msg={msg}/>} */}
      <div className="container mt-5 " >
        <form onSubmit={onSubmit}>
          <div className="container-fluid ">
            <h2 className="text-center">Register Seller</h2>
            <div className="row mt-4">
                <h3>Bussiness Info</h3>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={businessName} id="floatingInput1" required onChange={(e) => handleInputChange(e, setBusinessName)}/>
                        <label htmlFor="floatingInput1">Bussiness Name</label>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="number" value={phone} className="form-control" id="floatingInput3" placeholder="96044xxxxx" onChange={(e) => handleInputChange(e, setPhone)}/>
                        <label htmlFor="floatingInput3">Phone</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="text" value={gst} className="form-control" id="floatingInput4" placeholder="gst044xxxxx" onChange={(e) => handleInputChange(e, setGst)}/>
                        <label htmlFor="floatingInput4">GST No.</label>
                    </div>
                </div>
            </div>

            <div className="d-flex bd-highlight ">
                

            <div className="flex-fill bd-highlight">
                    <div className="form-floating mb-3">
                        <input type="email" value={businessEmail} className="form-control" id="floatingInput2" placeholder="abc@gmail.com" onBlur={outfocus} onChange={(e) => handleInputChange(e, setBusinessEmail)}/>
                        <label htmlFor="floatingInput2">Bussiness Email</label>
                    </div>
                    {msg && <p>{emmsg}</p>}
                </div>
                <div className="flex-fill bd-highlight">
                    {div && <div className="form-floating mb-3 mx-3">
                            <input type="number" value={otp} className="form-control" id="floatingInput2" placeholder="0000" onChange={(e) => handleInputChange(e, setotp)}/>
                            <label htmlFor="floatingInput2">OTP</label>
                            <div className="div my-2">
                                <button onClick={otpver} className='btn btn-primary btn-sm'>Verify</button>
                            </div>
                            
                        </div>}

                </div>
            </div>

            {/* address */}
            <div className="row mt-4">
                <h3>Address</h3>
                <div className="col">
                    <label htmlFor="exampleDataList" className="form-label">State</label>
                    <input className="form-control" list="datalistOptions" id="exampleDataList" value={state} placeholder="Type to search..." onChange={(e) => handleInputChange(e, setState)}/>
                    <datalist id="datalistOptions">
                        <option value="San Francisco"/>
                        <option value="New York"/>
                        <option value="Seattle"/>
                        <option value="Los Angeles"/>
                        <option value="Chicago"/>
                    </datalist>
                </div>
                <div className="col">
                    <label htmlFor="exampleDataList" className="form-label">District</label>
                    <input className="form-control"value={district} list="datalistOptions" id="exampleDataList4" placeholder="Type to search..." onChange={(e) => handleInputChange(e, setDistrict)}/>
                    <datalist id="datalistOptions">
                        <option value="San Francisco"/>
                        <option value="New York"/>
                        <option value="Seattle"/>
                        <option value="Los Angeles"/>
                        <option value="Chicago"/>
                    </datalist>
                </div>
                <div className="col">
                    <label htmlFor="exampleDataList" className="form-label">Taluka</label>
                    <input className="form-control" value={taluka} list="datalistOptions" id="exampleDataList5" placeholder="Type to search..." onChange={(e) => handleInputChange(e, setTaluka)}/>
                    <datalist id="datalistOptions">
                        <option value="San Francisco"/>
                        <option value="New York"/>
                        <option value="Seattle"/>
                        <option value="Los Angeles"/>
                        <option value="Chicago"/>
                    </datalist>
                </div>
            </div>
            <div className="row mt-4">
                <div className="d-flex flex-row bd-highlight mb-3 col">
                    <div className="form-floating mb-3">
                        <input type="text" value={city} className="form-control" id="floatingInput5" placeholder="eg. Kankavli" onChange={(e) => handleInputChange(e, setCity)}/>
                        <label htmlFor="floatingInput5">City</label>
                    </div>
                    <div className="form-floating mb-3 mx-3">
                        <input type="number" value={pin} className="form-control" id="floatingInput6" placeholder="416602" onChange={(e) => handleInputChange(e, setPin)}/>
                        <label htmlFor="floatingInput6">Pincode</label>
                    </div>
                </div>
            </div>

            <div className="row mt-4">   
                <div className="col">
                    <div className="row mt-4">
                        <h3>Owner Details</h3>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={ownerName} className="form-control" id="floatingInput7" required onChange={(e) => handleInputChange(e, setOwnerName)}/>
                                <label htmlFor="floatingInput7">Owner Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="email" value={ownerEmail} className="form-control" id="floatingInput8" placeholder="abc@gmail.com" onChange={(e) => handleInputChange(e, setOwnerEmail)}/>
                                <label htmlFor="floatingInput8">Owner Email</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                              <input type="number" value={ownerPhone} className="form-control" id="floatingInput9" placeholder="96044xxxxx" onChange={(e) => handleInputChange(e, setOwnerPhone)}/>
                              <label htmlFor="floatingInput9">Phone</label>
                          </div>
                      </div>
                  </div>
              </div>
            </div>


            <div className="row mt-4 mb-3">
                <div className="col">
                    <div className="row mt-4">
                        <h3>Bank Details</h3>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={bankName} className="form-control" id="floatingInput0" required onChange={(e) => handleInputChange(e, setBankName)}/>
                                <label htmlFor="floatingInput0">Bank Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput11" value={accNo} onChange={(e) => handleInputChange(e, setAccNo)}/>
                                <label htmlFor="floatingInput11">Acc No.</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={ifsc} className="form-control" id="floatingInput12" onChange={(e) => handleInputChange(e, setIfsc)}/>
                                <label htmlFor="floatingInput12">IFSC</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={aadharCard} className="form-control" id="floatingInput13" onChange={(e) => handleInputChange(e, setAadharCard)}/>
                                <label htmlFor="floatingInput13">Aadhar No.</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput14" value={crpass} onChange={(e) => handleInputChange(e, setCrpass)}/>
                        <label htmlFor="floatingInput14">Create Password</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingInput15" value={cnpass} onChange={(e) => handleInputChange(e, setCnPass)}/>
                        <label htmlFor="floatingInput15">Confirm Password</label>
                    </div>
                </div>

            </div>
            {procced?<div className="d-flex flex-row bd-highlight mb-3">
                <button type="submit" className="btn btn-primary" onClick={register}>Submit</button>
                
              </div>:<div className="d-flex flex-row bd-highlight mb-3 ">
                <h4 className='text-center' style={{color:'red'}}>Please verify your email to procced</h4>
                
              </div>}
              
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterSeller

// bussinessname ,
//     uniquekey ,
//     bussinessemail ,
//     phone ,
//     gst ,
//     bussimage ,

//     state ,
//     district, 
//     taluka ,
//     city ,

//     owneremail ,
//     ownerphone ,
//     ownername, 

//     bankname, 
//     accno ,
//     ifsc,
//     aadharcard, 