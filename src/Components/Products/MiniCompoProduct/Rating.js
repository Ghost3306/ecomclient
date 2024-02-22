import React, { useEffect } from 'react'
import './star1.css'
function Rating(props) {
    const stars = new Array(props.star).fill('five-pointed-star-hover')
    const moon = new Array(5-props.star).fill('five-pointed-star')
    useEffect(()=>{
        
    },[])
  return (
    <>
    <div class="d-flex justify-content-start">
        {stars && stars.map((element,index)=>{
            return <div key={index} className={stars[index]}></div>
        })}
        {moon && moon.map((element,index)=>{
            return <div key={index} className={moon[index]}></div>
        })}
    </div>
    </>
   
  )
}

export default Rating