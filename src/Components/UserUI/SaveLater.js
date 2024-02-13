import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

function SaveLater() {
    const [cookies,setCookies] = useCookies(['user']);
    const [savelater,setSave] = useState(null);
    function dater(inputDate){
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    }
    async function fetch(){
        const formdata = new FormData()
        formdata.append('uuid',cookies.apikey);
        try{
            const res = await axios.post('http://127.0.0.1:8000/users/savelatershow/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            
            setSave(res.data);
        }catch(error){
            console.log(error);
        }
    }

   

    useEffect(() => {
      fetch();
    }, [])
    
  return (
    <>
        {savelater && <div className="container">
            {console.log('save later',savelater)}
            <h5>Save Later</h5>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Save On</th>
                    <th scope='col'>#</th>
                    </tr>
                </thead>
                <tbody>
                    {savelater.map((element,index)=>{
                        
                        return <tr>
                        <td>{element.productname}</td>
                        <td>{element.price}</td>
                        <td>{element.quantity}</td>
                        <td>{dater(element.date)}</td>
                        <td><button type="button" className='btn btn-outline-primary btn-sm' onClick={async()=>{
                                const formdata = new FormData();
                                formdata.append('apikey',cookies.apikey);
                                formdata.append('productid',element.productid)
                                formdata.append('quntity',element.quantity);
                                try{
                                  const res = await axios.post('http://127.0.0.1:8000/users/addcart/',formdata,{
                                    headers:{
                                      'Content-Type': 'multipart/form-data',
                                    }
                                  })
                                  const formdata1 = new FormData();
                                    formdata1.append('id',element.id);
                                  
                                  const resp = await axios.post('http://127.0.0.1:8000/users/delsave/',formdata1,{
                                    headers:{
                                      'Content-Type': 'multipart/form-data',
                                    }
                                  })
                                }catch(error){
                                  console.log(error);
                                }
                                setTimeout(() => {
                                    fetch()
                                    console.log('fetch completed');
                                },100);

                        }}>Add to Cart</button></td>
                    </tr>
                    })}
                    
                  
                </tbody>
            </table>
        </div>}
       
    </>
  )
}

export default SaveLater