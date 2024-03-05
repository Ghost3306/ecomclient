import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import MainProduct from './MainProduct';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import SideBar from './SubUI/SideBar';
import Login from '../Admin/Login';
import axios from 'axios';
function SearchedProd(props) {
    const [products, setProducts] = useState(null);
    const [prodstate,setState] = useState(true);
    const [mainprod, setMain] = useState(null);
    const [refresh,setrefresh] =useState(true);
    const [cookie, setCookie] = useCookies(['user']);
    const [pageno,setpage] = useState(1)
    const [results,setresults]= useState(1)
    const navigate = useNavigate();
    useEffect(()=>{
        setProducts(props.name)
        console.log('component rerendered');
    },[refresh])

    const onprev=async()=>{
        refetch();
        if(pageno===1){
            setpage(1)
            
        }else{
            setpage(pageno-1)
            
        }
        console.log("rest",results);
        console.log(pageno);
        
    }
    const onnext=async()=>{
        refetch();
        setpage(pageno+1)
        console.log(pageno);
        console.log("rest",results);
        
    }

    async function refetch(){
        try {
            const formdata = new FormData();
            formdata.append('input',cookie.input);
            formdata.append('page',pageno)
         
            const res = await axios.post('http://127.0.0.1:8000/products/searchproduct/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            setresults(res.data.length)
            setTimeout(() => {
                setProducts(res.data);
                
            }, 50);
            
           
            
            // props.setproduct(res.data);
            // props.tag(inputValue);
            // props.setinput(inputValue);
            // // console.log('data setted to searched product',res.data);
            
            // props.searched(false);
            // setTimeout(()=>{
            //   props.searched(true);
            // },0)
            // props.carousel(false);
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
    }


  return (
    <>

    {prodstate && <div className="contain" style={{width:'100%',height:'auto',display:'flex',}}>
        <div className="side" style={{width:'20%',height:'100vh', borderRight:'1px solid black',borderBottom:'1px solid black'}}>
            
            <SideBar setproduct={setProducts} input={props.inputval}/>
        </div>
        {products && <div className="product" style={{width:'80%',position:'absolute',left:'20%'}}>
            {products.map((element,index)=>{
                return<div className="div" key={index} >
                    <ProductItem data = {element} setproduct={setMain} setstate={setState}/>
                </div>
            })}

        </div>}
        

    </div>}
    
    {mainprod?cookie.apikey?<MainProduct data={mainprod}/>:navigate('/login'):console.log()}
    
    {/* {mainprod?cookie.apikey?<MainProduct data={mainprod}/>:<Login render={setrefresh}/>:console.log()} */}
    {!mainprod && <div className="container d-flex justify-content-between " style={{width:'70vh',marginTop:'70px',marginBottom:'70px'}}>
            <button type="button" onClick={onprev} className='btn btn-outline-primary'>Prev</button>
            <button type="button" onClick={onnext} className='btn btn-outline-primary'>Next</button>
    </div>}
    </>
    
  )
}

export default SearchedProd