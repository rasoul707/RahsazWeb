import api from "./Api"

export const getAllBlogs=(offset=0)=>{
    return api.get('/blog/index',{params:{offset}}).then(res=>res.data)
}

export const getABlog=(id=1)=>{
    return api.get(`/blog/show/${id}`).then(res=>res.data)
}