import React, { useContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyUser } from '../../services/Apis'
import { UserContext } from '../../UserContext'
import {sendOTP} from '../../services/Apis'

const LoginOtpPage = () => {
    const [otp, setOTP] = useState("");
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isResendButtonDisabled, setResendButtonDisabled] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60); // 1 minutes in seconds
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setButtonDisabled(true);
        if (otp === "") {
            toast.error("Please enter your OTP");
        }
        else if (!/[^a-zA-Z]/.test(otp)) {
            toast.error("Enter a valid OTP");
        }
        else if (otp.length < 6) {
            toast.error("OTP must be of 6 digit");
        }
        else {
            const data = {
                email: location.state,
                otp: otp,
                submitTime: Date.now()
            }

            const response = await verifyUser(data);
            console.log(response);

            if (response.status === 200) {
                const userInfo = {
                    id: response.data.id,
                    firstName: response.data.name,
                    email: response.data.email,
                    role: response.data.role,
                    userToken: response.data.userToken,
                }
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                toast.success(response.data.message);
                setTimeout(function () {
                    navigate('/dashboard');
                }, 2000);
            }
            else {
                toast.error(response.response.data.err);
            }
        }
        setButtonDisabled(false);
    }

    const handleResend = async (e) => {
        e.preventDefault();
        setResendButtonDisabled(true);
        const data = {
            email:location.state
        };
        try {
            
          const response = await sendOTP(data); // Assuming resendOTP takes the email as a parameter
          if (response.status === 200) {
            toast.success(response.data.message);
            setTimeRemaining(60); // Reset the timer
          } else {
            toast.error(response.response.data.error);
          }
        } catch (error) {
          console.error("Error resending OTP:", error);
        }

        setResendButtonDisabled(false);
      };

    return (
        <div className='bg-gray-100 flex items-center justify-center h-screen'>
            <div className="bg-white p-8 rounded shadow-md w-96 h-96">
                <h1 className="text-2xl font-semibold mb-8 mt-2">VERIFY YOUR OTP</h1>
                {/* Display OTP expiry message or countdown */}
                {timeRemaining > 0 ? (
                    <p className="text-gray-600 text-sm mb-4">
                        Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </p>
                ) : (
                    <p className="text-red-600 text-sm mb-4">OTP has expired. Please request a new one.</p>
                )}
                <form method="POST">
                    <div>
                        <div class="mb-4">
                            <input onChange={(e) => { setOTP(e.target.value) }} type="text" id="otp" name="otp" placeholder='Enter your OTP here...' className="mt-1 p-2 w-full border focus:outline-zinc-400 rounded-md" />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSubmit} disabled={isButtonDisabled} type="submit" className="bg-blue-500 text-white font-semibold m-auto p-2 pl-5 pr-5 rounded-full hover:bg-blue-600 shadow-sm shadow-gray-500 focus:outline-none focus:ring focus:border-blue-300" style={{ opacity: isButtonDisabled ? 0.5 : 1 }}>
                            Submit
                        </button>
                        <button onClick={handleResend} disabled={isResendButtonDisabled} className="bg-green-500 ml-2 text-white font-semibold p-2 pr-5 pl-5 rounded-full hover:bg-green-600 shadow-sm shadow-gray-500 focus:outline-none focus:ring focus:border-green-300" style={{ opacity: isResendButtonDisabled ? 0.5 : 1 }}>
                            Resend OTP
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginOtpPage