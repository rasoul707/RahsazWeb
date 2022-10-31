import api, { _axiosWithout } from "./Api";

export const getMegaMenu = () => {
  return _axiosWithout.get("/frontend/mega-menu").then(res => res.data);
};

export const getSite = () => {
  return _axiosWithout.get("/website-setting/index").then(res => res.data);
};

export const getRegister = () => {
  return _axiosWithout
    .get("/general-setting/signup-forms/index")
    .then(res => res.data);
};

export const getAbout = () => {
  return _axiosWithout.get("/frontend/about-us").then(res => res.data);
};

export const postRss = email => {
  return api.post("/rss", {}, { params: email }).then(res => res);
};

export const getMap = () => {
  return _axiosWithout.get("/frontend/map-mega-menu").then(res => res.data);
};

export const getBlogsHome = () => {
  return _axiosWithout.get("/frontend/homepage").then(res => res.data);
};

export const getMapsWithId = id => {
  return api
    .get("/frontend/map", {
      params: {
        mega_menu_id: id,
      },
    })
    .then(res => res.data);
};
