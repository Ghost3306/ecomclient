import React, { useEffect, useState } from 'react'
import Navbar from '../UserUI/Navbar'
import SearchedProd from '../UserUI/SearchedProd'
import Carousel from '../UserUI/Carousel';

function Homepage() {
  const [product,setproducts] = useState('list will come');
  const [searched, setSearched] = useState(false);
  const [carousel,setCarousel] = useState(true)
  return (

    <>
      <Navbar setproduct = {setproducts} searched={setSearched} carousel = {setCarousel}/>
      {carousel && <Carousel/>}
      {searched && <SearchedProd name={product}/>}
    </>
  )
}

export default Homepage