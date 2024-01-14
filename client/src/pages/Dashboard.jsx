import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;

  function isUserValid() {
    let token = localStorage.getItem("userToken");
    if(token){
      console.log("Valid user!");
    }
    else{
      navigate('*');
    }
  }

  useEffect(()=>{
    isUserValid();
  },[]);
  
  return (
    <div>
      {/* <h1 className='text-3xl text-bold text-blue-950'>Dashboard</h1>
      <div className='flex justify-start items-start'>
        <h1 className='text-2xl text-red-400'>First Name: {userInfo.firstName}</h1>
        <br></br>
        <h1 className='text-2xl text-red-400'>Last Name: {userInfo.lastName}</h1>
        <br></br>
        <h1 className='text-2xl text-blue-500'>Email: {userInfo.email}</h1>
      </div> */}
    </div>
  )
}

export default Dashboard