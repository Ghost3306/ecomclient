import React, { useState } from "react";
import { useRef,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Navbar(props) {
  const [inputValue, setInputValue] = useState("");
  const [res, setRes] = useState(null);
  const [comp, setComp] = useState(null);
  const [ret, setRet] = useState(null);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const inputRef = useRef();
  const [cookie,setCookie] = useCookies(['user'])
  const [loginm,setLoginNm] = useState(null);
  const [userclk,setclk] = useState(false);
  useEffect(()=>{
    if(cookie.name){
      setLoginNm(cookie.name)
    }
  },[])

  const handleInputFocus = () => {
    setIsDivVisible(true);
  };

  const handleClickOutside = (event) => {
    // console.log(inputRef.current);
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsDivVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logout =()=>{
    setCookie('name',null,{ path: '/' });
    setclk(false);
    setLoginNm(null);
  }
  const handlleChange = async (event) => {
    setInputValue(event.target.value);
    const formdata = new FormData();
    if (inputValue.length === 1) {
      setRes(null);
    } else {
      try {
        formdata.append('input',inputValue)
        const res = await axios.post('http://127.0.0.1:8000/products/searchproduct/',formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })

        // console.log(typeof(res.data));
        setRes(res.data);
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    }
  };

  

  const handleSearch = async () => {

    try {
        const formdata = new FormData();
        formdata.append('input',inputValue);
        formdata.append('page',1)
        const res = await axios.post('http://127.0.0.1:8000/products/searchproduct/',formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        setRet(res.data);
        setRes(null);
        
        props.setproduct(res.data);
        props.tag(inputValue);
        // console.log('data setted to searched product',res.data);
        
        props.searched(false);
        setTimeout(()=>{
          props.searched(true);
        },0)
        props.carousel(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }

  };

  const home = ()=>{
    props.searched(false);
    props.carousel(true)
  }
  return (
    <>    
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{}}>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/" onClick={home}>Online Bazzarpeth</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <div >
                    <form className="d-flex" onSubmit={(e)=>{e.preventDefault()}}>
                        <input type="text" className="form-control me-2" value={inputValue} placeholder="Search eg. earthen pots" onChange={handlleChange} ref={inputRef} style={{width:'25rem'}} onFocus={handleInputFocus}/>
                        <button type="submit"  className="btn btn-outline-success" onClick={handleSearch}>Search</button>
                    </form>
                    
                    <div className="con"style={{position: "absolute",maxHeight: "330px",overflowY: "auto",width:'100%',zIndex:'99'}}>  
                        {isDivVisible && res &&
                        res.map((element, index) => {
                            const handleClick = () => {
                                console.log('search clicked');
                            setInputValue(element.name);
                            setRes([{ name: element.name }]);
                            };
                            <div className="container" ></div>;
                                return (
                                    <div className="container my-1"  key={index}>
                                        <button ref={inputRef} style={{backgroundColor:'#fff',border:'1 px solid blue',height:'40px',marginTop:'10px'}}
                                        type="submit" onClick={handleClick} value={element.name}>{element.name}</button>
                                    </div>
                            );
                        })}
                </div>
            </div>



                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/registerseller">Became a Seller!</Link>
                </li>
                

            </ul>
                        

            {loginm!=='logout'?loginm?<div className="div">
              <p class="form-control me-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Hello! {cookie.name}</p>

              <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                  <h5 id="offcanvasRightLabel">Your Account</h5>
                  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
              <div class="offcanvas-body text-center">
                <div className="d-flex flex-column bd-highlight mb-3">
                  <Link to="/cart" className="btn btn-outline-primary">Cart</Link>
                  <Link to="/yourorders" className="btn btn-outline-primary my-3">Your Orders</Link>
                  <button type="button" onClick={logout} className="btn btn-info" style={{position:'absolute',left:'50%',top:'95%',transform:'translate(-50%,-95%)'}}>Logout</button>
                </div>
                  
                  

              </div>
              </div>
            </div>    
            :<form className="d-flex">
                  <Link to='/login' className="btn btn-primary mx-4">Login</Link>
       
            </form>:<form className="d-flex">
                  <Link to='/login' className="btn btn-primary mx-4">Login</Link>
       
            </form>}
              
              {/* {loginm?<div className="d-flex">
              <p className="form-control me-4" onClick={()=>{
                if(userclk){
                  setclk(false);
                }else{
                  setclk(true);
                }
              }
                }>Hello! {cookie.name}</p>
              {userclk && <div className="div" style={{position:'absolute',top:'70%',border:'1px solid black',width:'10%',height:'300px',zIndex:'99',background:'#fff'}}>
                        <button type="button" onClick={logout} className="btn btn-info btn-sm" style={{position:'absolute',left:'50%',top:'95%',transform:'translate(-50%,-95%)'}}>Logout</button>
                </div>   }
            </div>
              
            :<form className="d-flex">
                  <Link to='/login' className="btn btn-primary mx-4">Login</Link>
       
            </form>} */}
            
            </div>
            
        </div>
       
    </nav>
















    
    </>

  );
}
