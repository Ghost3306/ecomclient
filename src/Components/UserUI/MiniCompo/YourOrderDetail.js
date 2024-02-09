import React, { useEffect, useState } from 'react'

function YourOrderDetail(props) {
    const [det,setDet]=useState(null);
    useEffect(()=>{
        console.log('details',props.datax);
        setDet(props.data)
    },[])
  return (
    <>
    {det &&<div class="card text-center" style={{width:'100%',marginBottom:'2%'}}>
        <div class="card-header">
            <div class="d-flex bd-highlight " style={{height:'50px'}}>
                <div class="p-1 bd-highlight mx-1">
                    <p>ORDER PLACED<br/>5 Jan 2024</p>     
                </div>
                <div class="p-1 bd-highlight mx-1">      
                    <p>TOTAL<br/>&#8377; 550</p> 
                </div>
                <div class="p-1 bd-highlight mx-1">
                    <p>SHIP TO<br/>Lalit Rawool</p>
                </div>
                
                <div class="ms-auto  bd-highlight" >
                    <button type="button" className='btn btn-outline-dark btn-sm'>view</button>
                    <p>ORDER ID : #875255F58</p>
                    
                </div>
                
            </div>
        </div>
        <div class="card-body">
        <div class="d-flex">
            <div class="flex-shrink-0">
                <img src={"http://localhost:8000/products"+det.productimage} alt="..." style={{width:'100px',height:'100px',objectFit:'contain'}}/>
            </div>
            <div class="p-3 flex-grow-1 ms-3">
                <h6>{det.product}</h6>
                <h6>Quantity : {det.quantity}</h6>
            </div>
            </div>
        </div>
        
    </div>}
    </>
    
  )
}

export default YourOrderDetail