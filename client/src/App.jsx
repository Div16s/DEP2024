import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import Headers from "./components/Headers"
import {Routes,Route, BrowserRouter} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import HomePage from "./pages/HomePage"
import Sidebar from "./components/sidebar"
import LoginOtpPage from "./pages/Login/LoginOtpPage"
import RegisterOtpPage from "./pages/Register/RegisterOtpPage"
// import PDFHandler  from "./Forms/PDFHandler"
import PDFsp101  from "./Forms/PDFsp101"
import Formsp101 from "./pages/Forms/Form_sp101"
import Trial from "./pages/Forms/trial"
import HodDashboard from "./pages/Dashboard/HodDashboard"

function App() {
  return (
    <>
        <BrowserRouter>
          <Headers />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/dashboard/hod" element={<HodDashboard/>} / >
            <Route exact path="/forms" element={<Formsp101 />}/>
            <Route exact path="/trial" element={<Trial />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login/user/otp' element={<LoginOtpPage />}/>
            <Route path='/register/user/otp' element={<RegisterOtpPage />} />
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='*' element={<Error />}/> 
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
