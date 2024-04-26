import axios from "axios";

const axiosInstance = axios.create(
  {
  baseURL: 'http://127.0.0.1:3658/m1/489853-447852-default',
  timeout: 5000,
  headers: {
		"content-type": "application/json",
	},
}
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
