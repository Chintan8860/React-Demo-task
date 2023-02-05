import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const login = (name, phoneNumber) => {
  return axios
    .post(API_URL + "signin", {
      name,
      phoneNumber,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
