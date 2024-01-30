import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';

function SearchedProd(props) {
    const [products, setProducts] = useState(null);
    useEffect(()=>{
        // console.log(products);
        setProducts(props.name)
        
    },[])
  return (
    <>

    <div className="contain" style={{width:'100%',height:'auto',border:'1px solid black',display:'flex',}}>
        <div className="side" style={{width:'20%',border:'1px solid black',height:'100vh'}}>Side</div>
        {products && <div className="product" style={{width:'80%',border:'1px solid black',position:'absolute',left:'20%'}}>

            <ProductItem data = {products}/>
            <ProductItem data = {products}/>
            <ProductItem data = {products}/>
            <ProductItem data = {products}/>
            <ProductItem data = {products}/>
            <ProductItem data = {products}/>


        </div>}
    </div>
    
    {/* {products && console.log(products)}
        {products && products.map((element,index)=>{
            return <div className="container" key={index}>
                <p>{element.name}</p>
            </div>
            
        })} */}


    </>
    
  )
}

export default SearchedProd