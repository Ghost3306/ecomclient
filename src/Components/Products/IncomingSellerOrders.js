import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
function IncomingSellerOrders() {
    async function placedorders(){
        try{
            const formdata = new FormData();
            formdata.append('seller',cookie.sellerapikey)
            const res = await axios.post('http://127.0.0.1:8000/products/sellerorders/',formdata,{
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
            console.log('orders',orders.response);
        }


    },[])
  return (
    <>
        {/* {orders && } */}
        <table class="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Customer</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">View</th>
                </tr>
            </thead>
            <tbody>
                {orders.response && orders.response.map((element,index)=>{
                    return <tr key={index}>
                        <th scope="row">{element.productid}</th>
                        <td>{element.product}</td>
                        <td>{element.name}</td>
                        <td>{element.quantity}</td>
                        <td>{element.price}</td>
                        <td><button  class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">View</button></td>

                        <div class="offcanvas offcanvas-bottom" style={{height:'70vh',background:'#fff'}} tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                                <div class="offcanvas-header">
                                    <h5 class="offcanvas-title" id="offcanvasBottomLabel">{element.product}</h5>
                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body small">
                                    
                                </div>
                        </div>
                    </tr>
                    
                })}
                
            </tbody>
        </table>
    </>
    
  )
}

export default IncomingSellerOrders