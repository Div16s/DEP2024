import prisma from '../db/dbConfig.js';
import otpGenerator from 'otp-generator';
import sendOTP from '../utils/sendOTP.js'
import generateToken from '../utils/generateToken.js'

const userSignup = async (req,res) => {
    const {name,email} = req.body;
    if(!name || !email){
        return res.status(404).json({
            message: "Please provide all required details"
        });
    }

    try {
        const userExists = await prisma.user.findFirst({
            where: {email: email}
        });

        if(userExists){
            res.status(400).json({
                err: "User already exists in our database"
            });
        }
        else{
            const OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            const otpCreationTime = new Date();
            
            const existingEmail = await prisma.userOTP.findFirst({
                where: { email: email }
            });
            
            if(existingEmail){
                await prisma.userOTP.update({
                    where: { id: existingEmail.id },
                    data: {
                        otp: OTP,
                        otpCreationTime: otpCreationTime
                    }
                });

                console.log("OTP data saved");

                sendOTP(name,email,OTP,(error, message) => {
                    if (error) {
                        return res.status(404).json({ error: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                });
            }
            else{
                await prisma.userOTP.create({
                    data: {
                        email: email,
                        otp: OTP,
                        otpCreationTime: otpCreationTime
                    }
                });

                console.log("New OTP data saved");

                sendOTP(name,email,OTP,(error, message) => {
                    if (error) {
                        return res.status(404).json({ error: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
        console.log("Error in userSignup: ", error.message);
    }
}

const verifyOTP_userSignup = async (req,res) => {
    const {name,email,role,otp} = req.body;
    if(!otp){
        res.status(404).json({
            error: "Enter your OTP"
        });
    }

    try {
        const userExists = await prisma.userOTP.findFirst({
                where: {email:email}}
        );

        console.log("Existing OTP: ",userExists.otp);
        console.log("Entered OTP: ",otp);
        
        //const timeDifference = ((submitTime - userExists.otpCreationTime)/1000);
        //console.log(timeDifference);
        if((userExists.otp === otp)){
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    role
                }
            });

            //token generation
            const token = generateToken(newUser.email);
            console.log(token);
            res.status(200).json({
                message:"User registration successfully done",
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                userToken: token,
            });
        }
        else{
            res.status(404).json({
                error: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
        console.log("Error in verifyOTP_userSignup: ",error.message);
    }

}

const userLogin = async (req,res) => {
    const {email} = req.body;

    if(!email){
        res.status(404).json({
            error: "Please enter your email."
        });
    }

    try {
        const userExists = await prisma.user.findFirst({
            where: {email:email}
        });

        if(userExists){
            const username = userExists.name;
            const OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            
            const otpCreationTime = new Date();

            const existingEmail = await prisma.userOTP.findFirst({
                where: {email:email}
            });
            

            if(existingEmail){
                const updateData = await prisma.userOTP.update({
                    where: {email: email},
                    data: {
                        otp:OTP,
                        otpCreationTime: otpCreationTime
                    }
                });

                sendOTP(username,email,OTP,(error,message)=>{
                    if (error) {
                        return res.status(404).json({ error: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                })   
            }
            else{
                const newOTPData = await prisma.userOTP.create({
                    email: email,
                    otp:OTP,
                    otpCreationTime: otpCreationTime
                });

                sendOTP(username,email,OTP,(error,message)=>{
                    if (error) {
                        return res.status(404).json({ error: "OTP not sent!" });
                    } else {
                        return res.status(200).json({ message: "OTP sent" });
                    }
                })
            }
        }
        else{
            res.status(400).json({
                error: "User doesn't exists in our database."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
        console.log("Error in userLogin: ",error.message);
    }
}

const verifyOTP_userLogin = async (req,res) => {
    const {email,otp} = req.body;
    if(!otp){
        res.status(404).json({
            error: "Enter your OTP"
        });
    }

    try {
        const userExists = await prisma.userOTP.findFirst({
            where: {email:email}
        });
        // console.log(submitTime);
        // console.log(userExists.otpCreationTime);
        // const timeDifference = ((submitTime - userExists.otpCreationTime)/1000);
        //console.log(timeDifference);
        if((userExists.otp === otp)){
            const existingUser = await prisma.user.findFirst({
                where: {email:email}
            });

            //token generation
            const token = generateToken(userExists.email);

            res.status(200).json({
                message:"User login successfully done",
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                userToken: token
            });
        }
        else{
            res.status(404).json({
                error: "Invalid OTP"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
        console.log("Error in verifyOTP_userLogin: ",error.message);
    }
}

const updateUserProfile = async (req,res) => {
    const {name,email} = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {email: email}
        });
        if(user){
            await prisma.user.update({
                where: { email: email },
                data: { name: name }
            });

            res.status(200).json({
                message: "Profile updated successfully",
            });
        }
        else{
            res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export {userSignup, verifyOTP_userSignup, userLogin, verifyOTP_userLogin, updateUserProfile}