export const initialState = {
  phone_number: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
      case "ADD":
          return{
              ...state,
              ...action.payload
          }

        case "EDIT_NUMBER":
            return{
                ...state,
                phone_number:action.payload
            }
    default:
      return state;
  }
};
