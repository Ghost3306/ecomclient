import React from 'react'

function OrderDetCanvas(props) {
  return (
    <>
        <div className="container" style={{position:'absolute',top:'11%',left:'25%',transform:'translate(-25% -25%',width:'120vh',height:'80vh',border:'1px solid black',background:'#fff'}}>
        <div class="d-flex bd-highlight">
            <div class="p-2 w-100 bd-highlight">
                <h5>Order Details</h5>
            </div>
            <div class="p-2 flex-shrink-1 bd-highlight">
                <button type="button" class="btn-close" aria-label="Close" onClick={props.close}></button>
            </div>
        </div>
        <div class="d-flex justify-content-around">
            <h5>product id: {props.element.productid}</h5>
            <h5 style={{margin:'0 2vh 0 2vh'}}>{props.element.product}</h5>
            <h5>order on: {props.element.date}</h5>
        </div>
        <h5 className='my-3'>Address</h5>
        <div class="d-flex justify-content-around my-3">
            
            <h6>State: {props.element.state}</h6>
            <h6 >District: {props.element.district}</h6>
            <h6>Taluka: {props.element.taluka}</h6>
            <h6>City: {props.element.city}</h6>
            <h6>Landmark: {props.element.landmark}</h6>
            <h6>Pincode: {props.element.pincode}</h6>
        </div>
        <div class="d-flex flex-row bd-highlight mb-3 my-3">
            <h5 className='p-2 bd-highlight'>Customer : </h5>
            <h5 className='p-2 bd-highlight'>{props.element.name}</h5>
            <h6 className='p-2 bd-highlight'>Change state date: {props.element.approxdelivery}</h6>
        </div>
        <div class="d-flex justify-content-evenly">
            <img src={"http://127.0.0.1:8000/products"+props.element.productimage} style={{width:'25vh',height:'25vh',objectFit:'contain'}}/>
            <div class="d-flex flex-column bd-highlight mb-3">
                <div class="p-1 bd-highlight">
                    <h6>Price &#8377;{props.element.price}</h6>
                </div>
                <div class="p-1 bd-highlight">
                    <h6>Delivery Charge &#8377;{props.element.delivery}</h6>
                </div>
                <div class="p-1 bd-highlight">Quantity: {props.element.quantity}</div>
                <div class="p-1 bd-highlight">Total Price: &#8377;{props.element.totalprice}</div>
                <div class="p-1 bd-highlight">Payment: {props.element.payment}</div>
                <div class="p-1 bd-highlight">Couriername: {props.element.couriername}</div>
                <div class="p-1 bd-highlight">Delivery Status: {props.element.delstatus}</div>
            </div>
        </div>
        </div>
    </>
  )
}


// uid = models.CharField(max_length=255)
//     
//     
//     
//     
//     
//    
//    
//    
//     
//     payment = models.CharField(max_length=50)
//     totalprice = models.IntegerField()
//     couriername = models.CharField(max_length=255,default= 'courier' )
//     delstatus = models.CharField(max_length=100, default='None')
export default OrderDetCanvas