import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function AddProduct() {
    const navigate = useNavigate()
    const [addprod,setaddprod] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);
    const logout =()=>{
        setCookie('sellerapikey','logout',{ path: '/' });
        setCookie('name','logout',{ path: '/' });
        setCookie('email','logout',{ path: '/' });
        navigate('/')

    }
    const addProduct = ()=>{
        console.log('product adding start');
        
        if(addprod){
            setaddprod(false);
        }else{
            setaddprod(true);
        }
    }
  return (
    <>
        <div className="container">
        <div className="d-flex bd-highlight">
            <div className="p-2 w-100 bd-highlight">
                <h3 className='my-4'>Seller Dashboard</h3>
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight">
                <button type="button" style={{color:'#fff'}} className='btn btn-info' onClick={logout}>logout</button>
            </div>
        </div>
            
            <div className="d-flex flex-column bd-highlight ">
                <div className="p-2 bd-highlight"><button type="button" onClick={addProduct} className='btn btn-primary btn-lg'>Add Product</button></div>
                <div className="p-2 bd-highlight">
                {addprod && <div className="container">
                <form>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control form-control-lg"  placeholder="Product Name " aria-label="First name"/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height:'100px'}} ></textarea>
                            <label for="floatingTextarea2">Description</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Price</span>
                            <input type="number" class="form-control" aria-label="Amount (to the nearest Rupee)"/>
                            <span class="input-group-text">&#8377;</span>
                        </div>
                    </div>
                    <div className="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Delivery Charge</span>
                            <input type="number" class="form-control" aria-label="Amount (to the nearest Rupee)"/>
                            <span class="input-group-text">&#8377;</span>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <p>Enter Product Images : </p>
                    <div class="row flex-container justify-content-around">
                        <div class="col-2 flex-item">
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Image 1</label>
                                <input class="form-control form-control-sm" accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div class="col-2 flex-item">
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Image 2</label>
                                <input class="form-control form-control-sm" accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div class="col-2 flex-item">
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Image 3</label>
                                <input class="form-control form-control-sm"  accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div class="col-2 flex-item">
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Image 4</label>
                                <input class="form-control form-control-sm"  accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div class="col-2 flex-item">
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Image 5</label>
                                <input class="form-control form-control-sm" accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
                <div className="container text-center" style={{color:'red'}}>
                    <p>Images should be in 1:1 for better view</p>
                    <p>Upload in high quality</p>
                    <p>Every should be in every angle of product</p>
                </div>
                </div>}

                </div>
                <div className="p-2 bd-highlight">List Of Products to be added</div>
            </div>
            
           
        </div>

        
        

        
    </>
    
  )
}

export default AddProduct