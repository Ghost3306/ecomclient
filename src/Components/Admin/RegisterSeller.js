import React from 'react'
import { useState } from 'react'
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

  const handleInputChange = (e, setStateFunction) => {
    setStateFunction(e.target.value);
  };
  const handleFile = (event)=>{
    console.log(businessImage);
    setBusinessImage(event.target.files[0]);
}
  return (
    <>
      <div className="container mt-5 " >
        <form>
          <div className="container-fluid ">
            <h2 className="text-center">Register Seller</h2>
            <div className="row mt-4">
                <h3>Bussiness Info</h3>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={businessName} id="floatingInput" required onChange={(e) => handleInputChange(e, setBusinessName)}/>
                        <label htmlFor="floatingInput">Bussiness Name</label>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="email" value={businessEmail} className="form-control" id="floatingInput" placeholder="abc@gmail.com" onChange={(e) => handleInputChange(e, setBusinessEmail)}/>
                        <label htmlFor="floatingInput">Bussiness Email</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="number" value={phone} className="form-control" id="floatingInput" placeholder="96044xxxxx" onChange={(e) => handleInputChange(e, setPhone)}/>
                        <label htmlFor="floatingInput">Phone</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="text" value={gst} className="form-control" id="floatingInput" placeholder="gst044xxxxx" onChange={(e) => handleInputChange(e, setGst)}/>
                        <label htmlFor="floatingInput">GST No.</label>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="d-flex flex-row bd-highlight mb-3 col">
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Upload Image of Bussiness Place</label>
                        <input className="form-control" type="file" id="formFile" onChange={handleFile}/>
                        <label htmlFor="formFile" className="form-label">Image should be in 1:1 ration for better view</label>
                    </div>
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
                    <input className="form-control"value={district} list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={(e) => handleInputChange(e, setDistrict)}/>
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
                    <input className="form-control" value={taluka} list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={(e) => handleInputChange(e, setTaluka)}/>
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
                        <input type="text" value={city} className="form-control" id="floatingInput" placeholder="eg. Kankavli" onChange={(e) => handleInputChange(e, setCity)}/>
                        <label htmlFor="floatingInput">City</label>
                    </div>
                    <div className="form-floating mb-3 mx-3">
                        <input type="number" value={pin} className="form-control" id="floatingInput" placeholder="416602" onChange={(e) => handleInputChange(e, setPin)}/>
                        <label htmlFor="floatingInput">Pincode</label>
                    </div>
                </div>
            </div>

            <div className="row mt-4">   
                <div className="col">
                    <div className="row mt-4">
                        <h3>Owner Details</h3>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={ownerName} className="form-control" id="floatingInput" required onChange={(e) => handleInputChange(e, setOwnerName)}/>
                                <label htmlFor="floatingInput">Owner Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="email" value={ownerEmail} className="form-control" id="floatingInput" placeholder="abc@gmail.com" onChange={(e) => handleInputChange(e, setOwnerEmail)}/>
                                <label htmlFor="floatingInput">Owner Email</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                              <input type="number" value={ownerPhone} className="form-control" id="floatingInput" placeholder="96044xxxxx" onChange={(e) => handleInputChange(e, setOwnerPhone)}/>
                              <label htmlFor="floatingInput">Phone</label>
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
                                <input type="text" value={bankName} className="form-control" id="floatingInput" required onChange={(e) => handleInputChange(e, setBankName)}/>
                                <label htmlFor="floatingInput">Bank Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput" value={accNo} onChange={(e) => handleInputChange(e, setAccNo)}/>
                                <label htmlFor="floatingInput">Acc No.</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={ifsc} className="form-control" id="floatingInput" onChange={(e) => handleInputChange(e, setIfsc)}/>
                                <label htmlFor="floatingInput">IFSC</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" value={aadharCard} className="form-control" id="floatingInput" onChange={(e) => handleInputChange(e, setAadharCard)}/>
                                <label htmlFor="floatingInput">Aadhar No.</label>
                            </div>
                        </div>
                    </div>
                </div>
              </div>

              <div className="d-flex flex-row bd-highlight mb-3">
                <button type="submit" className="btn btn-primary">Submit</button>
                {/* <button type="reset" className="btn btn-danger mx-3">Clear</button> */}
              </div>
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