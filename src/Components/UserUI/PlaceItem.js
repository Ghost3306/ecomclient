import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie';
import CartItem from './CartItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Razorpay from './Razorpay';
function PlaceItem(props) {
    const [cookies,setCookies] = useCookies(['user'])
    const [fullname, setfullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [taluka, setTaluka] = useState('');
    const [cityVillage, setCityVillage] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [msg, setmsg]= useState(null);
    const [price,setprice] = useState(0);

    const navigate = useNavigate()
    useEffect(()=>{
        setfullname(cookies.name);
        setEmail(cookies.email);
        setPhone(cookies.phone)
        const am = parseInt(props.cart.order_total)
        setprice(am)
    },[])
    const handleInputChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
      }

    const placeorder = async()=>{
        const formdata = new FormData();
        formdata.append('uuid',cookies.apikey)
        formdata.append('name',fullname)
        formdata.append('email',email)
        formdata.append('phone',phone)
        formdata.append('state',state)
        formdata.append('district',district)
        formdata.append('taluka',taluka)
        console.log(taluka);
        formdata.append('city',cityVillage)
        formdata.append('landmark',landmark)
        formdata.append('pincode',pincode)
        formdata.append('totalprice',fullname)
        formdata.append('totalprice',props.cart.order_total)
        formdata.append('payment','postpaid')
        try{
            const res = await axios.post('http://127.0.0.1:8000/products/orderplaced/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })
            console.log(res.data);
            if(res.data.status==='200'){
                setmsg(res.data.msg)
                setTimeout(()=>{
                    navigate('/')
                },3000)
            }
        }catch(error){
            console.log(error);
        }
    
    }
    const placeorderbyonline = async()=>{
        const formdata = new FormData();
        formdata.append('uuid',cookies.apikey)
        formdata.append('name',fullname)
        formdata.append('email',email)
        formdata.append('phone',phone)
        formdata.append('state',state)
        formdata.append('district',district)
        formdata.append('taluka',taluka)
        console.log(taluka);
        formdata.append('city',cityVillage)
        formdata.append('landmark',landmark)
        formdata.append('pincode',pincode)
        formdata.append('totalprice',fullname)
        formdata.append('totalprice',props.cart.order_total)
        formdata.append('payment','prepaid')
        try{
            const res = await axios.post('http://127.0.0.1:8000/products/orderplaced/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })
            console.log(res.data);
            if(res.data.status==='200'){
                setmsg(res.data.msg)
                setTimeout(()=>{
                    navigate('/')
                },3000)
            }
        }catch(error){
            console.log(error);
        }
    
    }
  return (
    <>
    <div className="container" style={{marginBottom:'5rem'}}>
        <div class="d-flex flex-row bd-highlight mb-3 my-3">
            <div class="p-2 bd-highlight">
                <button type="button" className='btn btn-primary' onClick={()=>{
                props.setPlace(false)}}>Back</button>
            </div>
              <div class="p-2 bd-highlight">
              <h4>Checkout</h4>
              </div>
        </div>
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" style={{color:'#1565C0 ',fontWeight:'500'}}>Delivery Address
                </button>
                </h2>
                <div   div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        <div className="container">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Full name" value={fullname} aria-label="First name" onChange={(e) => handleInputChange(e, setfullname)}/>
                            </div>
                            
                        </div>
                        <div className="row my-3    ">
                            <div className="col">
                                <input type="email" class="form-control" placeholder="Email eg. abc@gmail.com"  value={email}aria-label="Email" onChange={(e) => handleInputChange(e, setEmail)}/>
                            </div>
                            <div className="col">
                                <input type="number" class="form-control"  placeholder='Phone No. eg. 9604xxxxx8' value={phone} id=""  onChange={(e) => handleInputChange(e, setPhone)}/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col">
                                <input type="text" class="form-control" placeholder="State" aria-label="State" value={state} onChange={(e) => handleInputChange(e, setState)}/>
                            </div>
                            <div className="col">
                                <input type="text" class="form-control" placeholder="District" value={district} aria-label="District" onChange={(e) => handleInputChange(e, setDistrict)}/>
                            </div>
                            <div className="col">
                                <input type="text" class="form-control" placeholder="Taluka" value={taluka} aria-label="Taluka" onChange={(e) => handleInputChange(e, setTaluka)}/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col">
                                <input type="text" class="form-control" placeholder="City/Village" value={cityVillage} aria-label="Landmark" onChange={(e) => handleInputChange(e, setCityVillage)}/>
                            </div>
                            <div className="col">
                                <input type="text" class="form-control" placeholder="Landmark eg. near bus state" aria-label="Landmark" value={landmark} onChange={(e) => handleInputChange(e, setLandmark)}/>
                            </div>
                            <div className="col">
                                <input type="number" class="form-control"  placeholder='Pincode' value={pincode} id="" onChange={(e) => handleInputChange(e, setPincode)}/>
                            </div>
                        </div>


                    </div>
                </div>
                        
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" style={{color:'#1565C0 ',fontWeight:'500'}}>Review Your Order
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div class="accordion-body">
                     
                        {props.cart && props.cart.data.map((element,index)=>{
                            return <CartItem data={element}/>
                        })}
                        {props.cart && <div className="div" style={{marginBottom:'2rem'}}>
                            <h4>Order Subtotal: </h4>
                            <h6>Price ({props.cart.len} items) : <strong>&#8377;</strong>{props.cart.order_total}</h6>
                            <h6>Delivery : {props.cart.delivery}</h6>
                            <hr />
                            <h6>Total : <strong>&#8377;</strong> {props.cart.total} </h6>
                            

                        </div>}
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree" style={{color:'#1565C0 ',fontWeight:'500'}}>Payment</button>
                </h2>
                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div class="accordion-body">
                        <div className="d-flex justify-content-center">
                            {console.log('sellerid',props,props.cart.data[0].sellerid)}
                            <Razorpay placeorder={placeorderbyonline} amount={props.cart.total} sellerid={props.cart.data[0].sellerid}  userid={props.cart.data[0].useruid} setmsg={setmsg}/>
                            <button type="button" className='btn btn-primary' onClick={placeorder}>Cash on Delivery</button>
                        </div>
                        {msg && <h6>{msg}</h6>}
                </div>
            </div>
        </div>
    </div>

    </div>
        
    </>
  )
}

export default PlaceItem