
import './App.css';
import ForgotPass from './Components/Admin/ForgotPass';
import Login from './Components/Admin/Login';
import Register from './Components/Admin/Register';
import RegisterSeller from './Components/Admin/RegisterSeller';
import NoPage from './Components/Errors/NoPage';
import Homepage from './Components/Homepage/Homepage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
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
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
