const mongoose = require('mongoose');
const zod = require('zod');

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
    }
});

//user otp model
const userOTP = new mongoose.model("userOTPs",userOTPSchema);

module.exports = userOTP;