import React, { useState } from 'react'
import YourOrderCompo from './SubUI/YourOrderCompo'
import { Link } from 'react-router-dom'
import DeliveredYourOrders from './SubUI/DeliveredYourOrders';
import CancelledYourOrders from './SubUI/CancelledYourOrders';
import InTransitYourOrders from './SubUI/InTransitYourOrders';

function YourOrders(props) {
    const [divState,setState] = useState('all');
    useState(()=>{
        document.body.style.overflow = "visible";
    },[])
  return (
   <>
    <div className="container" style={{width:'80%',height:'auto',position:'relative',left:'10%',marginTop:'2%',marginBottom:'2%'}}>
        <h4>Your Orders</h4>
        <table className="table" style={{width:'50vh',marginTop:'3%'}}>
            <tbody>
                <tr>
                    <td><Link onClick={()=>{setState('all')}}>Orders</Link></td>
                    <td><Link onClick={()=>{setState('delivered')}} >Delivered</Link></td>
                    <td><Link onClick={()=>{setState('cancelled')}}>Cancelled</Link></td>
                    <td><Link onClick={()=>{setState('intransit')}}>In-Transit</Link></td>
                </tr>
            </tbody>
            
        </table>
            {divState && divState==='all' ?<div className="container">
                    <YourOrderCompo />
                </div>:console.log()}
            {divState && divState==='delivered' ?<div className="container">
                <DeliveredYourOrders/>
            </div>:console.log()}
            {divState && divState==='cancelled' ?<div className="container">
                <CancelledYourOrders/>
            </div>:console.log()}
            {divState && divState==='intransit' ?<div className="container">
                <InTransitYourOrders/>
            </div>:console.log()}
       
    </div>
   
    
   </>
  )
}

export default YourOrders