import React, { useState, useEffect} from 'react'
import { NavLink, useLocation, useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import {sendOTP} from '../../services/Apis';

const Login = () => {
    const [email,setEmail] = useState("");
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          //If the user is already logged in, redirect to the dashboard
          navigate('/dashboard');
        }
      }, []); // Empty dependency array ensures that this effect runs only once, on component mount

    async function handleLogin(e){
        e.preventDefault();
        setButtonDisabled(true);
        
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
                toast.success(response.data.message);

                setEmail("");

                setTimeout(function(){
                    navigate('/login/user/otp',{state:email});
                },2000);
            }
            else{
                toast.error(response.response.data.err);
            }
        }
        setButtonDisabled(false);
    }

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <div className="bg-white p-8 rounded shadow-md w-96 h-96">
            <h1 className="text-2xl font-semibold mb-8 mt-2">Welcome back, Login to continue!</h1>
            <form action="#" method="POST">
                <div class="mb-4">
                    <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email" placeholder='Enter your email here...' className="mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300" />
                </div>
                <button onClick={handleLogin} disabled={isButtonDisabled}  type="submit" className="bg-blue-500 text-white font-bold p-2 pl-5 pr-5 rounded-full shadow-sm shadow-gray-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" style={{ opacity: isButtonDisabled ? 0.5 : 1 }}>
                    Log in
                </button>
                <div className='mt-4'>
                    <p className='text-gray-400 text-sm font-normal'>Don't have an account? <NavLink to={'/signup'} className={"font-bold hover:underline hover:text-blue-400"}>Register!</NavLink></p>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Login