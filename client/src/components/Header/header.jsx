import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (user && user.userToken) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      console.log("Valid user");
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    navigate("/login");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );

    const closeMenu = () => {
      setOpenNav(false);
    };

    if (openNav) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [openNav]);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {userRole === "FACULTY" && (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link
              to={"/forms/SP101"}
              className="flex items-center p-2 text-sm font-thin bg-white rounded-md hover:bg-gray-100 shadow-sm"
            >
              SP101 Form
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link
              to={"/forms/SP102"}
              className="flex items-center p-2 text-sm font-thin bg-white rounded-md hover:bg-gray-100 shadow-sm"
            >
              SP102 Form
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to={"/approvedForms"} className="flex items-center p-2 text-sm font-thin bg-white rounded-md hover:bg-gray-100 shadow-sm">
              Approved Forms
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to={"/pendingForms"} className="flex items-center p-2 text-sm font-thin bg-white rounded-md hover:bg-gray-100 shadow-sm">
              Pending Forms
            </Link>
          </Typography>
        </>
      )}
      {userRole === "HOD" && (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to={"/approvedForms"} className="flex items-center p-2 text-sm font-thin bg-white rounded-md hover:bg-gray-100 shadow-sm">
              Approved Forms
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to={"/pendingForms"} className="flex items-center p-2 text-sm font-thin bg-white rounded-md hover:bg-gray-100 shadow-sm">
              Pending Forms
            </Link>
          </Typography>
        </>
      )}
    </ul>
  );

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <div className="flex items-center gap-x-2">
            <div className="relative">
              <Button
                variant="text"
                size="sm"
                onClick={(e) =>{e.stopPropagation(); setOpenNav(!openNav)}}
                className="relative z-10 rounded-md overflow-hidden bg-gray-200 text-gray-700 shadow-md"
              >
                {user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase()}
              </Button>
              {openNav && (
                <div className="absolute right-0 mt-1 w-30 py-2 bg-white font-normal rounded shadow-lg" style={{ fontSize: "12px" }}>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={handleLogout} className="flex justify-around w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none">
                    <h1 className="-mt-0.5">Logout</h1>
                    <FiLogOut />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="flex items-center gap-x-1">
          <Button variant="text" size="lg">
            <Link className="text-white" to={"/login"} style={{fontSize:"18px"}} >Login</Link>
          </Button>
          <Button variant="text" size="lg">
            <Link className="text-white" to={"/signup"} style={{fontSize:"18px"}}>Signup</Link>
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="-m-0 max-h-[768px] w-[calc(100%+46px)] mb-14">
      <Navbar className="fixed left-0 right-0 top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" style={{ backgroundColor: "#3730a3" }}>
        <div className="flex items-center justify-between text-white-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer p-2 font-bold text-4xl rounded-md text-#fff-900"
          >
            PURCHASE MANAGEMENT
          </Typography>
          <div className="flex items-center gap-4">

            {isAuthenticated && (
              <div className="hidden lg:block">{navList}</div>
            )}
            {renderAuthButtons()}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default StickyNavbar;