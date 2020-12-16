const baseURI = "/";
const userURI = baseURI + "/user";
const baseURL = {
  login: baseURI + "/login",
  logout: baseURI + "/logout",
  getPhoneCode: baseURI + "/getPhoneCode",
  getUserInfo: userURI + "/getUserInfo",
  getMenus: userURI + "/getMenus",
};
export default baseURL;
