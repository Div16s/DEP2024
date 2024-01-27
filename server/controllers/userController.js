const Users = require('../models/userSchema');
const userOTP = require('../models/userOTP');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// email configuration
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

// function to send OTP during registration
async function sendOTP_register(req,res){
    const {firstName,lastName,email} = req.body;

    if(!firstName || !email){
        res.status(400).json({
            err: "Please fill all the fields."
        });
    }

    try {
        const userExists = await Users.findOne({email:email});

        if(userExists){
            res.status(400).json({
                err: "User already exists in our database"
            })
        }
        else{
            const username = firstName + " " + lastName;
            const OTP = Math.floor(100000+Math.random()*900000);
            const otpCreationTime = new Date();
            
            const existingEmail = await userOTP.findOne({email:email});
            
            if(existingEmail){
                const updateData = await userOTP.findByIdAndUpdate({_id:existingEmail._id},{
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                },{
                    new:true
                });

                await updateData.save();

                console.log("OTP data saved");

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Email Verification OTP",
                    text:`Dear ${username},

                            Thank you for registering with our platform! To complete the email verification process, please use the following One-Time Password (OTP):
                            
                            Your OTP: ${OTP}
                            
                            Please enter this OTP in the verification page to verify your account. If you did not request this OTP, please ignore this email.
                            
                            Thank you for choosing our service!
                    
                    Best regards,
                    CitizenPulse`
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("error",error);
                        res.status(400).json({
                            err:"OTP not sent!"
                        });
                    }
                    else{
                        console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"OTP sent"
                        });
                    }
                });
            }
            else{
                const newOTPData = new userOTP({
                    email: email,
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                });

                await newOTPData.save();

                console.log("New OTP data saved");

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Email Verification OTP",
                    amp: `<!doctype html>
                            <html ⚡4email>
                            <head>
                                <meta charset="utf-8">
                                <style amp4email-boilerplate>body{visibility:hidden}</style>
                                <script async src="https://cdn.ampproject.org/v0.js"></script>
                            </head>
                            <body>
                                <p>Dear ${username},</p>
                                <p>Thank you for registering with our platform! To complete the email verification process, please use the following One-Time Password (OTP):</p>
                                <p><strong>Your OTP: ${OTP}</strong></p>
                                <p>Please enter this OTP in the verification page to verify your account. If you did not request this OTP, please ignore this email.</p>
                                <p>Thank you for choosing our service!</p>
                                <p>Best regards,<br>CitizenPulse</p>
                            </body>
                            </html>`,
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("error",error);
                        res.status(400).json({
                            err:"OTP not sent!"
                        });
                    }
                    else{
                        console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"OTP sent"
                        });
                    }
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            err: "Invalid Details.",
            error
        })
    }
}

