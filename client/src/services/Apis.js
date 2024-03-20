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

export const submitFormSP101 = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/submitSP101`,data);
}

export const pendingForms = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending`,data);
}

export const pendingFormsAdmin = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/pending/Admin`,data);
}

export const approvedForms = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approved`,data);
}

export const approvedFormsAdmin = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approved/Admin`,data);
}

export const approveFormRequest = async (data) => {
    return await commonRequest("POST",`${BACKEND_URL}/forms/approve`,data);
}