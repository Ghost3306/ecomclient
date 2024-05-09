import React, { useEffect } from 'react'
import AddProduct from '../Products/AddProduct'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../Authentication/AuthContext';

function SellerHome() {
  const [cookie,setCookie] = useCookies(['user'])
  const navigate = useNavigate();
  useEffect(()=>{
    document.title = 'Seller Homepage';
    document.body.style.overflow = "visible";
    if(cookie.sellerapikey==='logout'){
      navigate('/sellerlogin')
    }else if(!cookie.sellerapikey){
      navigate('/sellerlogin')
    }
  },[])


  return (
    <>
      <div className="div" style={{overflow:'auto',height:'auto'}}>
        <AddProduct/> 
      </div>
         
    </>
  )
}

export default SellerHome