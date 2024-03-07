import { commonRequest } from "./ApiCall";
const BACKEND_URL = "http://localhost:5000"

export const sendOTP_register = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/users/signup`,data);
}

export const registerUser = async(data)=>{
    return await commonRequest("POST",`${BACKEND_URL}/users/verifyOTP_signup`,data);
}

export const sendOTP = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/users/login`,data);
}

export const verifyUser = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/users/verifyOTP_login`,data);
}

export const updateUser = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/users/update`,data);
}