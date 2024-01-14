import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import {registerUser} from '../services/Apis';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showPass,setShowPass] = useState(false);
  const navigate = useNavigate();

  //logic for showing/hiding password
  function handleClick(e){
    e.preventDefault();
    setShowPass(!showPass);
  }

  //validation checks
  async function handleRegister(e){
    e.preventDefault();
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
      const inputData = {
        firstName,
        lastName,
        email
      }
      const response = await registerUser(inputData);
    
      if(response.status === 200){
        toast.success("User registered successfully.");

        setFirstName("");
        setLastName("");
        setEmail("");

        setTimeout(function(){
          navigate('/login');
        },2000);
      }
      else{
        toast.error("Not a valid email");
      }
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
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-semibold mb-4">Hi there, Register</h1>
            <form action="#" method="POST">
                <div class="mb-4">
                    <label for="name" className="block text-sm font-medium text-gray-600">First Name</label>
                    <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" id="firstName" name="firstName" placeholder='Enter your first name here...' className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div class="mb-4">
                    <label for="name" className="block text-sm font-medium text-gray-600">Last Name</label>
                    <input onChange={(e)=>{setLastName(e.target.value)}} type="text" id="lastName" name="lastName" placeholder='Enter your last name here...' className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div class="mb-4">
                    <label for="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id="email" name="email" placeholder='Enter your email here...' className="mt-1 p-2 w-full border rounded-md" />
                </div>
                
                <button onClick={handleRegister} type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                    Register
                </button>
                <div className='mb-4 mt-2'>
                    <p className='text-gray-400'>Already have an account? <NavLink to={'/login'} className={"font-bold hover:underline hover:text-blue-400"}>Login!</NavLink></p>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Register