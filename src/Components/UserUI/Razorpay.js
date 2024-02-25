import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import useRazorpay from "react-razorpay";
function Razorpay(props) {
    const [order_id,setData] =useState(null);
    const [amount,setamount] =useState(null);
    const [cookies,setCookies] = useCookies(['user']);
    const [Razorpay] = useRazorpay();
    useEffect(()=>{
        console.log('type',typeof(props.amount));
        console.log(props.amount);
    },[])

    const completepayment =(payment_id,order_id,signature)=>{
        const formdata = new FormData()
        formdata.append('payment_id', payment_id);
        formdata.append('order_id',order_id);
        formdata.append('amount',props.amount)
        formdata.append('signature',signature);
        formdata.append('userid',props.userid);
        formdata.append('sellerid',props.sellerid)
        console.log('completing order');
        axios.post('http://127.0.0.1:8000/payment/complete/', formdata)
          .then(function (response) {
            console.log('order details',response.data);
            if(response.data.status==='200'){
                props.placeorder();
            }else{
                props.setmsg('order failed');
                console.log('order failed');
            }
            
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }
    const razorpaypayment =()=>{
        console.log(props.amount);
        const formdata = new FormData()
        formdata.append('amount', props.amount*100);
        console.log('type of',typeof(props.amount));
        formdata.append('currency','INR')
        axios.post('http://127.0.0.1:8000/payment/create/', formdata)
          .then(function (response) {
            console.log(response);
            console.log('orderid',response.data.orderdata.id);
            const order_id_no = response.data.orderdata.id;
            
            const options = {
                key: "rzp_test_rJDZViv0nqzsiy", 
                
                amount: props.amount*100, 
               
                currency: "INR",
                name: "Online Bazaarpeth",
                description: "Ecom platform",
                image: "https://example.com/your_logo",
                order_id: order_id_no, 
                handler: function (response) {
                    console.log(response);
                      // alert(response.razorpay_payment_id);
                      // alert(response.razorpay_order_id);
                      // alert(response.razorpay_signature);
                       completepayment(
                        response.razorpay_payment_id,
                        response.razorpay_order_id,
                        response.razorpay_signature
                       ) 
                    },
                    prefill: {
                      name: "Lalit Rawool",
                      email: "lalit@gmail.com",
                      contact: "9999999999",
                    },
                    notes: {
                      address: "Razorpay Corporate Office",
                    },
                    theme: {
                      color: "#3399cc",
                    },
                  };
                
                  const rzp1 = new Razorpay(options);
                
                  rzp1.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                  });
                
                  rzp1.open();

          })
          .catch(function (error) {
            console.log(error);
          });
          
          
    }

    
  return (
    <>
    
    <div className='container'>
        <h5>Payment</h5>
        <h6>Rupee {props.amount}</h6>
        <button type="button" onClick={razorpaypayment} className='btn btn-outline-primary btn-lg'>Pay now</button>
    </div>
    </>
  )
}

export default Razorpay