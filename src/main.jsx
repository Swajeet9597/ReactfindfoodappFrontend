import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import RegisterPg from './pages/RegisterPage/RegisterPg'
import LoginPg from './pages/LoginPage/LoginPg'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard/Dashboard'
import Messform from './pages/Messform/Messform'
import { DataProvider } from './contextApi/context'
import Welcome from './pages/Welcome/Welcome'
import Notfound from './pages/Notfound/Notfound'
import Admindash from './pages/AdminDash/Admindash'
import Customerdash from './pages/CustomerDash/Customerdash'
import MessPage from './pages/MessPage/MessPage'


createRoot(document.getElementById('root')).render(
<>
  <ToastContainer/>
  <BrowserRouter>
  <DataProvider>
    <Routes>
      <Route path='/' element={<RegisterPg/>}/>
      <Route path='/login' element={<LoginPg/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/feedback' element={<Dashboard/>}/>
      <Route path='/dashboard/details' element={<Dashboard/>}/>
      <Route path='/dashboard/menu' element={<Dashboard/>}/>
      <Route path='/dashboard/price' element={<Dashboard/>}/>
      <Route path='/dashboard/time' element={<Dashboard/>}/>
      <Route path='/messOwner' element={<Messform/>}/>
      <Route path='/admin' element={<Admindash/>}/>
      <Route path='/customer' element={<Customerdash/>}/>
      {/* <Route path='/welcome' element={<Welcome/>}/> */}
      <Route path='/customer/:userId' element={<MessPage/>}/>
      <Route path="*" element={<Notfound/>} />
    </Routes>
  </DataProvider>
  </BrowserRouter>
</>
)
