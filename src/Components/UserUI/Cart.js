import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
function Cart() {
    const [cookie,setCookie] = useCookies(['user']);
    const [cart,setCart] = useState(null);
    useEffect(()=>{
        const formdata = new FormData();
        formdata.append('useruid',cookie.apikey);
        async function setcart(){
            const res = await axios.post('http://127.0.0.1:8000/users/cart/',formdata,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log(res.data);
            setCart(res.data)
        }
        try{
            setcart();
            // console.log(cart);
        }catch(error){
            console.log(error);
        }
    },[])
  return (
    <div>{cart.map((element,index)=>{
        return <p>{element.productname}</p>
    })}</div>
  )
}

export default Cart