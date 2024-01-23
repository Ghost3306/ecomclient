import React, { createContext, useContext, useEffect, useState } from 'react'; 

import { useCookies } from "react-cookie";
import SellerLogin from '../Admin/SellerLogin';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    
    const [cookies, setCookie] = useCookies(['user']);
        if(cookies.email==='logout'){
            return <SellerLogin/>
        }else
            return <AuthContext.Provider value={cookies}>
                {children}
            </AuthContext.Provider>
       }
       
  
  export const useAuth = () => useContext(AuthContext);