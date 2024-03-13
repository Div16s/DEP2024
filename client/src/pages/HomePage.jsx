import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <img
        src="iitrpr.jpg"
        alt="Homepage"
        className=" homepage-image w-3000 h-3000 mt-4 "
      />
     
      <div className="home-main flex-col text-center">
        <p className="text-6xl  text-black mt-8 mb-10">
          Welcome to{" "}
          <div className="brown-rang">Purchase Management Portal! </div>
        </p>
        <p className="text-3xl text-black  ml-7 mr-7 mt-2 mb-5">
          At IIT Ropar, we believe in efficient and transparent procurement
          processes to meet the needs of our academic community. Our Purchase
          Management System streamlines the purchasing workflow, ensuring smooth
          transactions and optimal resource allocation.
        </p>
        <p className=" font-bold text-left heading-main-body  mt-13">Features of Our Purchase Management System:</p>

        <div className="features-main-body">
      <div className="feature">
        <div>User-Friendly Interface</div>
        <p>Our intuitive interface makes it easy for faculty, staff, and administrators to initiate, track, and manage purchase requests.</p>
      </div>
      <div className="feature">
        <h2>Centralized Procurement</h2>
        <p>Consolidate all purchasing activities in one platform, enhancing coordination and reducing administrative overhead.</p>
      </div>
      <div className="feature">
        <h2>Transparent Approval Workflow</h2>
        <p>Clear approval workflows ensure accountability and compliance with institutional policies and regulations.</p>
      </div>
      <div className="feature">
        <h2>Vendor Management</h2>
        <p>Maintain a comprehensive database of trusted vendors, simplifying the procurement process and fostering partnerships.</p>
      </div>
      <div className="feature">
        <h2>Budget Tracking</h2>
        <p>Track expenditures in real-time to effectively manage budgets and prevent overspending.</p>
      </div>
      <div className="feature">
        <h2>Efficient Communication</h2>
        <p>Facilitate seamless communication between requesters, approvers, and vendors, minimizing delays and errors.</p>
      </div>
    </div>
      </div>

      <p className="text-5xl text-black mt-5">
        <Link to="/AboutUs" className="text-blue-600">
          To learn more, visit our AboutUs section.
        </Link>
      </p>
      <br></br>
      <br></br>
      <br></br>
    
      <br></br>
      <br></br>
      <br></br>
      <div className="w-full max-w-4xl mt-8">
        <p className="text-6xl text-black mt-8 mb-10">Have some questions?</p>
        <p className="text-6xl text-black mt-8 mb=10">
          <Link to="/FAQ" className="text-blue-600 hover:bg-blue-gray-700">
            Visit our Help Center
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
