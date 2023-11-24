import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import api from "../api";

export const adminApi = axios.create({
	baseURL: api.getUri() + "/admin",
});

adminApi.interceptors.request.use(async (config) => {
	try {
		let accessToken = Cookies.get("accessToken");

		if (accessToken) {
			const expirationTime = new Date(
				jwtDecode<{ exp: number }>(accessToken).exp * 1000
			);

			if (expirationTime <= new Date()) {
				const refreshToken = Cookies.get("refreshToken");

				try {
					const response = await api.post("/auth/refresh", {
						refreshToken,
					});

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