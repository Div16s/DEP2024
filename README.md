# Purchase Management Project

## Overview
    Welcome to the Purchase Management project! This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, 
    and it utilizes Tailwind CSS for frontend styling. The goal of this project is to provide a comprehensive solution for managing purchases within an organization.
    
## Features Completed
### 1. User Authentication
       The project includes a robust user authentication system that enables users to sign up, log in, and manage their profiles.
       The authentication process is enhanced with an email verification mechanism using OTP (One-Time Password).
       This ensures a secure and reliable way to verify user identities.
  #### 1.1 Sign Up
           Users can create accounts by providing necessary details, including their email address. 
           During the signup process, an OTP (One-Time Password) is immediately sent to the provided email address for verification.
           This ensures that the email address is valid and accessible. Once the user successfully verifies the OTP, their registration is complete.
  ### 1.2 Login
          When users attempt to log in, another OTP is sent to their registered email address.
          This additional email verification during login adds an extra layer of security.
          Users need to verify the OTP to successfully log in. This ensures ongoing validation of the user's identity.
  ### 1.3 JWT Token Generation
          Upon successful verification during signup and login, a JWT (JSON Web Token) is generated and provided to the user.
          This JWT token is used for subsequent authentication and maintaining user sessions.

 ## 2. User Profile Management
  ### 2.1 View Profile
          After logging in, users have the ability to view their profile information. This includes details such as name, email, and other relevant information.

  ### 2.2 Edit Profile
          Users can edit their profile details to ensure that the information is accurate and up-to-date. This feature provides flexibility for users to modify their profile as needed.
