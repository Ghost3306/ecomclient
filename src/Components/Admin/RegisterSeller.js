import React from 'react'

function RegisterSeller() {
  return (
    <>
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                <h2 class="mb-4">Register Your Business</h2>
                <form>
                <div class="row">
  <div class="col">
    <input type="text" class="form-control" placeholder="First name" aria-label="First name"/>
  </div>
  <div class="col">
    <input type="text" class="form-control" placeholder="Last name" aria-label="Last name"/>
  </div>
</div>
                    <div class="form-group">
                    <label for="businessName" class="form-floating">Business Name</label>
                    <input type="text" class="form-control" id="businessName" placeholder="Enter Business Name" required/>
                    </div>
                    <div class="d-flex justify-content-between">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-group">
                        <label for="phone" class="form-floating">Phone</label>
                        <input type="tel" class="form-control" id="phone" placeholder="Enter Phone Number" required/>
                    </div>
                    </div>
                    <div class="d-flex justify-content-between">
                    <div class="form-group">
                        <label for="gst" class="form-floating">GST Number</label>
                        <input type="text" class="form-control" id="gst" placeholder="Enter GST Number" required/>
                    </div>
                    <div class="form-group">
                        <label for="businessImage" class="form-floating">Business Image</label>
                        <input type="file" class="form-control" id="businessImage" required/>
                    </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
                </div>
            </div>
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