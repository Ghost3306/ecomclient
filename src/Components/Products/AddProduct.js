import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function AddProduct() {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user']);
    const logout =()=>{
        setCookie('sellerapikey','',{ path: '/' });
        setCookie('name','',{ path: '/' });
        setCookie('email','',{ path: '/' });
        navigate('/')

    }
    const addProduct = ()=>{
        console.log('product adding start');
    }
  return (
    <>
        <div className="container">
        <div class="d-flex bd-highlight">
            <div class="p-2 w-100 bd-highlight">
                <h3 className='my-4'>Seller Dashboard</h3>
            </div>
            <div class="p-2 flex-shrink-1 bd-highlight">
                <button type="button" className='btn btn-info' onClick={logout}>logout</button>
            </div>
        </div>
            
            <div className="d-flex flex-column bd-highlight ">
                <div className="p-2 bd-highlight"><button type="button" onClick={addProduct} className='btn btn-primary btn-lg'>Add Product</button></div>
                <div className="p-2 bd-highlight">Flex item 2</div>
                <div className="p-2 bd-highlight">Flex item 3</div>
            </div>
        </div>

        <div className="container">
            
        </div>

        
    </>
    
  )
}

export default AddProduct