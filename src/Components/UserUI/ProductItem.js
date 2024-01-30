import React from 'react'

function ProductItem(props) {
  return (
    <>
    {/* <h5>Result</h5>
      {console.log(props.data)}
       <p>{props.data[0].name}</p> */}
       {/* {console.log(props.data[0].name)} */}
       <div className="div" style={{height:'16rem',display:'flex',border:'1px solid black'}}>
          <div className="imageDiv" style={{width:'20%'}}>
            <img src="https://m.media-amazon.com/images/I/91fonhAtoAL._SL1500_.jpg" alt="" style={{width:'90%',margin:'6% 2% 6% 2%'}}/>
          </div>
          <div className="contentDiv" style={{}}>
            <div className="content" style={{margin:'6% 2% 6% 2%'}}>
              <p>{props.data[0].name}</p>
            </div>
          </div>
        {/* {props.data[0].name} */}
       </div>
    
    </>
  )
}

export default ProductItem