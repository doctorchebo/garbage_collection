import axios from "axios";
export const locationsAPI = axios.create({
  baseUrl: "http://127.0.0.1:8000/locations/",
});

export const authAPI = axios.create({
  baseUrl: "http://127.0.0.1:8000/auth/",
  withCredentials: true,
});

export const usersAPI = axios.create({
  baseUrl: "http://127.0.0.1:8000/users/",
});
