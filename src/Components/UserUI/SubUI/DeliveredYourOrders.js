import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import YourOrderDetail from '../MiniCompo/YourOrderDetail'
function DeliveredYourOrders() {
  const [products,setProducts]= useState(null);
  const [cookies,setCookies] = useCookies(['user']);
  
  async function fetch(){
    const formdata = new FormData();
    formdata.append('uuid',cookies.apikey);
    const res = await axios.post('http://127.0.0.1:8000/products/yourordes/',formdata,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
    
    setProducts(res.data.response)
  }
  useEffect(()=>{
    try{
        fetch();

        
    }catch(error){
        console.log(error);
    }
    
},[])
  return (
    <>
       <div className="div" style={{width:'80%'}}>
            {products && products.map((element,index)=>{
                {console.log('testing',element)}
                if(element.delstatus==="delivered"){
                  return <YourOrderDetail data={element}/>
                }
            })}
        </div>
    </>
  )
}

export default DeliveredYourOrders