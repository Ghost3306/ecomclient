import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
function Products() {
    const [uniqueid,setuid]= useState('');
    const [products, setProducts] = useState(null);
    const [pop,setPop] = useState(false);
    const [popdata , setPopdata] = useState(null);
    const [image, setImage] = useState(false);
    const [imagepath, setImagepath] = useState('')
    const [cookie,setCookie] = useCookies(['user'])
    const [dele,setdelete] = useState(false);
    const [deldata, setdeldata] = useState('');
    const [load, setLoad] = useState(true)


    const [addprod,setaddprod] = useState(false);
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


    async function fetchproducts(){
        const formdata = new FormData()
        formdata.append('sellerapi',cookie.sellerapikey)
        try{
            const res = await axios.post('http://127.0.0.1:8000/products/sellerproducts/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })
            // console.log(res.data);
            console.log('products fetching');
            setProducts(res.data)
            // console.log('products',products);
            }catch(error){
                console.log(error);
            }
    }
    useEffect(()=>{
        console.log('useeffect');
        
        fetchproducts();
        
    },[])

    

    const popclick = ()=>{
        console.log('poping');
        if(pop){
            setPop(false);
        }else{
            setPop(true);
        }
        console.log(pop);
    }

    const ondelete = async()=>{
        const formdata = new FormData();
        formdata.append('uniqueid',deldata);
        try{
            const res =  await axios.post('http://127.0.0.1:8000/products/deleteproduct/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })
            fetchproducts();
            console.log(res.data);
            setdelete(false);
            
                   
        }catch(error){
            console.log(error);
        }
    }

    

    const updateproduct= async()=>{
        console.log('product updating');
        const formdata = new FormData();
        formdata.append('uniqueid',uniqueid);
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
            const res = await axios.post('http://127.0.0.1:8000/products/updateproduct/',formdata,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            })

            console.log(res.data);
            fetchproducts();
            setaddprod(false);

        }catch(error){
            console.log(error);
        }
    }

  return (
    <>

        {dele && <div className="p-3 container" style={{width:'300px',height:'200px',position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,-50%)', border:'1px solid black', background:'#fff'}}>
            <h5 className='text-center'>Are sure you want to delete</h5>
            <p className='text-center'>Product {deldata}</p>
            <div class="d-flex justify-content-center">
                <button type="button" className='btn btn-danger mx-2' onClick={ondelete}>Yes</button>
                <button type="button" className='btn btn-info' onClick={()=>{setdelete(false);setLoad(true)}}>No</button>
            </div>
            
        </div>
}

        {image && <div className="container" style={{width:'1000px',height:'600px',position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,-50%)', border:'1px solid black', background:'#fff'}}>
            <div className="d-flex justify-content-between my-3"  >
                <h4>Product Image</h4>
                <button type="button" className='btn btn-danger btn-sm' onClick={()=>{
                setImage(false); setPop(true)
            }}>x</button>
            </div>
            <div className="container" style={{width:'100%', height:'85%',background:'#fff',border:'1px solid black'}}>
                <img src={imagepath} className='my-1' style={{width:'85%',height:'85%',objectFit:'contain',backgroundSize:'cover'}} alt="image" srcset="" />
            </div>
                
           
            
        </div>}

        {pop && <div className="container" style={{position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,-50%)', border:'1px solid black', width:'1000px',height:'550px', background:'#fff' }} >
            <div className="d-flex justify-content-between my-3">
                <h4>Product Details</h4>
                <button type="button" className='btn btn-danger btn-sm' onClick={popclick}>x</button>
            </div>
            <div className="row">
                <div className="col">
                        <p>Unique ID : {popdata.uniqueid}</p>
                    </div>
                    <div className="col">
                        <p>Name : {popdata.name}</p>
                    </div>
                    <div className="col">
                        <p>Category : {popdata.category}</p>
                    </div>
            </div>
            <div className="row" style={{overflow:'auto'}}>
                <div className="col">
                    <p>Description : {popdata.description}</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Price : {popdata.price}</p>
                </div>
                <div className="col">
                    <p>Delivery Charge : {popdata.delivertcharge}</p>
                </div>
                <div className="col">
                    <p>Width : {popdata.width}</p>
                </div>
                <div className="col">
                    <p>Height : {popdata.height}</p>
                </div>
                <div className="col">
                    <p>Length : {popdata.length}</p>
                </div>
            </div>
            <div className="row">
                <div className="col" >
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image1} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image1); setPop(false)}}  />
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image2} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image2); setPop(false)}} />
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image3} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image3); setPop(false)}} />
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image4} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image4); setPop(false)}}/>
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image5} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image5); setPop(false)}} />
                </div>
            </div>

                
        </div>}


        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Unique id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map((element,index)=>{
                    // console.log(element);
                    const onviewclick = ()=>{
                        console.log('element poping');
                        popclick();
                        setPopdata(element)
                        console.log(element.image1);
                    }
                    const onupdateclick = ()=>{
                        console.log('update click');
                        if(addprod){
                            setaddprod(false)
                        }else{
                            setaddprod(true)
                        }
                        setuid(element.uniqueid);
                        setprodname(element.name);
                        setcategory(element.category);
                        setdescribe(element.description);
                        setprice(element.price);
                        setdelivery(element.delivertcharge);
                        setwidth(element.width);
                        setheight(element.height);
                        setlength(element.length);
                        
                    }
                    return <tr key={index}>
                        <th scope="row">{element.uniqueid}</th>
                        <td>{element.name}</td>
                        <td>{element.category}</td>
                    <td><button type="button" className='btn btn-primary btn-sm' onClick={onviewclick}>View</button></td>
                    <td><button type="button" className='btn btn-danger btn-sm' onClick={()=>{setdelete(true);setLoad(false);setdeldata(element.uniqueid)}}>Delete</button></td>
                    <td><button type="button" className='btn btn-primary btn-sm' onClick={onupdateclick}>Update</button></td>
                </tr> 
                })}
                
            </tbody>
        </table>

        {addprod && <div className="container my-3">
                <form onSubmit={onSubmit}>
                    <h3>Update Product :  {uniqueid} {prodname}</h3>
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
                    <p>Reupload Images Before Procced : </p>
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
                    <button type="button" className='btn btn-primary' onClick={updateproduct}>Update</button>
                </div>
                </form>
                <div className="container text-center" style={{color:'red'}}>
                    <p>Images should be in 1:1 for better view</p>
                    <p>Upload in high quality</p>
                    <p>Every should be in every angle of product</p>
                </div>
                </div>}
        
    
    </>
  )
}

export default Products