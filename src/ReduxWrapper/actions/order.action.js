import { ADD, DELETE, EMPTY, INITIAL_CART, SET_ORDER } from "ReduxWrapper/types";

export const addToBasket = payload => {
  return {
    type: ADD,
    payload,
  };
};

export const initialCart = payload => {
  return {
    type: INITIAL_CART,
    payload,
  };
};

export const removeCart = payload => {
  return {
    type: DELETE,
    payload,
  };
};

export const setOrder = payload => {
  return {
    type: SET_ORDER,
    payload,
  };
};

export const  emptyBasket=()=>{

    return{
        type:EMPTY,
    }
}
