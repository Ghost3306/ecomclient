import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OffCanvasOrders(props) {
    const [order,setOrder] = useState(null);
    const [delstatus,setDelstatus] = useState('');
    async function fetch(){
        const formdata = new FormData();
        formdata.append('uid',props.id)
        try{
            const res = await axios.post('http://127.0.0.1:8000/products/placeorder/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            
            setOrder(res.data[0])
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
    
        fetch();
        
    },[])

    const changeDelStatus=()=>{

    }
  return (
    <>
    {order && console.log(order.product)}
    
    {order && <div style={{width:'150vh',height:'65vh',border:'1px solid black',}}>
        <div class="d-flex bd-highlight mb-3">
            <div class="ms-auto p-2 bd-highlight">
                <button type="button" onClick={()=>{props.setdiv(false)}}>x</button>
            </div>
        </div>
        {order.delstatus==='None'?
        <div className="container" style={{display:'flex'}}>
            <h5>You have to accept order before procedding : </h5>
            <button type="button" className='btn btn-primary mx-3' onClick={()=>{
                setDelstatus('accept');
                changeDelStatus()
            }}>Accept</button>
        </div>
        
        :console.log()

        }
       
    </div>}
    </>
  )
}

export default OffCanvasOrders