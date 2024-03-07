import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../services/Apis';
import { ToastContainer, toast } from 'react-toastify'
import './Dashboard.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";


const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [user, setUser] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (name === "") {
      toast.error("Please enter the required fields!");
    }
    else {
      const data = {
        email: user.email,
        name: name,
        role: user.role,
        department: user.department
      }
      const response = await updateUser(data);
      console.log(response);

      if (response.status === 200) {
        const userInfo = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          department: response.data.department,
          userToken: response.data.userToken
        }
        toast.success(response.data.message);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUser(userInfo);
        setName("");
        setEditable(false);
      }
      else {
        toast.error(response.response.data.err);
      }
    }

    setButtonDisabled(false);

  };

  function isUserValid() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if(userInfo && userInfo.userToken){
      setUser(userInfo);
      setName(userInfo.name);
    }
    else {
      navigate('/login');
    }
  }

  useEffect(() => {
    isUserValid();
  }, []);

  return (

    <>
      {/* <div className="bg-[url('iitrpr_bg.jpg')] bg-contain h-screen w-full">
        <div className="flex items-center h-screen justify-around">
          <div className="bg-white bg-opacity-80 p-8 rounded-lg">
            <h1 className="text-gray-600 text-2xl font-bold mb-6 underline underline-offset-4">User Details</h1>
            <div className="mb-4">
              <label className="text-base font-medium">Name</label>
              {editable ? (
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-black font-normal p-2 rounded-sm focus:outline-none focus:ring-2 ring-blue-500" placeholder={user.name} />
              ) : (
                <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50">{user.name}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="text-base font-medium">Email</label>
              <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.email}</div>
            </div>

            <div className="mb-4">
              <label className="text-base font-medium">Role</label>
              <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.role}</div>
            </div>

            <div className="mb-4">
              <label className="text-base font-medium">Department</label>
              <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.department}</div>
            </div>

            <div className="flex justify-between">
              {editable ? (
                <div>
                  <button onClick={handleUpdateProfile} disabled={isButtonDisabled} className="bg-blue-500 mt-2 text-white shadow-md font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:ring focus:outline-none" style={{ opacity: isButtonDisabled ? 0.5 : 1 }}>Update Profile</button>
                  <button onClick={() => setEditable(false)} className="mt-2 ml-4 bg-gray-500 text-white shadow-md font-bold py-2 px-4 rounded-full hover:bg-gray-700 focus:ring focus:outline-none">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setEditable(true)} className="bg-blue-500 mt-4 text-white shadow-md font-bold py-2 px-4 rounded-full hover:bg-blue-700 focus:ring focus:outline-none">Edit Profile</button>
              )}
            </div>
          </div>

          <div className="bg-white bg-opacity-80 p-8 rounded-lg">
            <h1 className="text-gray-600 text-2xl font-bold mb-6 underline underline-offset-4">MENU</h1>
            <ul>
              <>
                <li className="w-full mb-4">
                  <Link to={"/approvedForms"} className="block hover:bg-gray-300 rounded-lg px-4 py-2">
                    <h1 className="text-black font-semibold">Approved Forms</h1>
                  </Link>
                </li>
                <li className="w-full mb-4">
                  <Link to={"/pendingForms"} className="block hover:bg-gray-300 rounded-lg px-4 py-2">
                    <h1 className="text-black font-semibold">Pending Forms</h1>
                  </Link>
                </li>
              </>
            </ul>
          </div>

        </div>
      </div> */}
      <div className='flex justify-center bg-[url(iitrpr.jpg)] bg-cover h-screen'>
        <Card className="w-2/5 mt-14">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Dashboard
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="mb-4">
              <label className="text-base font-medium">Name</label>
              {editable ? (
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-black font-normal p-2 rounded-sm border-2 focus:outline-none focus:ring-2 ring-gray-500"/>
              ) : (
                <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50">{user.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="text-base font-medium">Email</label>
              <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.email}</div>
            </div>

            <div className="mb-4">
              <label className="text-base font-medium">Role</label>
              <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.role}</div>
            </div>

            <div className="mb-4">
              <label className="text-base font-medium">Department</label>
              <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.department}</div>
            </div>

          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex justify-between">
              {editable ? (
                <div className='flex space-x-4'>
                  <Button onClick={handleUpdateProfile} disabled={isButtonDisabled} variant="gradient" className='flex-1'>Update Profile</Button>
                  <Button onClick={() => setEditable(false)} variant="gradient" className='flex-1'>Cancel</Button>
                </div>
              ) : (
                <Button onClick={() => setEditable(true)} variant="gradient" fullWidth>Edit Profile</Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
      <ToastContainer />
    </>
  )
}

export default Dashboard