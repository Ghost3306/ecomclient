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
                <button type="button" onClick={props.close}>x</button>
            </div>
        </div>
        <div class="d-flex justify-content-around">
            <h5>product id: {props.element.productid}</h5>
            <h5 style={{margin:'0 2vh 0 2vh'}}>{props.element.product}</h5>
            <h5>order on: {props.element.date}</h5>
        </div>
        </div>
    </>
  )
}

export default OrderDetCanvas