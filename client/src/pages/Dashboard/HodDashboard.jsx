import React from "react";
import "./hodDashboard.css";
const HodDashboard = () => {
  return (

      <div className="main-container">
        {/* HEADER */}

        <div className="left-container  ">
          <div className="menu-box block">
           
            {/* MENU BOX (LEFT-CONTAINER) */}
            <h2 className="titular">MENU BOX</h2>
            <ul className="menu-box-menu">
              <li>
                <a className="menu-box-tab" href="#6">
                  <span className="icon fontawesome-envelope scnd-font-color" />
                  Pending Applications
                </a>
              </li>
              <li>
                <a className="menu-box-tab" href="#8">
                  <span className="icon entypo-paper-plane scnd-font-color" />
                  Approved Applications
                </a>
              </li>
              <li>
                <a className="menu-box-tab" href="#10">
                  <span className="icon entypo-calendar scnd-font-color" />
                  Notifications
                </a>
              </li>
              <li>
                <a className="menu-box-tab" href="#12">
                  <span className="icon entypo-cog scnd-font-color" />
                  Account Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* MIDDLE-CONTAINER */}
        <div className="middle-container ">
          <div className=" profile block ">
            {" "}
            {/* PROFILE (MIDDLE-CONTAINER) */}
        
            <div className="profile-picture big-profile-picture clear">
             
            <h1 className="text-white" id="profile-name">DN</h1>
            </div>
            <h1 className="user-name">Doodh Nath Tiwari</h1>
            <div className="profile-description">
              <p className="scnd-font-color" id="department">
                Cse department
              </p>
              <p className="scnd-font-color" id="role">
                Role
              </p>
            </div>
         
          </div>
        </div>
      </div>

  );
};

export default HodDashboard;
