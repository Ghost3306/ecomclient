import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import RateUs from './SubUI/RateUS';

function AddReview() {
    const [reviewlist,setReviewList] = useState(null);
    const [cookies,setCookies] = useCookies(['user']);
    const [star,setstar] = useState(0);
    const navigate = useNavigate();
    
    const[title,setTitle] = useState(null);
    const [review,setReview] = useState(null)
    
    useEffect(()=>{
        if(!cookies.apikey){    
            navigate('');
        }else{
            fetchlist();
        }
    },[star])
    async function fetchlist(){
        try{
            const formdata = new FormData();
            formdata.append('apikey',cookies.apikey)
            const res = await axios.post('http://127.0.0.1:8000/products/getreviewlist/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            setReviewList(res.data.review)
        }catch(error){
            console.log(error);
        }
    }
    const submitreview= async(placeid,productid,productname)=>{
        const formdata = new FormData();
        formdata.append('placeid',placeid);
        formdata.append('productid',productid);
        formdata.append('productname',productname);
        formdata.append('reviewerid',cookies.apikey);
        formdata.append('reviwername',cookies.name);
        formdata.append('review',review);
        formdata.append('star',star);
        formdata.append('title',title);
        try{
            const res = await axios.post('http://127.0.0.1:8000/products/addreview/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(res.data);
           
            setTitle(null)
            setReview(null)
            setTimeout(() => {
                setstar(0)
            }, 100);
            
        }catch(error){
            console.log(error);
        }

    }


  return (
    <>
       <div className="container my-4">
        <Link to="/">Home</Link>
        <h5>Your Pending Reviews</h5>
        {reviewlist && console.log(reviewlist)}
       <div class="accordion accordion-flush" id="accordionFlushExample">
            {reviewlist && reviewlist.map((element,index)=>{
                const collapseId = `flush-collapse-${index}`;
                return <div class="accordion-item" key={index}>
                <h2 class="accordion-header" id={`flush-heading-${index}`}>
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                        <strong>{index+1}&nbsp;</strong> {element.product} Delivered Date : {element.date}
                    </button>
                </h2>
                <div id={collapseId} class="accordion-collapse collapse" aria-labelledby={`flush-heading-${index}`} data-bs-parent="#accordionFlushExample">
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <div class="accordion-body" style={{display:'flex'}}>
                        <div className="div">
                            <img src={"http://127.0.0.1:8000/products"+element.productimage} style={{width:'180px',objectFit:'contain'}} />
                        </div>
                        <div className="div2" style={{marginLeft:'30px',marginTop:'20px'}}>
                            <div class="d-flex justify-content-start">
                                <h5>Heading</h5>
                                <input value={title} onChange={(e)=>{setTitle(e.target.value)}} class="form-control form-control-sm mx-2" type="text"  aria-label=".form-control-sm example" required></input>
                            </div>
                            <div class="d-flex justify-content-evenly">
                                <div className="div my-3" style={{height:'40px'}}><RateUs setstar={setstar}/></div>
                                <div class="form-floating my-4 mx-4">
                                    <textarea class="form-control " placeholder="Leave a comment here" id="floatingTextarea2" onChange={(e)=>{setReview(e.target.value)}} style={{height:'100px',width:'450px'}} required></textarea>
                                <label for="floatingTextarea2">Review</label>
                                </div>
                                <button type="button" className='btn btn-outline-primary' style={{height:'40px',marginTop:'50px'}} onClick={()=>{
                                    
                                    submitreview(element.uid,element.productid,element.product)
                                }}>Submit</button>
                            </div>
                            

                        </div>
                    </div>
                    </form>
                </div>
                
            </div>
            
            })}
            
            
          
            </div>
       </div>
    </>
  )
}

export default AddReview