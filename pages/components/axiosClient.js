import axios from "axios";
export const locationsAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/locations/",
});

export const authAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/auth/",
  method: "POST",
  withCredentials: true,
});

export const usersAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/users/",
});
