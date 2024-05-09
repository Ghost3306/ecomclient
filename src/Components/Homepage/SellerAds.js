import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import shopkeep from './shopkeeper.png'
import customer from './customer-care.png'
import noextra from './calculator.png'
import nationwide from './global-research.png'
import secure from './credit-card.png'
import lowcost from './low-price.png'
function SellerAds() {
    const [classlg,setnm] = useState('btn btn-primary mx-2');
    const [classreg,setreg] = useState('btn btn-outline-primary mx-2');
    const [color,setcolor] = useState('#fff');
    const [color1,setcolor1] = useState('blue');
    const onhover = ()=>{
        setnm('btn btn-outline-primary mx-2');
        setcolor('blue');
        setcolor1('#fff');
    }

    useEffect(()=>{
        document.title = 'Seller Homepage';
    },[])
    const onhoverout = ()=>{
        setcolor('#fff');
        setnm('btn btn-primary mx-2');
        setcolor1('blue');
    }
  return (
    <>
        <div className="maindiv">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link class="navbar-brand mx-4" to="/"><h4>Online Bazaarpeth</h4></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                </ul>
                <span class="navbar-text">
                    <div className="container">
                        <Link  className={classreg} style={{color:color1}} onMouseOver={onhover} onMouseOut={onhoverout} to ="/registerseller">Register</Link>
                        <Link className={classlg} style={{color:color}} onMouseOver={onhover} onMouseOut={onhoverout} to ="/sellerlogin">Login</Link>
                    </div>
                    </span>
                </div>
            </div>
            </nav>
            <section>
                <div className="container my-2">
                    <div className="div" style={{display:'flex',width:'100%',borderBottom:'1px solid black'}}>
                        <div style={{width:'50%',paddingTop:'90px',paddingLeft:'20px'}}>
                            <h1>Sell Anywhere with </h1>
                            <h1 style={{color:'#1976D2'}}><strong>Online Bazaarpeth</strong></h1>
                        </div>
                        <div style={{width:'50%'}}>
                            <img style={{height:'300px'}} src={shopkeep} alt="" srcset="" />
                        </div>
                    </div>
                    <div className="div2 my-4" style={{width:'100%',height:'150px',borderRadius:'8px',boxShadow: '1px 3px 25px 0px rgba(111,111,111,0.53)',paddingTop:'30px',paddingLeft:'10px'}}>
                    <div className="d-flex justify-content-evenly" >
                        <div className="div text-center" >
                            <img src={secure} id='cloth' style={{width:'50px'}}/>
                            <h6 className='my-2' style={{color:'#1976D2'}}>Secure & Regular payments</h6>
                        </div>
                        <div className="div text-center" >
                            <img src={lowcost} id='cloth' style={{width:'50px'}}/>
                            <h6 className='my-2' style={{color:'#1976D2'}}>Low cost of doing business</h6>
                        </div>
                        <div className="div text-center" >
                            <img src={customer} id='cloth' style={{width:'50px'}}/>
                            <h6 className='my-2' style={{color:'#1976D2'}}>One click Seller Support</h6>
                        </div>
                        <div className="div text-center" >
                            <img src={noextra} id='cloth' style={{width:'50px'}}/>
                            <h6 className='my-2' style={{color:'#1976D2'}}>No extra cost</h6>
                        </div>

                        <div className="div text-center" >
                            <img src={nationwide} id='cloth' style={{width:'50px'}}  />
                            <h6 className='my-2' style={{color:'#1976D2'}}>Nation wide available</h6>
                        </div>
        
       
                         </div>
                    </div>
                </div>
            </section>
        </div>
        
    </>
  )
}

export default SellerAds