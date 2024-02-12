import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import OffCanvasOrders from './MiniCompoProduct/OffCanvasOrders';
function IncomingSellerOrders() {
    const [off,setOff]=useState(false);
    const [orderid,setid]=useState(null);
    const setdiv=()=>{
        
        if(off){
            setOff(false);
        }else{
            setOff(true)
        }
    }
    async function placedorders(){
        try{
            const formdata = new FormData();
            formdata.append('seller',cookie.sellerapikey)
            const res = await axios.post('http://127.0.0.1:8000/products/sellerordersNone/',formdata,{
                headers:{
                    "Content-Type":'multipart/form-data',
                }
            })
            
            setOrders(res.data)
        }catch(error){
            console.log(error);
        }
    }
    const [orders,setOrders]= useState(null);
    const[cookie,setCookie] =useCookies(['user']);
    const navigate = useNavigate()
    useEffect(()=>{
        if(cookie.sellerapikey==='logout'){
            navigate('sellerlogin');
        }else{
            placedorders();
            console.log('orders placed');
            
        }


    },[])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  return (
    <>
       <h5>Incoming Orders</h5>
        {orders && <table className="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Customer</th>
                <th scope="col">Quantity</th>
                <th scope="col">delivery status</th>
                <th scope="col">Price</th>
                <th scope="col">View</th>
                </tr>
            </thead>
            <tbody>
                {orders && orders.response.map((element,index)=>{
                    
                    return <tr key={index}>
                       
                        <th scope="row">{element.productid}</th>
                        <td>{element.product}</td>
                        <td>{element.name}</td>
                        <td>{element.quantity}</td>
                        <td>{capitalizeFirstLetter(element.delstatus)}</td>
                        <td>{element.price}</td>
                        <td><button  className="btn btn-primary" type="button" onClick={()=>{
                            setid(element.uid);
                            setdiv(true);
                        }} >View</button></td>

                        
                    </tr>
                    
                })}
                
            </tbody>
        </table>}
        {off && <div className="div" style={{position:'relative',top:'50%',left:'60%',transform:'translate(-50%,-50%)',background:'#fff'}}>
            <OffCanvasOrders setdiv={setdiv} setOrders={placedorders} id={orderid}/>
        </div>}
    </>
    
  )
}

export default IncomingSellerOrders