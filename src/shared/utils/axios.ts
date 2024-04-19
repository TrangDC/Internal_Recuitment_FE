import axios from "axios";

const axiosInstance = axios.create(
  {
  baseURL: 'https://api.mockfly.dev/mocks/74fd0c52-92b5-4518-a76b-f0f6ef3239b4',
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
