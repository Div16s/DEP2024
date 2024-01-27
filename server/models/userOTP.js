const mongoose = require('mongoose');
const zod = require('zod');
const bcrypt = require('bcryptjs');

const emailSchema = zod.string().email();

const userOTPSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                try {
                    emailSchema.parse(value);
                    return true;
                } catch (error) {
                    throw new Error("Not a valid email.");
                }
            }
        },
    },
    otp:{
        type: String,
        required: true
    },
    otpCreationTime: {
        type: Date,
        required: true,
    },
});

// //function for password encryption
// userOTPSchema.pre('save', async function (next){
//     if(!this.isModified('otp')){
//         next();
//     }

//     const salt = await bcrypt.genSalt(7);
//     this.otp = await bcrypt.hash(this.otp,salt);
// });

// //function for password decryption
// userOTPSchema.methods.matchOTP = async function (enteredOTP){
//     return await bcrypt.compare(enteredOTP,this.otp);
// };

//user otp model
const userOTP = new mongoose.model("userOTPs",userOTPSchema);

module.exports = userOTP;