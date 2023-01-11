import axios from "axios";
export const axiosLocationsAPI = axios.create({
  baseUrl: "http://127.0.0.1:8000/locations/",
});

export const axiosAuthAPI = axios.create({
  baseUrl: "http://127.0.0.1:8000/auth/",
});

export const axiosUsersAPI = axios.create({
  baseUrl: "http://127.0.0.1:8000/users/",
});
