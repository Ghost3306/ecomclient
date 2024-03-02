import React from 'react'
import axios from 'axios';
function SideBar(props) {
    const price = async(pricetype)=>{
        try{
            const formdata = new FormData();
            formdata.append('input',props.input);
            console.log(props.input);
            formdata.append('price',pricetype)
            formdata.append('page',1)
            const res = await axios.post('http://127.0.0.1:8000/products/pricesearch/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            
            props.setproduct(res.data)

        }catch(error){
            console.log(error);
        }
    }
    const rating = async(rate)=>{
        try{
            const formdata = new FormData();
            formdata.append('input',props.input);
            console.log(props.input);
            formdata.append('rate',rate)
            formdata.append('page',1)
            const res = await axios.post('http://127.0.0.1:8000/products/pricesearch/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            
            props.setproduct(res.data)

        }catch(error){
            console.log(error);
        }
    }
    const norating = async(norate)=>{
        try{
            const formdata = new FormData();
            formdata.append('input',props.input);
            
            console.log(props.input);
            formdata.append('norate',norate)
            formdata.append('page',1)
            const res = await axios.post('http://127.0.0.1:8000/products/pricesearch/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            
            props.setproduct(res.data)

        }catch(error){
            console.log(error);
        }
    }


  return (
    <>
    <div className='container '>
        <div class="d-flex justify-content-evenly my-3">
            <h5>Price : </h5>
            <button className='btn btn-outline-primary' onClick={()=>{price('price')}}>Low-High</button>
            <button className='btn btn-outline-primary' onClick={()=>{price('-price')}}>High-Low</button>
        </div>
        <div class="d-flex justify-content-evenly my-3">
            <h5>Rating : </h5>
            <button className='btn btn-outline-info' onClick={()=>{price('rating')}}>Low-High</button>
            <button className='btn btn-outline-info' onClick={()=>{price('-rating')}}>High-Low</button>
        </div>

        <div class="d-flex justify-content-evenly my-3">
            <h5>Number of Rating : </h5>
            <button className='btn btn-outline-dark' onClick={()=>{price('len_review')}}>Low-High</button>
            <button className='btn btn-outline-info mx-2' onClick={()=>{price('-len_review')}}>High-Low</button>
        </div>
        
    </div>
    </>
  )
}

export default SideBar