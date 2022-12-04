import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Forgot from './pages/Auth/Forgot';
import Reset from './pages/Auth/Reset';

function App() {
  return (
    <div className="AppWrap">
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<Forgot />} />
            <Route path="/resetpassword/:resetToken" element={<Reset />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
