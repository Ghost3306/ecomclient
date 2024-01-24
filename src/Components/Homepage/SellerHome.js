import React, { useEffect } from 'react'
import AddProduct from '../Products/AddProduct'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../Authentication/AuthContext';

function SellerHome() {
  const [cookie,setCookie] = useCookies(['user'])
  const navigate = useNavigate();
  useEffect(()=>{
    if(cookie.email==='logout'){
      navigate('/sellerlogin')
    }else if(!cookie.email){
      navigate('/sellerlogin')
    }
  },[])


  return (
    <>
        <AddProduct/>  
    </>
  )
}

export default SellerHome