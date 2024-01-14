const Users = require('../models/userSchema');
const userOTP = require('../models/userOTP');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// email configuration
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

async function registerUser(req,res){
    const {firstName, lastName, email} = req.body;
    if(!firstName || !email){
        res.status(400).json({
            error: "Please fill all the fields."
        });
    }

    try {
        const userExists = await Users.findOne({email:email});

        if(userExists){
            res.status(400).json({
                error: "User already exists in our database."
            })
        }
        else{
            const newUser = new Users({
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            
            const userData = await newUser.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(400).json({
            error: "Invalid Details.",
            error
        })
    }
}

async function sendOTP(req,res){
    const {email} = req.body;

    if(!email){
        res.status(400).json({
            error: "Please enter your email."
        });
    }

    try {
        const userExists = await Users.findOne({email:email});
        const username = userExists.firstName + " " + userExists.lastName;
        //console.log(username);

        if(userExists){
            //console.log(userExists);
            const OTP = Math.floor(100000+Math.random()*900000);
            const existingEmail = await userOTP.findOne({email:email});

            if(existingEmail){
                const updateData = await userOTP.findByIdAndUpdate({_id:existingEmail._id},{
                    otp:OTP
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
                            error:"Email not sent!"
                        });
                    }
                    else{
                        console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"Email sent successfully!"
                        });
                    }
                });
            }
            else{
                const newOTPData = new userOTP({
                    email: email,
                    otp:OTP
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
                            error:"Email not sent!"
                        });
                    }
                    else{
                        console.log("Email sent",info.response);
                        res.status(200).json({
                            message:"Email sent successfully!"
                        });
                    }
                });
            }
        }
        else{
            res.status(400).json({
                error: "User doesn't exists in our database."
            });
        }
    } catch (error) {
        res.status(400).json({
            error: "Invalid Details.",
            error
        })
    }
}

async function loginUser(req,res){
    const {email,otp} = req.body;

    if(!otp || !email){
        res.status(400).json({
            error: "Enter your OTP"
        });
    }

    try {
        const userExists = await userOTP.findOne({email:email});
        if(userExists.otp === otp){
            const existingUser = await Users.findOne({email:email});

            //token generation
            const token = await existingUser.generateAuthToken();
            console.log(token);
            res.status(200).json({
                message:"User login successfully done",
                userToken: token,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: email,
            });
        }
        else{
            res.status(400).json({
                error: "Invalid OTP"
            })
        }
    } catch (error) {
        res.status(400).json({
            error:"Invalid details",
            error
        });
    }

}

module.exports = {
    registerUser,
    sendOTP,
    loginUser
}