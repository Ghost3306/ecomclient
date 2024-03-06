import React from 'react'
import error from './error.jpg'
import { useNavigate } from 'react-router-dom';

function InternalServer() {
    const navigate = useNavigate()
    const refreshPage=() =>{
        // window.location.reload(false);
        navigate('/')
      }
  return (
    <>
    <div className="div" style={{width:'100%',height:'100vh',backgroundColor:'#8BC6EC',backgroundImage:'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',}}>
        <div className="div" style={{position:'absolute',top:'40%',left:'50%',transform:'translate(-50%,-50%)',display:'block',justifyContent:'center',alignItems:'center'}}>
        <div className="div" style={{textAlign:'center'}}>
        <h1 style={{fontSize:'250px',fontWeight:'700',background:`url(${error}) 50% 50%`,backgroundSize:'cover',WebkitTextFillColor:'transparent',WebkitBackgroundClip:'text'}}>500</h1>
        </div>
        <div className="div" style={{textAlign:'center'}}>
            <p style={{fontSize:'20px'}}>Internal Server Error. Our team is on it! We apologize for the inconvenience. </p>
            <p style={{fontSize:'20px'}} >Please try again later.</p>
        </div>
        <div className="div" style={{position:'absolute',left:'50%',transform:'translate(-50%)'}}>
            <button type="button" className='btn btn-primary btn-lg'  style={{width:'225px',borderRadius: '25px 25px 25px 25px'}} onClick={refreshPage}>Refresh</button>
        </div>
        </div>
        
    </div>
    </>
  )
}

export default InternalServer