import { ADD, DELETE, EMPTY, INITIAL_CART, SET_ORDER } from "ReduxWrapper/types";

const initialState = {
  total_price: 0,
  items: [],
  currentOrder:null
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD:
      const find = state.items.findIndex(
        item => item.product_id === payload.product_id,
      );
      let findedItem = find >= 0 ? state.items[find] : null;
      let array = [];
      if (findedItem) {
        let item = {
          ...state.items[find],
          count:payload.count,
        };
        array = [...state.items];
        array[find] = item;
      } else {
        array = [...state.items, payload];
      }
      return {
        ...state,
        items: array,
      };
    case INITIAL_CART:
      return {
        ...state,
        ...payload,
      };

    case DELETE:
      const filtered = state.items.filter(item => item.product_id != payload);
      console.log("payload", payload, filtered);
      return {
        ...state,
        items: filtered,
      };
      case SET_ORDER:
        return{
          ...state,
          currentOrder:payload
        }
      
      case EMPTY:
        return{
        ...initialState
        }

    default:
      return state;
  }
};
