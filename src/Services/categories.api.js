import api from "./Api";

export const getProductCategoriesApi = id =>
  api.get(`/products/categories`, { params: { id } }).then(res => res.data);
