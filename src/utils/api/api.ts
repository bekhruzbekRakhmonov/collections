import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL + "/api";

const api = axios.create({
	baseURL: API_BASE_URL,
});


api.interceptors.request.use(async (config) => {
	try {
		let accessToken = Cookies.get("accessToken");

		if (accessToken) {
			const expirationTime = new Date(
				jwtDecode<{ exp: number }>(accessToken).exp * 1000
			);

			if (expirationTime <= new Date()) {
				const refreshToken = Cookies.get("refreshToken");

				try {
					const response = await axios.post(
						`${api.getUri()}/auth/refresh`,
						{
							refreshToken,
						}
					);

					accessToken = response.data.accessToken;

					Cookies.set("accessToken", String(accessToken));
				} catch (refreshError) {
					console.error(
						"Error refreshing access token:",
						refreshError
					);
					throw refreshError;
				}
			}

			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	} catch (error) {
		console.error("Interceptor error:", error);
		throw error;
	}
});

export const register = async (userData: any): Promise<AxiosResponse> => {
	const response = await axios.post(
		`${API_BASE_URL}/users`,
		userData
	);
	return response;
};

export const login = async (credentials: any): Promise<AxiosResponse> => {
	const response = await axios.post(
		`${API_BASE_URL}/auth/login`,
		credentials
	);
	return response;
};

export const logout = async (): Promise<AxiosResponse> => {
	const response = await axios.post(`/auth/logout`);
	return response;
};

export default api;