//function to handle registration of user
async function registerUser(req,res){
    const {firstName,lastName,email,otp,submitTime} = req.body;

    if(!otp || !email){
        res.status(400).json({
            err: "Enter your OTP"
        });
    }

    try {
        const userExists = await userOTP.findOne({email:email});
        // console.log(submitTime);
        // console.log(userExists.otpCreationTime);
        const timeDifference = ((submitTime - userExists.otpCreationTime)/1000);
        console.log(timeDifference);
        if(timeDifference<=60 && (userExists.otp === otp)){
            // const existingUser = await Users.findOne({email:email});

            const newUser = new Users({
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            
            const userData = await newUser.save();

            const existingUser = await Users.findOne({email:email});
            //token generation
            const token = await existingUser.generateAuthToken();
            console.log(token);
            res.status(200).json({
                message:"User registration successfully done",
                id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: email,
                userToken: token,
            });
        }
        else{
            res.status(400).json({
                err: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(400).json({
            err:"Invalid OTP",
            error
        });
    }
}

// function to send OTP during login
async function sendOTP(req,res){
    const {email} = req.body;

    if(!email){
        res.status(400).json({
            err: "Please enter your email."
        });
    }
    try {
        const userExists = await Users.findOne({email:email});

        if(userExists){
            const username = userExists.firstName + " " + userExists.lastName;
            //console.log(username);
            const OTP = Math.floor(100000+Math.random()*900000);
            // Set OTP expiry to x minutes from now
            const otpCreationTime = new Date();

            const existingEmail = await userOTP.findOne({email:email});
            

            if(existingEmail){
                const updateData = await userOTP.findByIdAndUpdate({_id:existingEmail._id},{
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                },{
                    new:true
                });

                await updateData.save();

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Email Verification OTP",
                    text:`Dear ${username},

                            Thank you for registering with our platform! To complete the email verification process, please use the following One-Time Password (OTP):
                            
                            Your OTP: ${OTP}
                            
                            Please enter this OTP in the verification page to verify your account. If you did not request this OTP, please ignore this email.
                            
                            Thank you for choosing our service!
                    
                    Best regards,
                    CitizenPulse`
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("error",error);
                        res.status(400).json({
                            err:"OTP not sent!"
                        });
                    }
                    else{
                        console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"OTP sent"
                        });
                    }
                });
            }
            else{
                const newOTPData = new userOTP({
                    email: email,
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                });

                await newOTPData.save();

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Email Verification OTP",
                    amp: `<!doctype html>
                            <html ⚡4email>
                            <head>
                                <meta charset="utf-8">
                                <style amp4email-boilerplate>body{visibility:hidden}</style>
                                <script async src="https://cdn.ampproject.org/v0.js"></script>
                            </head>
                            <body>
                                <p>Dear ${username},</p>
                                <p>Thank you for registering with our platform! To complete the email verification process, please use the following One-Time Password (OTP):</p>
                                <p><strong>Your OTP: ${OTP}</strong></p>
                                <p>Please enter this OTP in the verification page to verify your account. If you did not request this OTP, please ignore this email.</p>
                                <p>Thank you for choosing our service!</p>
                                <p>Best regards,<br>CitizenPulse</p>
                            </body>
                            </html>`,
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("error",error);
                        res.status(400).json({
                            err:"OTP not sent!"
                        });
                    }
                    else{
                        console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"OTP sent"
                        });
                    }
                });
            }
        }
        else{
            res.status(400).json({
                err: "User doesn't exists in our database."
            });
        }
    } catch (error) {
        res.status(400).json({
            err: "Invalid Details.",
            error
        })
    }
}

async function loginUser(req,res){
    const {email,otp,submitTime} = req.body;

    if(!otp || !email){
        res.status(400).json({
            err: "Enter your OTP"
        });
    }

    try {
        const userExists = await userOTP.findOne({email:email});
        // console.log(submitTime);
        // console.log(userExists.otpCreationTime);
        const timeDifference = ((submitTime - userExists.otpCreationTime)/1000);
        console.log(timeDifference);
        if(timeDifference<=60 && (userExists.otp === otp)){
            const existingUser = await Users.findOne({email:email});

            //token generation
            const token = await existingUser.generateAuthToken();
            console.log(token);
            res.status(200).json({
                message:"User login successfully done",
                id: existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: email,
                userToken: token,
            });
        }
        else{
            res.status(400).json({
                err: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(400).json({
            err:"Invalid OTP",
            error
        });
    }

}

async function updateUserProfile(req,res){
    const {id,firstName,lastName,email} = req.body;

    try {
        const user = await Users.findById(id);
        if(user){
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
        
            const updatedUser = await user.save();
            console.log("id: ",id);
            console.log("firstName: ",firstName);
            console.log("lastName: ",lastName);
            console.log("email: ",email);
            const token = await updatedUser.generateAuthToken();
            res.status(200).json({
                message: "Profile updated successfully",
                id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                userToken: token
            });
        }
        else{
            res.status(400).json({
                err: "User not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            err: "Error occurred",
            error
        })
    }
}

module.exports = {
    registerUser,
    sendOTP_register,
    sendOTP,
    loginUser,
    updateUserProfile
}