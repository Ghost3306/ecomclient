import React, { useState } from 'react'
import './star.css'
function RateUs(props) {
    const num =[0,1,2,3,4]

    const [hoverClasses, setHoverClasses] = useState(new Array(5).fill('five-pointed-star'));
    const [starnum,setstar] = useState(1)
    const handleMouseEnter = (index) => {
        const updatedHoverClasses = [...hoverClasses];
        updatedHoverClasses[index] = 'five-pointed-star-hover';
        setHoverClasses(updatedHoverClasses);
      };
    
      const handleMouseLeave = (index) => {
        const updatedHoverClasses = hoverClasses.map((_, i) =>
          i <= index ? 'five-pointed-star-hover' : 'five-pointed-star'
        );
        setHoverClasses(updatedHoverClasses); 
        // setMouseLeaveEvent(null);
      };
      
      const handleClick = (index) => {
        const updatedHoverClasses = hoverClasses.map((_, i) =>
          i <= index ? 'five-pointed-star-hover' : 'five-pointed-star'
        );
        props.setstar(index+1)
        setHoverClasses(updatedHoverClasses); 
        setMouseLeaveEvent(null);
        
      };
      const [mouseLeaveEvent, setMouseLeaveEvent] = useState(handleMouseLeave);
  return (
    <>
    <div class="d-flex justify-content-evenly">

        <div className="d-flex justify-content-evenly">
            {num.map((_, index) => (
                <div
                key={index}
                className={hoverClasses[index]}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={()=>{handleMouseLeave(index)}}
                onClick={() => handleClick(index)}
                ></div>
            ))}
            </div>

   
    </div>
   
    </>
  )
}

export default RateUs