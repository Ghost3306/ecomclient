import React, { useEffect, useState } from 'react'
import YourOrderDetail from '../MiniCompo/YourOrderDetail'
import axios from 'axios';
import { useCookies } from 'react-cookie';
function YourOrderCompo() {
    const [products,setProducts]= useState(null);
    const [cookies,setCookies] = useCookies(['user'])
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
    {/* {products && console.log(products.response)} */}
        <div className="div" style={{width:'80%'}}>
            {products && products.map((element,index)=>{
              
                
                return <div className="div" key={index}><YourOrderDetail fetch={fetch} data={element} state="all"/></div>
            })}
        </div>

    </>
  )
}

export default YourOrderCompo