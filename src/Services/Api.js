import axios from "axios";
import { store } from "ReduxWrapper";
import { logoutAction } from "ReduxWrapper/actions";
import { toast } from "Utils/toast";

// Configs
const configs = {
  baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
};

const handleError = error => {
  return Promise.reject(error);
};

// Fetch api type A: axios just with header config
const _axios = axios.create(configs);

const _axiosWithout = axios.create(configs);

// Fetch api type B: axios with authorization, header configs, ...
const api = axios.create(configs);

const getFromStore = () => {
  let state = store.getState();
  return {
    token: state?.user?.token ? `Bearer ${state?.user?.token}` : "",
    userRole: state?.user?.user?.type,
  };
};

api.interceptors.request.use(config => {
  const { token, userRole } = getFromStore();
  config.headers = { ...config.headers, authorization: token };

  return config;
}, handleError);

api.interceptors.response.use(
  response => {
    if (response?.status === 401) {
      store.dispatch(logoutAction());
    }
    return response;
  },
  error => {
    showError(error);
    console.log("error", error.response);
    return Promise.reject(error); //when use showError, we dont need to write this line of code
  },
);
_axiosWithout.interceptors.response.use(
  response => {
    if (response?.status === 401) {
      store.dispatch(logoutAction());

    }
    return response;
  },
  error => {
    showError(error);
    console.log("error", error.response);
    return Promise.reject(error); //when use showError, we dont need to write this line of code
  },
);

_axios.interceptors.response.use(
  response => {
    if (response?.status === 401) {
      store.dispatch(logoutAction());

    }
    return response;
  },
  error => {
    showError(error);
    return Promise.reject(error); //when use showError, we dont need to write this line of code
  },
);
export const showError = ({ response }) => {
  const messages = [];
  if (response?.status === 401) {
    store.dispatch(logoutAction());

    return;
  }
  if (!response) {
    messages.push("Network error");
  } else {
    switch (response?.status) {
      case 422:
        let text = Object.values(response.data.errors);
        messages.push(...text);
        break;
      case 404:
        messages.push("404 Not Found");
        break;
      case 500:
        messages.push(response?.data?.message || "500 Server Error");
        break;
      default:
        messages.push(`Error ${response.status}`);
        break;
    }
  }
  messages.map(message => toast(message, "error"));
};

// Fetch api type C: axios with authorization and header configs, without routes configs
const _axiosWithAuth = axios.create(configs);

_axiosWithAuth.interceptors.request.use(config => {
  const { token } = getFromStore();

  config.headers = { ...config.headers, authorization: token };
  return config;
}, handleError);

// _axiosWithAuth.interceptors.response.use(...handleWholeErros);
_axiosWithAuth.interceptors.response.use(
  response => {
    if (response?.status === 401) {
      // your failure logic
    }
    return response;
  },
  error => {
    showError(error);
    return Promise.reject(error); //when use showError, we dont need to write this line of code
  },
);

// Fetch api type D: axios with authorization and header configs, without error message
const _axiosWithoutDefaultError = axios.create(configs);

_axiosWithoutDefaultError.interceptors.request.use(config => {
  const { token, userRole } = getFromStore();

  config.headers = { ...config.headers, authorization: token };
  config.baseURL = `${process.env.REACT_APP_URL_BASE}/${userRole}`;
  return config;
}, handleError);

export { _axiosWithAuth, _axios, _axiosWithoutDefaultError, _axiosWithout };
export default api;

// import axios from "axios";
// import store from "Store/store";
// import { toast } from "Utils/toast";
// console.log("process.env.NEXT_PUBLIC_URL_BASE: ", process.env);
// const api = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/api`,

//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const apiwithoutUserRole = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_URL_BASE}/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const getFromStore = () => {
//   const state = store.getState();
//   return {
//     token: state?.user?.token ? `Bearer ${state.user.token}` : "",
//   };
// };

// api.interceptors.request.use(
//   config => {
//     const { token } = getFromStore();
//     config.headers = { ...config.headers, authorization: token };
//     config.headers = { ...config.headers };
//     config.baseURL = `${process.env.NEXT_PUBLIC_URL_BASE}/api`;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// api.interceptors.response.use(
//   response => {
//     if (response.status === 401) {
//       // your failure logic
//     }
//     return response;
//   },
//   error => {
//     showError(error);
//     return Promise.reject(error); //when use showError, we dont need to write this line of code
//   },
// );

// apiwithoutUserRole.interceptors.response.use(
//   response => {
//     if (response.status === 401) {
//       // your failure logic
//     }
//     return response;
//   },
//   error => {
//     showError(error);
//     return Promise.reject(error); //when use showError, we dont need to write this line of code
//   },
// );

// export const showError = ({ response }) => {
//   const messages = [];
//   if (!response) return messages.push("Network error");
//   switch (response?.status) {
//     case 422:
//       let text = Object.values(response.data.errors);
//       messages.push(...text);
//       break;
//     case 404:
//       messages.push("404 Not Found");
//       break;
//     case 500:
//       messages.push("500 Server Error");
//       break;
//     default:
//       messages.push(`Error ${response.status}`);
//       break;
//   }
//   messages.map(message => toast(message, "error"));
// };

// export { apiwithoutUserRole };
// export default api;
