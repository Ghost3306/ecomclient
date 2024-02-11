import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Products from './Products';

function AddProduct() {
    const navigate = useNavigate()
    const [addprod,setaddprod] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);
    const [prodname, setprodname] = useState('');
    const [describe, setdescribe] = useState('');
    const [price, setprice] = useState('');
    const [delivery, setdelivery] = useState('');
    const [width, setwidth] = useState('');
    const [height, setheight] = useState('');
    const [length , setlength]= useState('');
    const [category, setcategory] = useState('');

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);

    const [productstate,setState] = useState(true);
    const [reload ,setOnReload] = useState(true);

    
    useEffect(()=>{
        // return setCookie('sellerapikey',cookies.sellerapikey,{path:'/'})
    })
    const logout =()=>{
        setCookie('sellerapikey','logout',{ path: '/' });
        setCookie('name','logout',{ path: '/' });
        setCookie('email','logout',{ path: '/' });
        navigate('/')

    }
    const addProduct = ()=>{
        console.log('product adding start');
        if(productstate){
            setState(false);
        }else{
            setState(true)
        }
        if(addprod){
            setaddprod(false);
        }else{
            setaddprod(true);
        }
    }
    const onSubmit = (e)=>{
        e.preventDefault();
    }

    const handleInputChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
        // console.log(e.target.value);
      }
    const handleFile = (event)=>{ 
        setImage1(event.target.files[0]);
    }
    const handleFile2 = (event)=>{ 
        setImage2(event.target.files[0]);
    }
    const handleFile3 = (event)=>{ 
        setImage3(event.target.files[0]);
    }
    const handleFile4 = (event)=>{ 
        setImage4(event.target.files[0]);
    }
    const handleFile5 = (event)=>{ 
        setImage5(event.target.files[0]);
    }

    const sendproduct = async ()=>{
        console.log('product sending in process');
        const sellerapikey = cookies.sellerapikey;
        console.log(sellerapikey);
        const formdata = new FormData();
        formdata.append('sellerid',sellerapikey);
        formdata.append('name',prodname);
        formdata.append('describe',describe);
        formdata.append('price',price);
        formdata.append('delivertcharge',delivery);
        formdata.append('width',width);
        formdata.append('height',height);
        formdata.append('length',length);
        formdata.append('category',category);
        formdata.append('image1',image1);
        formdata.append('image2',image2);
        formdata.append('image3',image3);
        formdata.append('image4',image4);
        formdata.append('image5',image5);
        try{
            const res = await axios.post('http://127.0.0.1:8000/products/addproduct/',formdata,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            })

            console.log(res.data);
            setState(true);
            setaddprod(false);
        }catch(error){
            console.log(error);
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
                <Link type="button" to="sellerhistory"  className='btn btn-outline-info' >History</Link>
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight">
            <Link type="button" to="sellerallprod"  className='btn btn-outline-info btn-sm' >All Orders</Link>
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight">
                <button type="button" style={{color:'#fff'}} className='btn btn-info btn-lg' onClick={logout}>logout</button>
            </div>
        </div>
            
            <div className="d-flex flex-column bd-highlight ">
                <div className="p-2 bd-highlight"><button type="button" onClick={addProduct} className='btn btn-primary btn-lg'>Add Product</button></div>
                <div className="p-2 bd-highlight">
                {addprod && <div className="container">
                <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control form-control-lg"  placeholder="Product Name " value={prodname} onChange={(e) => handleInputChange(e, setprodname)} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" value={describe} onChange={(e)=> handleInputChange(e,setdescribe)} style={{height:'100px'}} ></textarea >
                            <label htmlFor="floatingTextarea2">Description</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Price</span>
                            <input type="number" className="form-control" value={price} onChange={(e) => handleInputChange(e, setprice)} aria-label="Amount (to the nearest Rupee)"/>
                            <span className="input-group-text">&#8377;</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Delivery Charge</span>
                            <input type="number" className="form-control" value={delivery} onChange={(e) => handleInputChange(e, setdelivery)} aria-label="Amount (to the nearest Rupee)"/>
                            <span className="input-group-text">&#8377;</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="col-sm-3">
                            <label className="visually-hidden" htmlFor="specificSizeSelect">Preference</label>
                            <select className="form-select" value={category} onChange={(e) => handleInputChange(e, setcategory)}id="specificSizeSelect">
                            <option defaultValue={category}>Category</option>
                            <option value="Clothing and Apparel">Clothing and Apparel</option>
                            <option value="Home and Kitchen">Home and Kitchen</option>
                            <option value="Health and Beauty">Health and Beauty</option>
                            <option value="Sports and Outdoors">Sports and Outdoors</option>
                            <option value="Automotive">Automotive</option>
                            <option value="Toys and Games">Toys and Games</option>
                            <option value="Books and Media">Books and Media</option>
                            <option value="Office and School Supplies">Office and School Supplies</option>
                            <option value="Jewelry and Accessories">Jewelry and Accessories</option>
                            <option value="Pet Supplies">Pet Supplies</option>
                            <option value="Appliances">Appliances</option>
                            <option value="Tools and Home Improvement">Tools and Home Improvement</option>
                            <option value="Electrical and Lighting">Electrical and Lighting</option>
                            <option value="Crafts and Hobbies">Crafts and Hobbies</option>
                            <option value="Baby and Nursery">Baby and Nursery</option>
                            <option value="Garden and Outdoor Living">Garden and Outdoor Living</option>
                            
                            
                            

                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="col-auto">
                            <label className="visually-hidden" htmlFor="autoSizingInputGroup">in cm</label>
                            <div className="input-group">
                            <div className="input-group-text">Width : </div>
                            <input type="number" value={width} onChange={(e) => handleInputChange(e, setwidth)} className="form-control" id="autoSizingInputGroup" placeholder=".cm"/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                    <div className="col-auto">
                            <label className="visually-hidden" htmlFor="autoSizingInputGroup">in cm</label>
                            <div className="input-group">
                            <div className="input-group-text">Height : </div>
                            <input type="number" value={height} onChange={(e) => handleInputChange(e, setheight)} className="form-control" id="autoSizingInputGroup" placeholder=".cm"/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                    <div className="col-auto">
                            <label className="visually-hidden" htmlFor="autoSizingInputGroup">in cm</label>
                            <div className="input-group">
                            <div className="input-group-text">Length : </div>
                            <input type="number" value={length} onChange={(e) => handleInputChange(e, setlength)} className="form-control" id="autoSizingInputGroup" placeholder=".cm"/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container-fluid my-3">
                    <p>Enter Product Images : </p>
                    <div className="row flex-container justify-content-around">
                        <div className="col-2 flex-item">
                            <div className="mb-3">
                                <label htmlFor="formFileSm" className="form-label">Image 1</label>
                                <input className="form-control form-control-sm"  onChange={handleFile} accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div className="col-2 flex-item">
                            <div className="mb-3">
                                <label htmlFor="formFileSm" className="form-label">Image 2</label>
                                <input className="form-control form-control-sm"  onChange={handleFile2} accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div className="col-2 flex-item">
                            <div className="mb-3">
                                <label htmlFor="formFileSm" className="form-label">Image 3</label>
                                <input className="form-control form-control-sm"  onChange={handleFile3} accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div className="col-2 flex-item">
                            <div className="mb-3">
                                <label htmlFor="formFileSm" className="form-label">Image 4</label>
                                <input className="form-control form-control-sm"  onChange={handleFile4} accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                        <div className="col-2 flex-item">
                            <div className="mb-3">
                                <label htmlFor="formFileSm" className="form-label">Image 5</label>
                                <input className="form-control form-control-sm"  onChange={handleFile5} accept="image/*" id="formFileSm" type="file"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 d-flex justify-content-center">
                    <button type="button" className='btn btn-primary' onClick={sendproduct}>Add</button>
                </div>
                </form>
                <div className="container text-center" style={{color:'red'}}>
                    <p>Images should be in 1:1 for better view</p>
                    <p>Upload in high quality</p>
                    <p>Every should be in every angle of product</p>
                </div>
                </div>}

                </div>
                {productstate && <div className="p-2 bd-highlight"><Products  adddel= {setaddprod}/></div>}
            </div>
            
           
        </div>

        
        

        
    </>
    
  )
}

export default AddProduct