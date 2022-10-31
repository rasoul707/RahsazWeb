import api from "./Api";

export const addToCart = body => {
  return api.post("/customer/cart/add-product", body).then(res => res);
};

export const getCart = () => {
  return api.get("/customer/cart").then(res => res.data);
};

export const deleteToCart = id => {
  return api
    .post("/customer/cart/delete-product", {
      product_id: id,
    })
    .then(res => res);
};

export const emptyCart = () => {
  return api.put("/customer/cart/empty").then(res => res);
};

export const finalCart = () => {
  return api.post("/customer/cart/finalize", {}).then(res => res);
};

export const getAllOrders = (data) => {
  return api.get(`/customer/orders/index`,{params:data}).then(res => res.data);
};


export const getOrders = id => {
  return api.get(`/customer/orders/${id}`).then(res => res.data);
};

export const orderAddress = (id, address_id) => {
  return api
    .post(`/customer/orders/set-address/${id}`, {}, { params: { address_id } })
    .then(res => res);
};

export const orderDelivery = (id, delivery_type) => {
  return api
    .post(
      `/customer/orders/set-delivery-type/${id}`,
      {},
      { params: { delivery_type } },
    )
    .then(res => res);
};

export const orderCoupon = (id, code) => {
  return api
    .post(`/customer/orders/apply-coupon/${id}`, {}, { params: { code } })
    .then(res => res);
};

export const orderPay = (id, payment_type) => {
  return api
    .post(
      `/customer/orders/set-payment-type/${id}`,
      {},
      { params: { payment_type } },
    )
    .then(res => res);
};

export const orderBank = (
  id,
  {
    document_created_at,
    bank_receipt_number,
    last_four_digit_of_card,
    issue_tracking_number,
    bank_name,
    bank_receipt_image_id,
  },
) => {
  return api
    .post(
      `/customer/orders/set-bank-payment-details/${id}`,
      {},
      {
        params: {
          document_created_at,
          bank_receipt_number,
          last_four_digit_of_card,
          issue_tracking_number,
          bank_name,
          bank_receipt_image_id,
        },
      },
    )
    .then(res => res);
};

export const uploadImage = image => {
  let formData = new FormData();
  formData.append("image", image);
  return api.post("/customer/upload-image", formData).then(res => res.data);
};

