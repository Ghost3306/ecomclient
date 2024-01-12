
import './App.css';
import Login from './Components/Admin/Login';
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
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
