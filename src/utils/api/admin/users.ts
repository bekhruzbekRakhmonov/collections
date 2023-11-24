import { adminApi as api } from "./api";
import { IRowUser, IUser } from "../../interfaces/user";

// Get a list of users
export const getUsers = async (
	page: number = 1,
	limit: number = 5,
	order?: string,
	orderBy?: string
): Promise<{ data: IRowUser[]; total: number }> => {
	try {
		const response = await api.get("/users", {
			params: {
				page,
				limit,
				order,
				orderBy,
			},
		});
		return {
			data: response.data.data.result,
			total: response.data.data.total,
		};
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch users"
		);
	}
};

// Get a single user by ID
export const getUser = async (userId: number): Promise<IRowUser> => {
	try {
		const response = await api.get(`/users/${userId}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch the user"
		);
	}
};

// Delete a user by ID
export const deleteUser = async (userId: number): Promise<void> => {
	try {
		await api.delete(`/users/${userId}`);
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to delete the user"
		);
	}
};

// Update user information
export const updateUser = async (
	userId: number,
	updatedUserData: Partial<IUser>
): Promise<IUser> => {
	try {
		const response = await api.patch(`/users/${userId}`, updatedUserData);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to update the user"
		);
	}
};
