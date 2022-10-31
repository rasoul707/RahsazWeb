import api, { _axiosWithout } from "./Api";

export const getProducts = (offset, id, search,levels) => {
  return api
    .get("/products/index", {
      params: {
        offset,
        mega_menu_id: id,
        search,
        ...levels
      },
    })
    .then(res => res.data);
};

export const getProductWithId = id => {
  return api.get(`/products/show/${id}`).then(res => res.data);
};

export const sendCom=({id,content,type})=>{
  return api.post(`/products/send-review/${id}`,{},{params:{comment_content :content,type}}).then(res=>res)
}

export const sendAlert=(id,data)=>{
  return api.post(`/products/alert/${id}`,{},{params:data}).then(res=>res)
}