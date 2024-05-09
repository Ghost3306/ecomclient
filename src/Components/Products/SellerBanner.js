import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function SellerBanner() {
    const [banner,setBanner] = useState(null);
    const [bannerurl, setBannerURL] = useState('');
    const [offcan,setcanvas] = useState(false);
    const [cookies, setCookies] = useCookies(['user']);
    const [allbanners,setAllBanners] = useState(null);
    const [msg,setmsg] = useState(null);
    useEffect(()=>{
        fetch()
        document.title = 'Online Bazaarpeth - Banners';
    },[msg])
    const onbanner = (event)=>{
        setBanner(event.target.files[0]);
        console.log(banner);
        const file = event.target.files[0];
        if (file) {
            setBannerURL(URL.createObjectURL(file));
        } else {
            setBannerURL('');
        }
    }
    async function fetch(){
        try{
            const formdata = new FormData()
            formdata.append('sellerid',cookies.sellerapikey)
            const res = await axios.post('http://127.0.0.1:8000/seller/allbanner/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(res.data);
            setAllBanners(res.data)
        }catch(error){
            console.log(error);
        }
    }
    const uploadban = async()=>{
        try{
            const formdata = new FormData()
            formdata.append('sellerid',cookies.sellerapikey)
            formdata.append('banner',banner)
            const res = await axios.post('http://127.0.0.1:8000/seller/banner/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(res.data);
            setmsg(res.data.msg)
            // fetch()
            setcanvas(false)
            setTimeout(()=>{
                setmsg(null)
            },2000)
        }catch(error){
            console.log(error);
        }
        
    }
    const deleteBanner = async(bannerid)=>{
        try{
            const formdata = new FormData()
            formdata.append('id',bannerid)
            
            const res = await axios.post('http://127.0.0.1:8000/seller/deletebanner/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            
            setmsg(res.data.msg)
            
            
            setTimeout(()=>{
                setmsg(null)
            },2000)
        }catch(error){
            console.log(error);
        }
    }
  return (
    <>
        <div className="container my-4">
            <div class="d-flex justify-content-between">
                <button type="button" className='btn btn-outline-dark' onClick={()=>{setcanvas(!offcan)}}>Add Banner</button>
                {msg && <h6>{msg}</h6>}
                <Link type="button" to="/sellerhome" class="btn-close" aria-label="Close"></Link>
            </div>
            {offcan && <div className="inputbanner">
                <div class="d-flex justify-content-between my-4">
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                        <input type="file" accept="image/*" onChange={onbanner} />
                        <button type="button" className='btn btn-outline-primary mx-3' onClick={uploadban}>Upload</button>
                        
                    </form>
                </div>
                <div class="d-flex justify-content-start">
                {bannerurl && (
                            <img src={bannerurl} alt="Preview" style={{ maxWidth: '720px', maxHeight: '311px', objectFit:'contain' }} 
                            />
                        )}
                </div>
            </div>}
            <div class="d-flex flex-column bd-highlight mb-3">
                {allbanners && allbanners.banners.map((element,index)=>{
                    {console.log("element",element.banner)}
                    return <div className="d-flex my-2" key={index}>
                    <img style={{width:'180vh',height:'311px',objectFit:'contain'}} src={"http://127.0.0.1:8000/seller"+element.banner} alt="" srcset="" />
                    <button type="button" onClick={()=>{
                        deleteBanner(element.id)
                    }} className='btn btn-outline-danger btn-sm mx-2'>Delete</button>
                </div>
                })}
            </div>
        </div>
    
    </>
  )
}

export default SellerBanner