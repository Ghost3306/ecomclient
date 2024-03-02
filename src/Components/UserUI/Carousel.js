import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
function Carousel() {
    const [data,setBanners] = useState(null);
    async function fetch(){
        const formdata = new FormData()
        try{
            const res = await axios.post('http://127.0.0.1:8000/seller/showbanner/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            setBanners(res.data);
        }catch(error){
            console.log(error);
        }
        
        
    }
    useEffect(()=>{
        try{
            fetch();
        }catch(error){
            console.log(error);
        }
    },[])
  return (
    <>
    {data && console.log(data.banners.length)}
        {data && <div  id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={"http://127.0.0.1:8000/seller"+data.banners[0].banner} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    
                </div>
                </div>
                {data.banners && data.banners.slice(1).map((element,index)=>{
                    return <div className="carousel-item " key={index}>
                    <img src={"http://127.0.0.1:8000/seller"+element.banner}  className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                       
                    </div>
                    </div>
                })}

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>}
    </>
  )
}

export default Carousel