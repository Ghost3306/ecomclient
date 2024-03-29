import React, { useEffect, useState } from 'react'
import Navbar from '../UserUI/Navbar'
import SearchedProd from '../UserUI/SearchedProd'
import Carousel from '../UserUI/Carousel';
import axios from 'axios';
import Categories from '../UserUI/Categories';
import { useNavigate } from 'react-router-dom';
import FooterContanct from '../FootSection/FooterContanct';

function Homepage() {
  const [product,setproducts] = useState('list will come');
  const [tag,setTag] = useState('')
  const [searched, setSearched] = useState(false);
  const [carousel,setCarousel] = useState(true);
  const [input,setinput] = useState('')
  const navigate = useNavigate();
  async function pingserver(){
    try{
      const res = await axios.post('http://127.0.0.1:8000/ping',new FormData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      console.log('server responded');
      
    }catch(error){
      console.log('server disconnected');
      navigate('/500')
    }
  }
  useEffect(()=>{
    console.log('useeffect in homepage');
    pingserver();
  },[])
  return (

    <>
      <Navbar setproduct = {setproducts} setinput={setinput} tag={setTag} searched={setSearched} carousel = {setCarousel}/>
      {carousel && <Carousel/>}
      {searched && <SearchedProd name={product} inputval = {input}/>}
      {carousel &&<Categories setproduct = {setproducts} searched={setSearched} carousel = {setCarousel}/>}
      {carousel &&<FooterContanct setproduct = {setproducts} searched={setSearched} carousel = {setCarousel}/>}
      
    </>
  )
}

export default Homepage