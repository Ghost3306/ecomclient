import React from 'react'
import { Link } from 'react-router-dom'

function SellerAds() {
  return (
    <>
        <div className="container">
            <Link to ="/registerseller">Register</Link>
            <Link to ="/sellerlogin">Login</Link>
        </div>

    </>
  )
}

export default SellerAds