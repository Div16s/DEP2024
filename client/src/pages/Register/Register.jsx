import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import { registerUser, sendOTP_register } from "../../services/Apis";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// for dropdown
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };
  
  //logic for showing/hiding password
  // function handleClick(e){
  //   e.preventDefault();
  //   setShowPass(!showPass);
  // }

  //validation checks
  async function handleRegister(e) {
    e.preventDefault();
    setButtonDisabled(true);
    if (firstName === "") {
      toast.error("Enter your first name");
    } else if (email == "") {
      toast.error("Enter your email");
    } else if (!email.includes("@")) {
      toast.error("Enter valid email");
    } else if (selectedRole == "") {
      toast.error("Select your role");
    } 
    else {
      const userDetails = {
        name: firstName+" "+lastName,
        email,
      };
      const response = await sendOTP_register(userDetails);

      if (response.status === 200) {
        toast.success(response.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setTimeout(function () {
          navigate("/register/user/otp", { state: userDetails });
        }, 2000);
      } else {
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
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96 h-166">
        <h1 className="text-2xl font-semibold mb-4">Hi there, Register</h1>
        <form action="#" method="POST">
          <div class="mb-4">
            <label
              for="name"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name here..."
              className="mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name here..."
              className="mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email here..."
              className="mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300"
            />
          </div>
          <Menu
            as="div"
            className="relative inline-block text-left w-full py-2"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-left gap-x-1.5 mt-1 p-2 w-full text-sm border rounded-md focus:outline-zinc-400 outline outline-1 outline-zinc-300 rounded-md bg-white px-2 py-2  hover:bg-gray-50">
                {selectedRole || "Select your role"}
                <ChevronDownIcon
                  className="ml-40 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute top-0 right-0 z-10 mt-2 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("FACULTY")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        FACULTY
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        HOD
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        JAO
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        AO
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        JR
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        JS
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        ACCOUNTS
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("HOD")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        DEAN
                      </a>
                    )}
                  </Menu.Item>
                  
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("REGISTRAR")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        REGISTRAR
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleRoleSelection("STUDENT")}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        JAO
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <button
            onClick={handleRegister}
            disabled={isButtonDisabled}
            type="submit"
            className="bg-blue-500 text-white p-2 pl-5 pr-5 rounded-full m-3   block font-bold shadow-md shadow-gray-400 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            style={{ opacity: isButtonDisabled ? 0.5 : 1 }}
          >
            Register
          </button>
          <div className="mb-4 mt-2">
            <p className="text-gray-400 font-normal">
              Already have an account?{" "}
              <NavLink
                to={"/login"}
                className={"font-bold hover:underline hover:text-blue-400"}
              >
                Login!
              </NavLink>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
