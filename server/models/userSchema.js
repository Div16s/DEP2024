const mongoose = require('mongoose');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const emailSchema = zod.string().email();

//defining schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
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
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
});

//token generation
userSchema.methods.generateAuthToken = async function(req,res){
    try{
        let newToken = jwt.sign({email:this.email},process.env.JWT_SECRET,{
            expiresIn:"1d"
        });

        this.tokens = this.tokens.concat({token:newToken});
        await this.save();

        return newToken;
    }
    catch(error){
        res.status(400).json({
            error
        })
    }
}

//creating model
const Users = new mongoose.model("users",userSchema);

module.exports = Users;