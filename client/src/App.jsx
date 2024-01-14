import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import OtpPage from "./pages/OtpPage"
import Error from "./pages/Error"
import Headers from "./components/Headers"
import {Routes,Route} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <Headers />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/login/user/otp' element={<OtpPage />}/>
        <Route path='*' element={<Error />}/> 
      </Routes>
    </>
  )
}

export default App
