import React, { useEffect, useState } from 'react'
import Rating from '../Products/MiniCompoProduct/Rating';

function ProductItem(props) {
  const numbers = [ 1, 2, 3, 4,5];
  const handleClick =()=>{
    
    props.setproduct(props.data);
    props.setstate(false);
  }
  const addcart =()=>{
    const formdata = new FormData();
    formdata.append('productid',props.data.uniqueid);
  }
  return (
    <>
    {/* <h5>Result</h5>
      {console.log(props.data)}
       <p>{props.data[0].name}</p> */}
       {/* {console.log(props.data[0].name)} */}
       <div className="div" style={{height:'16rem',display:'flex',border:'1px solid black',margin:'10px 0 10px 10px'}} onClick={handleClick}>
          <div className="imageDiv" style={{width:'20%'}}>
            <img src={"http://127.0.0.1:8000/products"+props.data.image1} alt="" style={{width:'90%',margin:'6% 2% 6% 2%',aspectRatio:'1/1',objectFit:'contain'}}/>
          </div>
          <div className="contentDiv" style={{}}>
            <div className="content" style={{margin:'0% 2% 6% 2%'}}>
              <h5>{props.data.sellername}</h5>
              <h6>{props.data.name}</h6>
              <div className="div" style={{display:'flex',width:'80px'}}>
                <Rating star={props.data.rating}/>
                {/* {numbers.map((element,index)=>{
                  return <p>{element<=props.data.rating?<span className="fa fa-star checked" style={{color:'orange'}}></span>:<span className="fa fa-star"></span>}</p>

                })} */}
                <p> ^{props.data.len_review}</p>
              </div>
              <div className="div" style={{display:'flex'}}>
                <p>&#8377;</p>
                <h3>{props.data.price}</h3>
                <p>+ {props.data.delivertcharge} delivery</p>
                {/* <div className="div">
                  <div class="d-flex justify-content-end" style={{position:'absolute',left:'80%'}}>
                    <div>
                      <button type="button" className='btn btn-primary' onClick={addcart}>Add to Cart</button>
                    </div>
                    
                  </div>
                </div> */}
              </div>
              <div className="div" style={{width:'20rem', height:'4.8rem',overflow:'hidden'}}>
                {props.data.description}
              </div>
            </div>
          </div>
        {/* {props.data[0].name} */}
       </div>
            
    </>
  )
}

export default ProductItem