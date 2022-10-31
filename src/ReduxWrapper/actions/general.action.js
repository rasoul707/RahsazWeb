import { HANDLE_SHOW_MAIN_OVERLAY } from "ReduxWrapper/types";

export const handleShowMainLayout = showLayout => dispatch =>
  dispatch({
    type: HANDLE_SHOW_MAIN_OVERLAY,
    payload: showLayout,
  });
