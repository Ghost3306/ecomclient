import React, { useEffect, useState } from 'react'
import Navbar from '../UserUI/Navbar'
import SearchedProd from '../UserUI/SearchedProd'
import Carousel from '../UserUI/Carousel';
import axios from 'axios';
import Categories from '../UserUI/Categories';

function Homepage() {
  const [product,setproducts] = useState('list will come');
  const [tag,setTag] = useState('')
  const [searched, setSearched] = useState(false);
  const [carousel,setCarousel] = useState(true);
 
  useEffect(()=>{
    console.log('useeffect in homepage');
   
  },[])
  return (

    <>
      <Navbar setproduct = {setproducts} tag={setTag} searched={setSearched} carousel = {setCarousel}/>
      {carousel && <Carousel/>}
      {searched && <SearchedProd name={product}/>}
      {carousel &&<Categories setproduct = {setproducts} searched={setSearched} carousel = {setCarousel}/>}
    </>
  )
}

export default Homepage