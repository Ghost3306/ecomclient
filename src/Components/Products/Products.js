import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
function Products() {
    const [products, setProducts] = useState(null);
    const [pop,setPop] = useState(false);
    const [popdata , setPopdata] = useState(null);
    const [image, setImage] = useState(false);
    const [imagepath, setImagepath] = useState('')
    const [cookie,setCookie] = useCookies(['user'])
    const [dele,setdelete] = useState(false);
    const [deldata, setdeldata] = useState('');
    const [load, setLoad] = useState(true)



    async function fetchproducts(){
        const formdata = new FormData()
        formdata.append('sellerapi',cookie.sellerapikey)
        try{
            const res = await axios.post('http://127.0.0.1:8000/products/sellerproducts/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })
            console.log(res.data);
            setProducts(res.data)
            // console.log('products',products);
            }catch(error){
                console.log(error);
            }
    }
    useEffect(()=>{
        console.log('useeffect');
        
        fetchproducts();
        
    },[])

    

    const popclick = ()=>{
        console.log('poping');
        if(pop){
            setPop(false);
        }else{
            setPop(true);
        }
        console.log(pop);
    }

    const ondelete = async()=>{
        const formdata = new FormData();
        formdata.append('uniqueid',deldata);
        try{
            const res =  await axios.post('http://127.0.0.1:8000/products/deleteproduct/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })
            fetchproducts();
            console.log(res.data);
            setdelete(false);
            
            // const formdata = new FormData()
            // formdata.append('sellerapi',cookie.sellerapikey)
            // try{
            //     const res = await axios.post('http://127.0.0.1:8000/products/sellerproducts/',formdata,{
            //     headers:{
            //         'Content-Type':'multipart/form-data',
            //     },
            // })
            // console.log(res.data);
            // setProducts(res.data)
            // // console.log('products',products);
            // }catch(error){
            //     console.log(error);
            // }
                   
        }catch(error){
            console.log(error);
        }
    }

  return (
    <>

        {dele && <div className="p-3 container" style={{width:'300px',height:'200px',position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,-50%)', border:'1px solid black', background:'#fff'}}>
            <h5 className='text-center'>Are sure you want to delete</h5>
            <p className='text-center'>Product {deldata}</p>
            <div class="d-flex justify-content-center">
                <button type="button" className='btn btn-danger mx-2' onClick={ondelete}>Yes</button>
                <button type="button" className='btn btn-info' onClick={()=>{setdelete(false);setLoad(true)}}>No</button>
            </div>
            
        </div>
}

        {image && <div className="container" style={{width:'1000px',height:'600px',position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,-50%)', border:'1px solid black', background:'#fff'}}>
            <div className="d-flex justify-content-between my-3"  >
                <h4>Product Image</h4>
                <button type="button" className='btn btn-danger btn-sm' onClick={()=>{
                setImage(false); setPop(true)
            }}>x</button>
            </div>
            <div className="container" style={{width:'100%', height:'85%',background:'#fff',border:'1px solid black'}}>
                <img src={imagepath} className='my-1' style={{width:'85%',height:'85%',objectFit:'contain',backgroundSize:'cover'}} alt="image" srcset="" />
            </div>
                
           
            
        </div>}

        {pop && <div className="container" style={{position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,-50%)', border:'1px solid black', width:'1000px',height:'550px', background:'#fff' }} >
            <div className="d-flex justify-content-between my-3">
                <h4>Product Details</h4>
                <button type="button" className='btn btn-danger btn-sm' onClick={popclick}>x</button>
            </div>
            <div className="row">
                <div className="col">
                        <p>Unique ID : {popdata.uniqueid}</p>
                    </div>
                    <div className="col">
                        <p>Name : {popdata.name}</p>
                    </div>
                    <div className="col">
                        <p>Category : {popdata.category}</p>
                    </div>
            </div>
            <div className="row" style={{overflow:'auto'}}>
                <div className="col">
                    <p>Description : {popdata.description}</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Price : {popdata.price}</p>
                </div>
                <div className="col">
                    <p>Delivery Charge : {popdata.delivertcharge}</p>
                </div>
                <div className="col">
                    <p>Width : {popdata.width}</p>
                </div>
                <div className="col">
                    <p>Height : {popdata.height}</p>
                </div>
                <div className="col">
                    <p>Length : {popdata.length}</p>
                </div>
            </div>
            <div className="row">
                <div className="col" >
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image1} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image1); setPop(false)}}  />
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image2} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image2); setPop(false)}} />
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image3} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image3); setPop(false)}} />
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image4} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image4); setPop(false)}}/>
                </div>
                <div className="col">
                    <img style={{width:'150px',height:'150px',border:'1px solid black'}} src={'http://127.0.0.1:8000/products'+popdata.image5} alt="image" onClick={()=>{setImage(true); setImagepath('http://127.0.0.1:8000/products'+popdata.image5); setPop(false)}} />
                </div>
            </div>

                
        </div>}


        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Unique id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                </tr>
            </thead>
            <tbody>
                {products && products.map((element,index)=>{
                    // console.log(element);
                    const onviewclick = ()=>{
                        console.log('element poping');
                        popclick();
                        setPopdata(element)
                        console.log(element.image1);
                    }
                    return <tr key={index}>
                        <th scope="row">{element.uniqueid}</th>
                        <td>{element.name}</td>
                        <td>{element.category}</td>
                    <td><button type="button" className='btn btn-primary btn-sm' onClick={onviewclick}>View</button></td>
                    <td><button type="button" className='btn btn-danger btn-sm' onClick={()=>{setdelete(true);setLoad(false);setdeldata(element.uniqueid)}}>Delete</button></td>
                </tr> 
                })}
                
            </tbody>
        </table>

        
    
    </>
  )
}

export default Products