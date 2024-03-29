import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import Error from "./pages/Error"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import { ChakraProvider } from '@chakra-ui/react'
import HomePage from "./pages/Home/HomePage"
import LoginOtpPage from "./pages/Login/LoginOtpPage"
import RegisterOtpPage from "./pages/Register/RegisterOtpPage"
import Form_sp101 from "./pages/Forms/Form_sp101"
import Form_sp102 from "./pages/Forms/Form_sp102"
import Form_BudgetSection from "./pages/Forms/Form_BudgetSection"
import Form_PurchaseSection from "./pages/Forms/Form_PurchaseSection"
import SP_101 from "./pages/Forms/SP_101"
import ApprovedForms from "./pages/ApprovedForms.jsx/ApprovedForms"
import PendingForms from "./pages/Pending Forms/PendingForms"
import RejectedForms from "./pages/Rejected Forms/RejectedForms"
import StickyNavbar from "./components/Header/header"
import { FooterWithSocialLinks } from "./components/Footer/Footer"
import ContextFormSP101DataProvider from "./Context/ContextFormSP101DataProvider"
import AboutUs from "./pages/AboutUs/AboutUs"
import FAQ from "./pages/FAQ"

function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <ContextFormSP101DataProvider >
            <StickyNavbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route exact path="/forms/SP101" element={<Form_sp101 />} />
              <Route exact path="/forms/SP102" element={<Form_sp102 />} />
              <Route exact path="/forms/budgetsection" element={<Form_BudgetSection />} />
              <Route exact path="/forms/purchasesection" element={<Form_PurchaseSection />} />
              <Route exact path="/SP_101" element={<SP_101 />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/login/user/otp' element={<LoginOtpPage />} />
              <Route path='/register/user/otp' element={<RegisterOtpPage />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path="/approvedForms" element={<ApprovedForms />} />
              <Route path="/pendingForms" element={<PendingForms />} />
              <Route path="/rejectedForms" element={<RejectedForms />} />
              <Route path='*' element={<Error />} />
            </Routes>
            <FooterWithSocialLinks />
          </ContextFormSP101DataProvider>
        </BrowserRouter>
      </ChakraProvider>
    </>
  )
}

export default App
