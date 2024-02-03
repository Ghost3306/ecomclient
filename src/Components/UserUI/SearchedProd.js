import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import MainProduct from './MainProduct';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
function SearchedProd(props) {
    const [products, setProducts] = useState(null);
    const [prodstate,setState] = useState(true);
    const [mainprod, setMain] = useState(null);
    const [cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    useEffect(()=>{
        setProducts(props.name)
        
    },[])
  return (
    <>

    {prodstate && <div className="contain" style={{width:'100%',height:'auto',display:'flex',}}>
        <div className="side" style={{width:'20%',height:'100vh', borderRight:'1px solid black',borderBottom:'1px solid black'}}>Side</div>
        {products && <div className="product" style={{width:'80%',position:'absolute',left:'20%'}}>
            {products.map((element,index)=>{
                return<div className="div" key={index} >
                    <ProductItem data = {element} setproduct={setMain} setstate={setState}/>
                </div>
            })}

        </div>}
        
    </div>}

    {mainprod?cookie.apikey?<MainProduct data={mainprod}/>:navigate('/login'):console.log()}
    
    </>
    
  )
}

export default SearchedProd