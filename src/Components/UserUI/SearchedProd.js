import React, { useEffect } from 'react'

function SearchedProd(props) {
    useEffect(()=>{
        console.log(props.name);
        
    },[])
  return (
    <>
    
    {props.name && console.log(props.name)}
        {props.name && props.name.map((element,index)=>{
            return <div className="container" key={index}>
                <p>{element.name}</p>
            </div>
            
        })}
    </>
    
  )
}

export default SearchedProd