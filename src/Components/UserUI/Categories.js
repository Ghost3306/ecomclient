import React, { useEffect, useState } from 'react'
import cloth from './svg/clothes-hanger.png'
import kitchen from './svg/cooking-tools.png'
import categories from './svg/application.png'
import book from './svg/book.png'
import Jewelry  from './svg/jewelry.png'
import Appliances from './svg/appliance-repair.png'
import Health from './svg/cosmetics.png'
import office from './svg/office-supplies.png'
import pet from './svg/pet-food.png'
import light from './svg/lighting.png'
import handcraft from './svg/handcraft.png'
import baby from './svg/block.png'
import garden from './svg/gardening.png'
import tools from './svg/tools.png'
import toys from './svg/blocks.png'
import sport from './svg/sports.png'
import axios from 'axios'

function Categories(props) {
    const [cate,setCategory] = useState('')
    // function oncatclick(cat){
    //     console.log(cate);
    // }
    const oncatclick = ()=>{
        console.log(cate);
    }
    const search=async(cate)=>{
        try {
            const formdata = new FormData();
            formdata.append('input',cate);
            formdata.append('page',1)
            const res = await axios.post('http://127.0.0.1:8000/products/searchcategory/',formdata,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            // setRet(res.data);
            // setRes(null);
            
            props.setproduct(res.data);
            console.log(res.data);
            // console.log('data setted to searched product',res.data);
            
            props.searched(false);
            setTimeout(()=>{
            props.searched(true);
            },0)
            props.carousel(false);
            
            // search(null)
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
    
    }
    useEffect(()=>{
        console.log('useeffect in',cate);
        
        // search()

    },[])
  return (
    <>
    <div className="d-flex justify-content-evenly my-4" style={{display:'flex'}}>
        <div className="div text-center" onClick={()=>{
            search('Clothing and Apparel');
            // search('Clothing and Apparel')
            }}>
            <img src={cloth} id='cloth' style={{width:'50px'}}/>
            <h6>Clothing and Apparel</h6>
        </div>
        <div className="div text-center" onClick={()=>{
            search('Home and Kitchen');
            
           
            }}>
            <img src={kitchen} id='cloth' style={{width:'50px'}}/>
            <h6>Home and Kitchen</h6>
        </div>
        <div className="div text-center" onClick={()=>{
            search('Office and School Supplies');
            
           
            }}>
            <img src={office} id='cloth' style={{width:'50px'}}/>
            <h6>Office and School Supplies</h6>
        </div>
        <div className="div text-center" onClick={()=>{
            search('Appliances');
            
           
            }}>
            <img src={Appliances} id='cloth' style={{width:'50px'}}/>
            <h6>Appliances</h6>
        </div>
        <div className="div text-center" onClick={()=>{
            search('Jewelry and Accessories');
           
            }}>
            <img src={Jewelry} id='cloth' style={{width:'50px'}}/>
            <h6>Jewelry and Accessories</h6>
        </div>

        <div className="div text-center" >
            <img src={categories} id='cloth' style={{width:'50px'}} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"/>
            <h6>All Categories</h6>
        </div>
        
       
    </div>
        

        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body small d-flex justify-content-evenly my-4" >
            <div className="div text-center" onClick={()=>{
            search('Health and Beauty');
           
            }}>
                <img src={Health} id='cloth' style={{width:'50px'}}/>
                <h6>Health and Beauty</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Sports and Outdoors');
           
            }}>
                <img src={sport} id='cloth' style={{width:'50px'}}/>
                <h6>Sports and Outdoors</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Toys and Games');
           
            }}>
                <img src={toys} id='cloth' style={{width:'50px'}}/>
                <h6>Toys and Games</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Books and Media');
           
            }}>
                <img src={book} id='cloth' style={{width:'50px'}}/>
                <h6>Books and Media</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Pet Supplies');
           
            }}>
                <img src={pet} id='cloth' style={{width:'50px'}}/>
                <h6>Pet Supplies</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Tools and Home Improvement');
           
            }}>
                <img src={tools} id='cloth' style={{width:'50px'}}/>
                <h6>Tools and Home Improvement</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Electrical and Lighting');
           
            }}>
                <img src={light} id='cloth' style={{width:'50px'}}/>
                <h6>Electrical and Lighting</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Crafts and Hobbies');
           
            }}>
                <img src={handcraft} id='cloth' style={{width:'50px'}}/>
                <h6>Crafts and Hobbies</h6>
            </div>
            <div className="div text-center" onClick={()=>{
            search('Garden and Outdoor Living');
           
            }}>
                <img src={garden} id='cloth' style={{width:'50px'}}/>
                <h6>Garden and Outdoor Living</h6>
            </div>
           
        </div>
        </div>
    </>
  )
}

export default Categories