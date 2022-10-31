import api, { _axios, _axiosWithout } from "./Api";

export const loginViaPhone = (phone_number, password) => {
  return _axiosWithout
    .post("login-via-phone", {}, { params: { phone_number, password } })
    .then(res => res);
};

export const sendSmsLogin = phone_number => {
  return _axiosWithout
    .post("/login/otp/send-otp-code", {}, { params: phone_number })
    .then(res => res);
};

export const loginViaOtp = (phone_number, code) => {
  return _axiosWithout
    .post("/login-via-otp", {}, { params: { phone_number, code } })
    .then(res => res);
};

export const forgetPassSms = phone_number => {
  return _axiosWithout
    .post("/forgot-password/send-new-password", {}, { params: phone_number })
    .then(res => res);
};

export const logoutReq = () => {
  return api.post("/logout").then(res => res);
};


export const sendRegisterCode=(phone_number)=>{
  return _axiosWithout.post('/register/send-verification-code',{},{params:{phone_number}}).then(res=>res)
}

export const verifyRegisterCode=(phone_number,code)=>{
  return _axiosWithout.post('/register/verify-phone',{},{params:{phone_number,code}}).then(res=>res)
}

export const registerReq=(data)=>{
  return _axiosWithout.post('/register',data).then(res=>res.data)
}