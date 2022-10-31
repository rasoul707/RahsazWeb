import api from "./Api";

export const sendForms=(data)=>{
return api.post("/forms/store",{},{params:data}).then(res=>res)
}