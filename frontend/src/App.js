import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Forgot from './pages/Auth/Forgot';
import Reset from './pages/Auth/Reset';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/layout'
import Dashboard from './pages/Dashboard/Dashboard';
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './pages/AddProducts/AddProduct';

axios.defaults.withCredentials = true

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/resetpassword/:resetToken" element={<Reset />} />

          <Route path="/dashboard" element={
            <div className='Dashboard'>
              <Sidebar />
              <Layout>
                <Dashboard />
              </Layout>
            </div>
          } />

          <Route path="/add-product" element={
            <div className='Dashboard'>
              <Sidebar />
              <Layout>
                <AddProduct />
              </Layout>
            </div>
          } />

          <Route path="/contact" element={
            <div className='Dashboard'>
              <Sidebar />
              <Layout>
                <h3>Report a bug</h3>
              </Layout>
            </div>
          } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
