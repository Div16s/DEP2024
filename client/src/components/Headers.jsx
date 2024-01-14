import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    Navbar,
    MobileNav,
    Typography,
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
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";

const Headers = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with your authentication logic
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = location.state;
    console.log(userInfo);

    useEffect(() => {
        if (userInfo && userInfo.userToken) {
            setIsAuthenticated(true);
        }
    }, [userInfo]);

    const handleLogout = () => {
        // Implement logout logic and redirect to the home page
        localStorage.removeItem("userToken");
        setIsAuthenticated(false);
        navigate('/login');
    };

    const renderAuthButtons = () => {
        if (isAuthenticated) {
            return (
                <Menu>
                    <MenuHandler>
                        <Avatar
                            image={
                                // Replace with the user's profile image URL
                                'https://example.com/user-profile-image.jpg'
                            }
                            alt="User Profile"
                            size="sm"
                        />
                    </MenuHandler>
                    <MenuList>
                        <MenuItem
                            onClick={() => navigate('/dashboard',{ state: userInfo })}
                            icon={<CubeTransparentIcon />}
                        >
                            Dashboard
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                            icon={<PowerIcon />}
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            );
        } else {
            return (
                <div>
                    <Link to="/login">
                        <Button color="indigo" buttonType="link" ripple="dark">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button color="indigo" buttonType="link" ripple="dark">
                            Signup
                        </Button>
                    </Link>
                </div>
            );
        }
    };

    return (
        <>
            <Navbar className="bg-black" fixed={false}>
                <div className="flex items-center justify-between w-full">
                    <div className='text-white text-2xl'>CitizenPulse</div>
                    {renderAuthButtons()}
                </div>
            </Navbar>
        </>
    );
}

export default Headers