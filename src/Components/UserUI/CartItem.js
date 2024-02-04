import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


function CartItem(props) {
  const numbers = [ 1, 2, 3, 4,5];
  async function deletecart(){
    const formdata = new FormData();
  
    formdata.append('cartid',props.data.id);
    const res = await axios.post('http://127.0.0.1:8000/users/delcart/',formdata,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
    console.log(res.data);
    console.log('delete cart');
    
    
}
    const ondelete = ()=>{
        console.log('delete');
        
        deletecart()
        props.setid(0)
        props.setcart();    
    }
    const onsave = ()=>{
        console.log('save')
    }
  
  return (
    <>
      
       <div className="div" style={{height:'12rem',display:'flex',margin:'10px 0 10px 10px'}} >
          <div className="imageDiv" style={{width:'20%',height:'100%'}}>
            <img src={"http://localhost:8000/products"+props.data.image} alt="" style={{width:'80%',height:'90%',margin:'6% 2% 6% 2%',aspectRatio:'1/1',objectFit:'contain'}}/>
          </div>
          <div className="contentDiv" style={{}}>
            <div className="content" style={{margin:'6% 2% 6% 2%'}}>
             
              <h5>{props.data.productname}</h5>
              <h6>sold by {props.data.sellername}</h6>
              <div className="div" style={{display:'flex'}}>
                {numbers.map((element,index)=>{
                  return <p key={index}>{element<=props.data.rating?<span className="fa fa-star checked" style={{color:'orange'}}></span>:<span className="fa fa-star"></span>}</p>

                })}
                <p> ^{props.data.len_review} </p>
                <div className="div" style={{display:'flex',position:'absolute',  left:'80%'}}>
                
                <p><strong>&#8377;</strong></p>
                <h3>{props.data.price}</h3>
                <p>+ {props.data.delivertcharge} delivery</p>
              </div>
              </div>
            <div className="div" style={{display:'flex',position:'relative',top:'60%',}}>
                <h6>Quntity : {props.data.quantity}</h6>
                <h6 className='' style={{color:'red'}} onClick={ondelete}>Delete</h6>
                <h6 className='mx-3' style={{color:'blue'}} onClick={onsave}>Save for later</h6>

            </div>
                
            </div>
          </div>
               
       </div>
       <hr />
            
    </>
  )
}

export default CartItem