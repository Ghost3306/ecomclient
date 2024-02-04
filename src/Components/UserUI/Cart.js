import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import cartimage from './svg/emptycart.png'
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import PlaceItem from './PlaceItem';
function Cart() {
    const [cookie,setCookie] = useCookies(['user']);
    const [cart,setCart] = useState(null);
    const [cartid,setid] = useState(null);
    const [place,setPlace] = useState(false)

    async function setcart(){
        const formdata = new FormData();
        formdata.append('useruid',cookie.apikey);
        const res = await axios.post('http://127.0.0.1:8000/users/cart/',formdata,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log('cart set');
        setCart(res.data)
    }
    useEffect(()=>{
        
        try{
            console.log('useeffect');
            setcart();
  
        }catch(error){
            console.log(error);
        }
    },[cartid])
  return (
    <>
        {!place && <div className="div" style={{width:'100%',height:'auto',background:'#f1f3f6',paddingTop:'20px',display:'flex'}}>
            {cart && cart.order_total===0?<div className="container text-center" style={{background:'#fff',width:'80%',boxShadow:'0px 0px 8px grey',display:'block'}}>
                    <img src={cartimage} style={{width:'250px',position:'absolute',left:'50%',transform:'translate(-50%)'}}/>
                    <h4 style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>It seems like your cart empty</h4>
                    <h6 style={{position:'absolute',top:'60%',left:'50%',transform:'translate(-50%,-50%)'}}>Add items now</h6>
                    <Link style={{position:'absolute',top:'65%',left:'50%',transform:'translate(-50%,-50%)'}} className='btn btn-primary' type="button" to="/">Show Now</Link>
            </div>:console.log()}
            
            {cart && cart.total!==0?<div className="container" style={{width:'100%',background:'#fff',height:'100%'}}>
            <Link to="/" className='btn btn-outline-primary my-2'>Back</Link>
                <div className="div" style={{display:'flex'}}>
                    
                    <h3 className='p-3'>Shopping Cart</h3>
                    <h5 style={{position:'absolute',left:'88%',top:'11%'}}>Price</h5>
                    
                </div>
                <hr />
                <div className="div" style={{height:'auto'}} >
                    {cart && cart.data.map((element,index)=>{
                       
                        return <CartItem key={index} data={element}  setid={setid} setcart={setcart}/> 
                    })}
                </div>
            {cart && cart.total!==0 ? <div className="div" style={{marginBottom:'10rem'}}>
                    <h4>Order Subtotal: </h4>
                    <h6>Price ({cart.len} items) : <strong>&#8377;</strong>{cart.order_total}</h6>
                    <h6>Delivery : {cart.delivery}</h6>
                    <hr />
                    <h6>Total : <strong>&#8377;</strong> {cart.total} </h6>
                    <button type="button" onClick={()=>{setPlace(true)}} className='btn btn-primary'>Place your order</button>

                </div>:console.log()}
            </div>:console.log()}
            
        </div>}
        
        {place && <PlaceItem setPlace={setPlace} cart={cart}/>}
            
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