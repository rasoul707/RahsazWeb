// Reducers
import userReducer from "./reducers/user.reducer";
import generalReducer from "./reducers/general.reducer";

import { combineReducers } from "redux";
import { orderReducer } from "./reducers/order.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  general: generalReducer,
  cart:orderReducer
});

export default rootReducer;
