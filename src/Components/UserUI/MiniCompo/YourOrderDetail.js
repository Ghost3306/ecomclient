import React, { useEffect, useState } from 'react'
import accept from './PNG/accept.png'
import disatching from './PNG/dispatching.png'
import intransit from './PNG/intransit.png'
import delivered from './PNG/delivered.png'
import axios from 'axios'
function YourOrderDetail(props) {
    const [det,setDet]=useState(null);
    const [del ,setdel] = useState(false)
    const [color, setColor] = useState({});
    useEffect(()=>{
        
        setDet(props.data)
        if(props.data.delstatus==='delivered'){
            const newJsonData = {
                h1: 'green',
                h2: 'green',
                h3: 'green'
              };
            setColor(newJsonData);
        }else if(props.data.delstatus==='intransit'){
            const newJsonData = {
                h1: 'green',
                h2: 'green',
                h3: 'red'
              };
            setColor(newJsonData);
        }else if(props.data.delstatus==='cancelled'){
            const newJsonData = {
                h1: 'red',
                h2: 'red',
                h3: 'red'
              };
            setColor(newJsonData);
        }else if(props.data.delstatus==='dispatching'){
            const newJsonData = {
                h1: 'green',
                h2: 'red',
                h3: 'red'
              };
            setColor(newJsonData);
        }
        
    },[])
    const onClick= async()=>{
        try{
            const formdata = new FormData()
            formdata.append('uid',props.data.uid);
            const res = await axios.post('http://127.0.0.1:8000/products/cancelorder/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(res.data);
            setTimeout(() => {
                props.fetch();
            }, 500);
            if(res.data.status==='200'){
                setTimeout(() => {
                    setdel(false)
                }, 200);
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
    {det &&<div className="card text-center" style={{width:'100%',marginBottom:'2%'}}>
        <div className="card-header">
            <div className="d-flex bd-highlight " style={{height:'50px'}}>
                <div className="p-1 bd-highlight mx-1">
                    <p>ORDER PLACED<br/>{det.date}</p>     
                </div>
                <div className="p-1 bd-highlight mx-1">      
                    <p>TOTAL<br/>&#8377; 550</p> 
                </div>
                <div className="p-1 bd-highlight mx-1">
                    <p>SHIP TO<br/>{det.name}</p>
                </div>
                {det.delstatus==='intransit' || det.delstatus==='delivered'?<div className="p-1 bd-highlight mx-1">
                    <p>COURIER<br/>{det.couriername}</p>
                </div>:console.log()}
                
                <div className="ms-auto  bd-highlight" >
                {props.data.delstatus==='intransit' || props.data.delstatus==='accepted' || props.data.delstatus==='dispatching'?<button className="btn btn-primary btn-sm" type="button"  onClick={()=>{setdel(true)}}>Cancel</button>:console.log()}

                    <p>ORDER ID : {det.uid.toUpperCase()}</p>
                    
                </div>
                
            </div>
        </div>
        <div className="card-body">
        <div className="d-flex">
            <div className="flex-shrink-0">
                <img src={"http://localhost:8000/products"+det.productimage} alt="..." style={{width:'100px',height:'100px',objectFit:'contain'}}/>
            </div>
            <div className="p-3 flex-grow-1 ms-3">
                <h6>{det.product}</h6>
                <h6>Quantity : {det.quantity}</h6>
                <h6>Status : {det.delstatus}</h6>
                <div className="container" style={{display:'flex',position:'relative',left:'50%',transform:'translate(-35%)'}}>
                    <img style={{width:'50px'}} src={accept}  srcset="" /><h5 style={{color:color.h1}}>----------&#8594;</h5>
                    <img style={{width:'50px'}} src={disatching} alt=""/><h5 style={{color:color.h2}}>-----------&#8594;</h5>
                    <img style={{width:'50px'}} src={intransit} alt="" /><h5 style={{color:color.h3}}>-----------&#8594;</h5>
                    <img style={{width:'50px'}} src={delivered} alt=""  />
                </div>
            </div>
            </div>
        </div>
      
        
    </div>}
   {del && <div className="container" style={{position:'absolute',top:'20%',left:'20%',background:'#fff',width:'300px',height:'200px',display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid black'}}>
    <h5 style={{marginRight:'20px' }}>Are you sure want cancel order</h5>
                <button type="button" className='btn btn-danger' onClick={onClick} style={{marginRight:'20px' }}>Yes</button>
                <button type="button" className='btn btn-dark btn-lg'  data-bs-dismiss="offcanvas" aria-label="Close" onClick={()=>{setdel(false)}}>Cancel</button>
                
    </div>}
    </>
    
  )
}

export default YourOrderDetail