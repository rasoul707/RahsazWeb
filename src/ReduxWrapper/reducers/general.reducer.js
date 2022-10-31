import { HANDLE_SHOW_MAIN_OVERLAY } from "ReduxWrapper/types";

const initialState = {
  showMainOverlay: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_SHOW_MAIN_OVERLAY:
      return { ...state, showMainOverlay: payload };
    default:
      return { ...state };
  }
};
