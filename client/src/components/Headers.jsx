import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import {
  Navbar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";

import {
  PowerIcon,
} from "@heroicons/react/24/solid";

const Headers = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (user && user.userToken) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      const initials = user.name[0] + user.name[1].toUpperCase()

      return (
        <Menu>
          <MenuHandler>
            <div
              className="w-10 h-10 mr-4 flex font-bold items-center justify-center rounded-full shadow-sm shadow-black text-black cursor-pointer hover:bg-blue-600"
              style={{ fontSize: "14px", backgroundColor: "#EBF3E8" }}
            >
              {initials}
            </div>
          </MenuHandler>
          <MenuList className="w-40 h-30 bg-white">
            <MenuItem
              className="text-sm h-10 font-normal hover:bg-zinc-400 hover:text-white"
              onClick={() => navigate("/dashboard")}
              icon={<PowerIcon />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              className="text-sm h-10 font-normal hover:bg-zinc-400 hover:text-white"
              onClick={() => navigate("/update")}
              icon={<PowerIcon />}
            >
              Edit Profile
            </MenuItem>
            <MenuItem
              className="text-sm h-10 font-normal hover:bg-red-400 hover:text-white"
              onClick={handleLogout}
              icon={<PowerIcon />}
            >
              Logout➡️
            </MenuItem>
          </MenuList>
        </Menu>
      );
    } else {
      return (
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button
              className="text-l font-bold text-black bg-gray-200  hover:bg-slate-300 shadow-md shadow-black p-2 pl-4 pr-4 rounded-full"
              buttonType="link"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              className="text-l font-bold text-black bg-gray-200  hover:bg-slate-300 shadow-md shadow-black p-2 pl-4 pr-4 rounded-full"
              buttonType="link"
            >
              Signup
            </Button>
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar
        className="p-4 shadow-md shadow-gray-400 outline-none fixed top-0 left-0 w-full"
        style={{ backgroundColor: "#3A4D39" }}
      >
        <div className="flex items-center justify-between w-full outline-none">
          <div className="text-white text-3xl font-bold ml-4 transition duration-300 hover:text-zinc-400">
            <Link to={"/"}>Purchase Management</Link>
          </div>
          <div>
            {renderAuthButtons()}
          </div>
        </div>
      </Navbar>
      {/* <nav className="fixed top-0 left-0 w-full z-50 bg-green-900 shadow-md shadow-gray-400 outline-none p-4">
            <div className="flex items-center justify-between w-full">
                <div className="text-white text-3xl font-bold ml-4 transition duration-300 hover:text-zinc-400">
                    <Link to="/">Purchase Management</Link>
                </div>
                {renderAuthButtons()}
            </div>
      </nav> */}
      
    </>
  );
};

export default Headers;
