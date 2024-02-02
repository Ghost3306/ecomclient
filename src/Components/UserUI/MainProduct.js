import React from 'react'

function MainProduct(props) {
  return (
    <>
    {console.log(props)}
        <div className="container my-4" style={{border:'1px solid black',width:'185vh',height:'auto',display:'flex'}}>
            <div className="images" style={{width:'90vh',border:'1px solid black',display:'flex',alignItems:'center',justifyContent:'center'}}>   
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>
                <div class="carousel-inner" style={{padding:'15px',height:'80vh'}}>
                  <div class="carousel-item active">
                    <img src={"http://127.0.0.1:8000/products"+props.data.image1} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={"http://127.0.0.1:8000/products"+props.data.image2} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={"http://127.0.0.1:8000/products"+props.data.image3} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={"http://127.0.0.1:8000/products"+props.data.image4} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={"http://127.0.0.1:8000/products"+props.data.image5} class="d-block w-100" alt="..."/>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>

            </div>
            <div className="content text-center"  style={{width:'115vh',border:'1px solid black'}}>
                <h5 className='' style={{color:'#191970',marginTop:'20px'}}>{props.data.sellername}</h5>
                <h5 style={{fontSize:'20px',fontWeight:'500',marginTop:'8px'}}>{props.data.name}</h5>
                <h4 style={{marginTop:'8px'}}>&#8377; {props.data.price}</h4>
                <p>Price including all taxes</p>
            </div>
        </div>
    </>
    
  )
}

export default MainProduct