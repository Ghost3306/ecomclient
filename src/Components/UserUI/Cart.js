import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import cartimage from './svg/emptycart.png'
import { Link } from 'react-router-dom';
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
    <>
        <div className="div" style={{width:'100%',height:'100vh',background:'#f1f3f6',paddingTop:'20px',display:'flex'}}>
            {cart && cart.order_total===0?<div className="container text-center" style={{background:'#fff',width:'80%',height:'80vh',boxShadow:'0px 0px 8px grey',display:'block'}}>
                    <img src={cartimage} style={{width:'250px',position:'absolute',left:'50%',transform:'translate(-50%)'}}/>
                    <h4 style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>It seems like your cart empty</h4>
                    <h6 style={{position:'absolute',top:'60%',left:'50%',transform:'translate(-50%,-50%)'}}>Add items now</h6>
                    <Link style={{position:'absolute',top:'65%',left:'50%',transform:'translate(-50%,-50%)'}} className='btn btn-primary' type="button" to="/">Show Now</Link>
            </div>:console.log()}
            
            <div className="container" style={{width:'100%',height:'auto',background:'#fff'}}>
                <div className="div" style={{display:'flex',height:'10vh'}}>
                    <h3 className='p-3'>Shopping Cart</h3>
                    <h5 style={{position:'absolute',left:'88%',top:'11%'}}>Price</h5>
                </div>
                
            </div>
            <hr/>
            
          

        </div>

        
            
    </>
    
  )
}

export default Cart


// <h4>{cart.order_total}</h4>

// {console.log(cart)}
// <div>{cart && cart.data.map((element,index)=>{

// return <p>{element.productname}</p>
// })}</div>


{/* <div className="d-flex justify-content-start" style={{width:'100%',height:'auto',background:'#f1f3f6',paddingTop:'20px',display:'flex'}}>
            <div className="container" style={{width:'70%',height:'auto',background:'#fff'}}>
                <div className="div" style={{display:'flex',height:'10vh'}}>
                    <h3 className='p-3'>Shopping Cart</h3>
                    <h5 style={{position:'absolute',left:'88%',top:'11%'}}>Price</h5>
                </div>
                <hr/>
            </div>
            <div className="div">
                hello
            </div>
            
        </div>   */}