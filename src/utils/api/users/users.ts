import { IRowUser, IUser } from "../../interfaces/user";
import api from "../api";

export const getUser = async (id: number | string) => {
	try {
		const response = await api.get(`/users/${id}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch user"
		);
	}
};

export const getStatisticsByUserId = async (id: number | string) => {
	try {
		const response = await api.get(`/users/statistics/${id}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to fetch statistics");
	}
};

export const updateUser = async (id: number | string, updatedUserData: Partial<IRowUser>) => {
	try {
		const response = await api.patch(`/users/${id}`, {...updatedUserData});
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to update user");
	}
};

export const deleteAccount = async () => {
	try {
		const response = await api.delete("/users/delete-account");
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to delete user"
		);
	}
};