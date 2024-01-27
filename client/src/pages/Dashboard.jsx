import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/Apis';
import { ToastContainer, toast } from 'react-toastify'
import './Dashboard.css'
import Sidebar from '../components/sidebar';


const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (firstName === "") {
      toast.error("Please enter the required fields!");
    }
    else {
      const data = {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
      }
      const response = await updateUser(data);
      console.log(response);

      if (response.status === 200) {
        const userInfo = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          userToken: response.data.userToken
        }
        toast.success(response.data.message);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUser(userInfo);
        setFirstName("");
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

    let token = userInfo.userToken;
    setUser(userInfo);
    if (token) {
      console.log("Valid user!");
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
      <div className='grid grid-cols-12 h-screen'>
        <div className='col-span-2'>
          <Sidebar />
        </div>
        <div className='col-span-10'>
          {/* <div class="w-44 h-10 mt-2 border rounded-md pl- border-black" style={{ backgroundColor: "#2E4374" }}>
            <h1 class="text-white text-2xl font-bold rounded-md">DASHBOARD</h1>
          </div> */}
          <div class="mr-6 w-96 h-96 mt-12 shadow-md shadow-gray-600 bg-slate-200 outline outline-zinc-400" style={{ width: "500px" }}>
            <h1 class="text-gray-600 text-2xl font-bold p-2 pl-6 mb-6 underline underline-offset-4">User Details</h1>
            <div class="m-6 h-14">
              <label class="text-base font-medium">First Name </label>
              {editable ? (
                <div>
                <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} className="w-96 text-black font-normal p-2 rounded-sm focus:outline-zinc-400 outline outline-1 outline-zinc-300" placeholder={`${user.firstName}`} />
                </div>
              ) : (
                <div class="text-xl font-light text-black h-10 w-100 p-2 border-6 bg-neutral-50 rounded-sm">{user.firstName}</div>
              )}
            </div>

            <div class="m-6 h-14">
              <label class="text-base font-medium">Last Name </label>

              {editable ? (
                <div>
                <input onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" className="w-96 text-black font-normal p-2 rounded-sm focus:outline-zinc-400 outline outline-1 outline-zinc-300" placeholder={`${user.lastName}`} />
                </div>
              ) : (
                <div class="text-xl font-light text-black box-border h-10 w-100 p-2 border-6 rounded-sm bg-neutral-50 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.lastName}</div>
              )}
            </div>

            <div class="m-6 h-12">
              <label class="text-base font-medium">Email </label>
              {editable ? (
                <div>
                  <input type="text" name="email" value={user.email} className="w-96 text-black font-normal rounded-sm p-2 focus:outline-zinc-400 outline outline-1 outline-zinc-300" />
                </div>
              ) : (
                <div class="text-xl font-light text-black box-border h-10 w-100 p-2 border-6 bg-neutral-50 rounded-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{user.email}</div>
              )}
            </div>

            <div class="m-6">
              {editable ? (
                <div>
                  <button onClick={handleUpdateProfile} disabled={isButtonDisabled} class="bg-blue-500 mt-2 text-white shadow-md shadow-gray-400 font-bold p-2 pl-5 pr-5 rounded-full hover:bg-blue-700 focus:ring" style={{ opacity: isButtonDisabled ? 0.5 : 1 }}>Update Profile</button>
                  <button onClick={() => setEditable(false)} className='mt-2 ml-4 bg-gray-500 text-white shadow-md shadow-gray-400 font-bold p-2 pl-5 pr-5 rounded-full hover:bg-gray-700 focus:ring focus:outline-gray-900'>Cancel</button>
                </div>
              ) : (
                <button onClick={() => setEditable(true)} class="bg-blue-500 mt-4 text-white text-sm shadow-md shadow-gray-400 font-bold p-2 pl-4 pr-4 rounded-full hover:bg-blue-700 focus:ring">Edit Profile</button>
              )}
            </div>

          </div>
          {/* <div className="container-f">
            <form id="contact" action="">
              <h3>User Information</h3>
              <fieldset>
                <h1 className='text-xl text-black font-bold'>First Name</h1>
                {editable ? (
                  <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} placeholder={`${user.firstName}`} />
                ) : (
                  <input type='text' name='firstName' value={`${user.firstName}`} />
                )}
              </fieldset>
              <fieldset>
                <h1 className='text-xl text-black font-bold'>Last Name</h1>
                {editable ? (
                  <input onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" placeholder={`${user.lastName}`} />
                ) : (
                  <input type='text' name='lastName' value={`${user.lastName}`} />
                )}
              </fieldset>
              <fieldset>
                <h1 className='text-xl text-black font-bold'>Email</h1>
                {editable ? (
                  <input type="text" name="email" value={user.email} className="border border-black rounded p-2" />
                ) : (
                  <input type='email' name='email' value={`${user.email}`} />
                )}
              </fieldset>

              <fieldset>
                {/* <button
                name="submit"
                type="submit"
                id="contact-submit"
                data-submit="...Sending"
              >
                Submit
              </button> 
                {editable ? (
                  <div>
                    <button id='contact-submit' onClick={handleUpdateProfile}>Update Profile</button>
                    <button id='contact-submit' onClick={() => setEditable(false)} >Cancel</button>
                  </div>
                ) : (
                  <button id='contact-submit' onClick={() => setEditable(true)} >Edit Profile</button>
                )}
              </fieldset>
            </form> 
          </div> */}
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default Dashboard