const express = require('express');
const router = new express.Router();
const {registerUser,sendOTP,loginUser} = require('../controllers/userController');

//Routes
router.post("/user/register",registerUser);
router.post("/user/sendOTP",sendOTP);
router.post("/user/login",loginUser);









module.exports = router;