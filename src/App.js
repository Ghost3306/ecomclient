
import './App.css';
import ForgotPass from './Components/Admin/ForgotPass';
import Login from './Components/Admin/Login';
import Register from './Components/Admin/Register';
import RegisterSeller from './Components/Admin/RegisterSeller';
import SellerLogin from './Components/Admin/SellerLogin';
import NoPage from './Components/Errors/NoPage';
import Homepage from './Components/Homepage/Homepage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SellerHome from './Components/Homepage/SellerHome';
import ForgotPassSeller from './Components/Admin/ForgotPassSeller';
import Cart from './Components/UserUI/Cart';
function App() {
  return (
    <>
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<ForgotPass/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/registerseller" element={<RegisterSeller/>}/>
        <Route path='/sellerlogin' element={<SellerLogin/>}/>
        <Route path='/sellerhome' element={<SellerHome/>}/>
        <Route path='/forgotseller' element={<ForgotPassSeller/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
