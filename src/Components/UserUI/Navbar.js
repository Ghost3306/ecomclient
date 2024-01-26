import React, { useState } from "react";
import { useRef,useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const [inputValue, setInputValue] = useState("");
  const [res, setRes] = useState(null);
  const [comp, setComp] = useState(null);
  const [ret, setRet] = useState(null);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const inputRef = useRef();

  const handleInputFocus = () => {
    setIsDivVisible(true);
  };

  const handleClickOutside = (event) => {
    console.log(inputRef.current);
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
        formdata.append('input',inputValue)
        const res = await axios.post('http://127.0.0.1:8000/products/searchproduct/',formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        setRet(res.data);
        setRes(null);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }

  };

  return (
    <>    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Sell Products Online</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <div >
                    <form class="d-flex">
                        <input type="text" className="form-control me-2" value={inputValue} id="" onChange={handlleChange} ref={inputRef} onFocus={handleInputFocus}/>
                        <button type="submit" className="btn btn-outline-success" onClick={handleSearch}>Search</button>
                    </form>
                    
                    <div className="con"style={{position: "absolute",maxHeight: "330px",overflowY: "auto",width:'100%'}}>  
                        {isDivVisible && res &&
                        res.map((element, index) => {
                            const handleClick = () => {
                                console.log('search clicked');
                            setInputValue(element.name);
                            setRes([{ name: element.name }]);
                            };
                            <div className="container"></div>;
                                return (
                                    <div className="container my-1" key={index}>
                                        <button ref={inputRef} style={{backgroundColor:'transparent',border:'1 px solid blue',height:'40px',marginTop:'10px'}}
                                        type="submit" onClick={handleClick} value={element.name}>{element.name}</button>
                                    </div>
                            );
                        })}
                </div>
            </div>



                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
                <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            



            </div>
        </div>
    </nav>
















    
    </>

  );
}
