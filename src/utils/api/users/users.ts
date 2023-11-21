import api from "../api";

export const getUser = async (id: number | string) => {
	try {
		const response = await api.get("/users/" + id);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch user"
		);
	}
};