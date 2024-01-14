import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import {useLocation, useNavigate} from 'react-router-dom'
import {verifyUser} from '../services/Apis'

const OtpPage = () => {
    const [otp, setOTP] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        if(otp===""){
            toast.error("Please enter your OTP");
        }
        else if(!/[^a-zA-Z]/.test(otp)){
            toast.error("Enter a valid OTP");
        }
        else if(otp.length < 6){
            toast.error("OTP must be of 6 digit");
        }
        else{
            const data = {
                email: location.state,
                otp: otp
            }

            const response = await verifyUser(data);
            console.log(response);

            if(response.status === 200){
                localStorage.setItem("userToken",response.data.userToken);
                const userInfo = {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    userToken: response.data.userToken,
                }
                console.log(userInfo);
                toast.success(response.data.message);
                setTimeout(function(){
                    navigate('/dashboard',{ state: userInfo });
                },5000);
            }
            else{
                toast.error(response.response.data.error);
            }
        }
    }

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-4">ENTER YOUR OTP</h1>
            <form method="POST">
                <div class="mb-4">
                    <input onChange={(e)=>{setOTP(e.target.value)}} type="text" id="otp" name="otp" placeholder='Enter your OTP here...' className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                    Submit
                </button>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default OtpPage