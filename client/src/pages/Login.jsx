import React, { useState, useEffect} from 'react'
import { NavLink, useLocation, useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import {sendOTP} from '../services/Apis';

const Login = () => {
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const userInfo = location.state;

    useEffect(() => {
        // Check if the user is already authenticated (e.g., by checking for a user token in localStorage)
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
          //If the user is already logged in, redirect to the dashboard
          navigate('/dashboard', {state: userInfo});
        }
      }, []); // Empty dependency array ensures that this effect runs only once, on component mount

    async function handleLogin(e){
        e.preventDefault();
        console.log("Inside handleLogin");
        //email validation
        if(email === ""){
            toast.error("Enter your email!");
        }
        else if(!email.includes("@")){
            toast.error("Enter valid email!");
        }
        else{
            const data = {
                email:email
            };
            const response = await sendOTP(data);
            if(response.status===200){
                toast.success("OTP sent");

                setEmail("");

                setTimeout(function(){
                    navigate('/login/user/otp',{state:email});
                },2000);
            }
            else{
                toast.error("User doesn't exists");
            }
        }
    }

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-4">Welcome back, Login</h1>
            <form action="#" method="POST">
                <div class="mb-4">
                    <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email" placeholder='Enter your email here...' className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <button onClick={handleLogin} type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                    Log in
                </button>
                <div className='mb-4 mt-2'>
                    <p className='text-gray-400'>Don't have an account? <NavLink to={'/register'} className={"font-bold hover:underline hover:text-blue-400"}>Register!</NavLink></p>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login