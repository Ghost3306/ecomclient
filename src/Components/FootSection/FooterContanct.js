import React from 'react'
import { Link } from 'react-router-dom'

function FooterContanct() {
  return (
    <>
       <div className="p-4 d-flex justify-content-center" style={{width:'100%',height:'15rem',background:'#03A9F4',color:'#fff'}}>
            <div className="d-flex flex-column bd-highlight mb-3" style={{textAlign:'center',display:'block'}}>
                <h5>Help</h5>
                <Link style={{color:'#fff'}}>Contanct us</Link>
                <Link style={{color:'#fff'}}>Payments</Link>
                <Link style={{color:'#fff'}}>Concelation & Return</Link>
                <Link style={{color:'#fff'}}>FAQ's</Link>
            </div>
            <div className="d-flex flex-column bd-highlight mb-3" style={{marginLeft:'200px',textAlign:'center'}} >
                <h5>About</h5>
                <Link style={{color:'#fff'}}>About us</Link>
                <Link style={{color:'#fff'}}>Mob. 9604444428</Link>
                <Link style={{color:'#fff'}}>onlinebazaarpeth@gmail.com</Link>
            </div>
            <div className="d-flex flex-column bd-highlight mb-3"style={{marginLeft:'200px',textAlign:'center'}}>
                <h5>Mail us</h5>
                <Link style={{color:'#fff'}}>Online Bazaarpeth</Link>
                <Link style={{color:'#fff'}}>Bazaarpeth kankavli</Link>
                <Link style={{color:'#fff'}}>Sindhudurg</Link>
                <Link style={{color:'#fff'}}>pin. 416602</Link>
            </div>
       </div>
    </>
  )
}

export default FooterContanct