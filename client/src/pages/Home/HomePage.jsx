import React from "react";
import { Link } from "react-router-dom";
// import { Type } from "react-toastify/dist/utils";
import "./HomePage.css";
import Typewriter from "../Typewriter";
const HomePage = () => {
  return (
    <div className="home">

      <img
        src="iitrpr.jpg"
        alt="Homepage"
        className=" homepage-image w-3000 h-3000 mt-4"
      />

      <div className="home-main flex-col text-center">
        <p className="text-6xl  text-black mt-8 mb-10">
          Welcome to{" "}
          <div className="brown-rang">
            <Typewriter />
          </div>
        </p>
        <p className="text-3xl text-black  ml-7 mr-7 mt-2 mb-5">
          At IIT Ropar, we believe in efficient and transparent procurement
          processes to meet the needs of our academic community. Our Purchase
          Management System streamlines the purchasing workflow, ensuring smooth
          transactions and optimal resource allocation.
        </p>

        <br />
        <br /><br />
        <p className=" font-bold text-left heading-main-body  mt-13">Features of Our Purchase Management System:</p>
        <br />
        <br /><br /><br /><br /><br />
        <div className="features-main-body">
          <div className="feature">
            <div className="sub-heading-main-body">User-Friendly Interface</div>
            <p>Our intuitive interface makes it easy for faculty, staff, and administrators to initiate, track, and manage purchase requests.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Centralized Procurement</div>
            <p>Consolidate all purchasing activities in one platform, enhancing coordination and reducing administrative overhead.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Transparent Approval Workflow</div>
            <p>Clear approval workflows ensure accountability and compliance with institutional policies and regulations.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Vendor Management</div>
            <p>Maintain a comprehensive database of trusted vendors, simplifying the procurement process and fostering partnerships.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Budget Tracking</div>
            <p>Track expenditures in real-time to effectively manage budgets and prevent overspending.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Efficient Communication</div>
            <p>Facilitate seamless communication between requesters, approvers, and vendors, minimizing delays and errors.</p>
          </div>
        </div>
      </div>

      <p className="text-5xl text-black text-center p-3 bg-gray-900 mt-5">
        <Link to="/AboutUs" className="text-blue-500">
          To learn more, visit our About-Us section.
        </Link>
        <br /><br />
        <Link to="/FAQ" className="text-blue-500 hover:text-gray-500">
          Have some questions? Visit our Help-Center
        </Link>
      </p>
    </div>

  );
};

export default HomePage;
