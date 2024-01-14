import { commonRequest } from "./ApiCall";
const BACKEND_URL = "http://localhost:3000"


export const registerUser = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/user/register`,data);
}

export const sendOTP = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/user/sendOTP`,data);
}

export const verifyUser = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/user/login`,data);
}