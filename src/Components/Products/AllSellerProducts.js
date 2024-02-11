import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
import OrderDetCanvas from './MiniCompoProduct/OrderDetCanvas';

function AllSellerProducts() {
  const [cookie,setCookie] = useCookies(['user']);
  const [data,setData] = useState(null);
  const [opencanvas,setOpen] = useState(false);
  const [elememtdata,setElement] = useState(null);
  async function fetch(){
    const formdata = new FormData();
    formdata.append('seller',cookie.sellerapikey)
    try{
        const res = await axios.post('http://127.0.0.1:8000/products/sellerallproduct/',formdata,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        setData(res.data)
    }catch(error){
      console.log(error);
    }
  }
  const visiblecanvas = ()=>{
    if(opencanvas){
      setOpen(false);
    }else{
      setOpen(true);
    }

  }
  useEffect(()=>{
    fetch()
  },[])
  return (
    <>
    <div className="container">
      <div div class="d-flex flex-row bd-highlight mb-3">
      <div class="p-2 bd-highlight">
        <Link type="button" to="/sellerhome" className='btn btn-outline-info'>Home</Link>
      </div>
    </div>
    <h5>All Orders</h5>
    {data && <table class="table table-bordered">
      {console.log(data)}
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Product Name</th>
          <th scope="col">Customer</th>
          <th scope="col">State</th>
          <th scope="col">District</th>
          <th scope="col">Pincode</th>
          <th scope="col">Price</th>
          <th scope="col">Order Date</th>
          <th scope="col">View</th>
        </tr>
      </thead>
      <tbody>
        {data.response.map((element,index)=>{
          return <tr>
          <th scope="row">{element.productid}</th>
          <td>{element.product}</td>
          <td>{element.name}</td>
          <td>{element.state}</td>
          <td>{element.district}</td>
          <td>{element.pincode}</td>
          <td>{element.price}</td>
          <td>{element.date}</td>
          <td>
            <button type="button" onClick={()=>{
              setElement(element);
              visiblecanvas(true);
            }}>view</button>
          </td>
        </tr>
        })}
        
      </tbody>
    </table>}
    {opencanvas &&  <OrderDetCanvas element={elememtdata}  close={visiblecanvas}/>}
    </div>
    
    
    </>
    
  )
}

export default AllSellerProducts