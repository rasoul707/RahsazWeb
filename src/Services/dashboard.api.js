import api from "./Api";

export const getProfile = () => {
  return api.get("/customer/profile/show").then(res => res.data);
};

export const updateProfile = body => {
  return api.put("/customer/profile/update", body).then(res => res);
};

export const updatePassword = body => {
  return api.put("/customer/profile/update-password", body).then(res => res);
};

export const getAddress = () => {
  return api.get("/customer/addresses/index").then(res => res.data);
};

export const editAddress = (id, body) => {
  return api.put(`/customer/addresses/update/${id}`, body).then(res => res);
};

export const postAddress = (body) => {
  return api.post("/customer/addresses/store",body).then(res => res);
};


export const getCoupons=()=>{
    return api.get("/customer/coupons/index").then(res=>res.data)
} 

export const getMessages=()=>{
    return api.get("/customer/internal-messages/index").then(res=>res.data)
} 

export const getComments=()=>{
    return api.get("/customer/comments/index").then(res=>res.data)
    
}

export const getViews=()=>{
    return api.get("/customer/product-visits/index").then(res=>res.data)
    
}

export const getStatics=()=>{
  return api.get("/customer/orders/statics").then(res=>res.data)
  
}