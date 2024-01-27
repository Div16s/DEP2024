const express = require('express');
const router = new express.Router();
const {registerUser,sendOTP,loginUser, updateUserProfile, sendOTP_register} = require('../controllers/userController');

//Routes
router.post("/user/register",registerUser);
router.post("/user/register/sendOTP",sendOTP_register)
router.post("/user/sendOTP",sendOTP);
router.post("/user/login",loginUser);
router.post("/user/update",updateUserProfile);






module.exports = router;