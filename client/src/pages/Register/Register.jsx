import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import {registerUser, sendOTP_register} from '../../services/Apis';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //const [showPass,setShowPass] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  //logic for showing/hiding password
  // function handleClick(e){
  //   e.preventDefault();
  //   setShowPass(!showPass);
  // }

  //validation checks
  async function handleRegister(e){
    e.preventDefault();
    setButtonDisabled(true);
    if(firstName===""){
      toast.error("Enter your first name");
    }
    else if(email==""){
      toast.error("Enter your email");
    }
    else if(!email.includes("@")){
      toast.error("Enter valid email");
    }
    else{
      const userDetails = {
        firstName,
        lastName,
        email
      }
      const response = await sendOTP_register(userDetails);
    
      if(response.status === 200){
        toast.success(response.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setTimeout(function(){
            navigate('/register/user/otp',{state:userDetails});
        },2000);
      }
      else{
        toast.error(response.response.data.err);
      }
      setButtonDisabled(false);
    }
  }

  // console.log(firstName);
  // console.log(lastName);
  // console.log(email);
  // console.log(password);

  // <div class="mb-4">
//                   <label for="password" className="block text-sm font-medium text-gray-600">Password</label>
//                   <input onChange={(e)=>{setPassword(e.target.value)}} type={!showPass?"password":"text"} id="password" name="password" placeholder='Enter your password here...' className="mt-1 p-2 w-full border rounded-md" />
              
  //                   <button onClick={handleClick} className='bg-gray-300 text-blue-900 font-bold w-12 flex justify-center items-center border rounded-sm mt-1'>
  //                     {!showPass?"Show":"Hide"}
  //                   </button>
                    
  //               </div>
  

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <div className="bg-white p-8 rounded shadow-md w-96 h-96">
            <h1 className="text-2xl font-semibold mb-4">Hi there, Register</h1>
            <form action="#" method="POST">
                <div class="mb-4">
                    <label for="name" className="block text-sm font-medium text-gray-600">First Name</label>
                    <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" id="firstName" name="firstName" placeholder='Enter your first name here...' className="mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300" />
                </div>
                <div class="mb-4">
                    <label for="name" className="block text-sm font-medium text-gray-600">Last Name</label>
                    <input onChange={(e)=>{setLastName(e.target.value)}} type="text" id="lastName" name="lastName" placeholder='Enter your last name here...' className="mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300" />
                </div>
                <div class="mb-4">
                    <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email" placeholder='Enter your email here...' className="mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300" />
                </div>
                
                <button onClick={handleRegister} disabled={isButtonDisabled} type="submit" className="bg-blue-500 text-white p-2 pl-5 pr-5 rounded-full font-bold shadow-md shadow-gray-400 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" style={{ opacity: isButtonDisabled ? 0.5 : 1 }}>
                    Register
                </button>
                <div className='mb-4 mt-2'>
                    <p className='text-gray-400 font-normal'>Already have an account? <NavLink to={'/login'} className={"font-bold hover:underline hover:text-blue-400"}>Login!</NavLink></p>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Register