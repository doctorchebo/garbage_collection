import axios from "axios";
import { useSelector } from "react-redux";
const baseUrl = "http://127.0.0.1:8000";

class AxiosService {
  locationsAPI() {
    return axios.create({
      baseURL: `${baseUrl}/locations/`,
    });
  }

  authAPI() {
    return axios.create({
      baseURL: `${baseUrl}/auth/`,
      method: "POST",
      withCredentials: true,
    });
  }

  usersAPI() {
    return axios.create({
      baseURL: `${baseUrl}/users/`,
    });
  }
}

export default new AxiosService();

export const useAxios = (axiosInstance) => {
  const { token } = useSelector((state) => state.auth.user);

  axiosInstance();

  axiosInstance.interceptors.request.use((req) => {
    const user = jwt_decode(token.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = axios.get(`${baseUrl}/auth/token/refresh`, {
      headers: { Authorization: `Bearer ${token?.refresh}` },
    });

    localStorage.setItem("userDetails", JSON.stringify(response.data));

    saveToken(response.data);
    loadUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });
};
