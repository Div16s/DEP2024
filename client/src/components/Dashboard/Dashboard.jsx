import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify'
import './Dashboard.css';
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

function ConvertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    };
  })
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [user, setUser] = useState("");
  const [signatureFile, setSignatureFile] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (name === "") {
      toast.error("Please enter the required fields!");
    }
    else {
      const base64_sigFile = await ConvertToBase64(signatureFile);
      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('name', name);
      formData.append('signatureFile', base64_sigFile);

      const response = await updateUser(formData);

      if (response.status === 200) {
        const userInfo = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          department: response.data.department,
          signatureFile: response.data.signatureFile,
          userToken: response.data.userToken
        }
        toast.success(response.data.message);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUser(userInfo);
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

    if (userInfo && userInfo.userToken) {
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
      <div className='dashboard-home h-screen'>
        <div className='flex justify-center'>
          <Card className="w-2/5 mt-36">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-2 grid h-28 place-items-center"
            >
              <Typography variant="h2" color="white">
                DASHBOARD
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div className="mb-2">
                <label className="text-base font-medium">Name</label>
                {editable ? (
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-black font-normal p-1 rounded-sm border-1 focus:outline-none focus:ring-2 ring-gray-500" />
                ) : (
                  <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50">{user.name}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="text-base font-medium">Email</label>
                <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.email}</div>
              </div>

              <div className="mb-2">
                <label className="text-base font-medium">Role</label>
                <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.role}</div>
              </div>

              <div className="mb-2">
                <label className="text-base font-medium">Department</label>
                <div className="text-xl font-light text-black box-border h-10 w-full p-2 border-2 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.department}</div>
              </div>

              <div className="mb-2">
                <label className="text-base font-medium">Signature</label>
                <br></br>
                {editable ? (
                  <input type="file" label="Image" name='sigFile' accept='.jpeg, .png, .jpg' onChange={(e) => setSignatureFile(e.target.files[0])} className="w-full text-black text-sm p-1 rounded-sm border-1 focus:outline-none focus:ring-2 ring-gray-500" />
                ) :
                  user.signatureFile ? (
                    <img src={user.signatureFile} alt="Signature" className="w-28 h-24 border border-gray-300 rounded-md" />
                  ) : (
                    <div className="w-28 h-24 border border-gray-300 flex items-center justify-center rounded-md">
                      <span className="text-gray-500">Signature</span>
                    </div>
                  )}
              </div>

            </CardBody>
            <CardFooter className="pt-0">
              <div className="flex justify-between">
                {editable ? (
                  <div className='flex space-x-4'>
                    <Button onClick={handleUpdateProfile} disabled={isButtonDisabled} variant="gradient" className='flex-1 text-base'>Update Profile</Button>
                    <Button onClick={() => setEditable(false)} variant="gradient" className='flex-1 text-base'>Cancel</Button>
                  </div>
                ) : (
                  <Button onClick={() => setEditable(true)} variant="gradient" className='text-base' fullWidth>Edit Profile</Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Dashboard