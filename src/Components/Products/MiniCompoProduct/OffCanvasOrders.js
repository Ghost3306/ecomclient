import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Cookies, useCookies } from 'react-cookie';

function OffCanvasOrders(props) {
    const [order,setOrder] = useState(null);
    const [delstatus,setDelstatus] = useState('accept');
    const [selectedOption, setSelectedOption] = useState('');
    const [courier,setCourier]= useState('courier');
    const [cookie,setCookie] = useCookies(['user']);
    const[msg,setmsg] = useState(null)
    const handleChange = (event) => {
        if(event.target.value==='delivered' && order.delstatus!=='intransit'){
            setTimeout(() => {
                setmsg('Wrong state change')
            }, 3000);
        }else if(event.target.value==='intransit' && order.delstatus!=='dispatching'){
            setTimeout(() => {
                setmsg('Wrong state change')
            }, 3000);
        }else{
            setSelectedOption(event.target.value);
        }
        
    }
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

    const procced = async ()=>{
        try{
            if(selectedOption!=='Select'){
            const formdata = new FormData()
            formdata.append('state',selectedOption);
            formdata.append('uid',order.uid)
            formdata.append('courier',courier)
            const res = await axios.post('http://127.0.0.1:8000/products/changestate/',formdata,{
                headers:{
                    'Content-Type':'multipart-formdata'
                }
            })
            if(res.data.status==='200'){
                setTimeout(()=>{
                    props.setOrders()
                    
                },100)
                props.setdiv(false);
                console.log('200');
            }
            
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
    
        fetch();
        
    },[])

   const accept = async()=>{
    try{
        if(selectedOption!=='Select'){
        const formdata = new FormData()
        console.log(delstatus);
        formdata.append('state',delstatus);
        formdata.append('uid',order.uid)
        formdata.append('courier',courier)
        const res = await axios.post('http://127.0.0.1:8000/products/changestate/',formdata,{
            headers:{
                'Content-Type':'multipart-formdata'
            }
        })
        if(res.data.status==='200'){
            setTimeout(()=>{
                props.setOrders()
                
            },100)
            props.setdiv(false);
            console.log('200');
        }
        
        }
    }catch(error){
        console.log(error);
    }
   }
  return (
    <>
    
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
                setDelstatus('accept')
                accept()
            }}>Accept</button>
        </div>
        
        :<div className="container">
            {msg && <p>{msg}</p>}
            <h6>ID : {order.productid}</h6>
            <h5>{order.product}</h5>
            <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight">
                    <h6>Change state : </h6>
                </div>
                <div class="p-2 bd-highlight">
                    <select class="form-select" value={selectedOption} onChange={handleChange} aria-label="Default select example">
                        <option selected>Select</option>
                        <option value="dispatching">Dispatching</option>
                        <option value="intransit">Intransit</option>
                        <option value="delivered">Delivered</option>
                        
                    </select>
                </div>
                {selectedOption ==='intransit'?<div class="p-2 bd-highlight">
                    <label htmlFor="courier">Enter Courier Name : </label>
                    <input type="text" name="" id="courier" onChange={(e)=>{setCourier(e.target.value)}} />
                </div>:console.log()}
                <div class="p-2 bd-highlight">
                    <button type="button" className='btn btn-outline-info' onClick={procced}>Procced</button>
                </div>
            </div>
        </div>


        }
       
    </div>}
    
    </>
  )
}

export default OffCanvasOrders