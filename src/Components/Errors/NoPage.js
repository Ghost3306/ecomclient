import React from 'react'
import notfound from './error (1).png'
import { Link } from 'react-router-dom'
function NoPage() {
  return (
    <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <img src={notfound} alt="" srcset="" style={{width:'250px',position:'absolute',top:'40%',left:'40%',transform:'translate(-40%,-40%)'}} />
      <Link to="/" type="button" className='btn btn-outline-dark btn-lg mx-2' style={{width:'150px',position:'absolute',top:'40%',left:'60%',transform:'translate(-40%,-60%)'}}>HOME</Link>
    </div>
  )
}

export default NoPage