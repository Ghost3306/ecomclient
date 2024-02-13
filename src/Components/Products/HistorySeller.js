import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

function HistorySeller() {
  const [cookie,setCookie] = useCookies(['user']);
  const [data,setData] = useState(null);
  const [search,setsearch] = useState('')
  const searchHistory= async()=>{
    const formdata = new FormData()
    formdata.append('name',search)
    formdata.append('forwhat','delivered')
    formdata.append('seller',cookie.sellerapikey)
    try{
        const res = await axios.post('http://127.0.0.1:8000/products/search/',formdata,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        console.log(res.data);
        setData(res.data)
    }catch(error){
      console.log(error);
    }
  }
  async function fetch(){
    const formdata = new FormData();
    formdata.append('seller',cookie.sellerapikey)
    try{
        const res = await axios.post('http://127.0.0.1:8000/products/sellerhistory/',formdata,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        setData(res.data)
    }catch(error){
      console.log(error);
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
    
    <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <form class="d-flex" onSubmit={(e)=>{e.preventDefault()}}>
    <h5 className='me-2'>Your Delivered Products History</h5>
      <input class="form-control me-2" value={search} onChange={(e)=>{
        setsearch(e.target.value);
        
      }} type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit" onClick={searchHistory}>Search</button>
    </form>
  </div>
</nav>
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
          <th scope="col">Delivered Date</th>
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
          <td>{element.approxdelivery}</td>
        </tr>
        })}
        
      </tbody>
    </table>}
    </div>
    
    
    </>
    
  )
}

export default HistorySeller