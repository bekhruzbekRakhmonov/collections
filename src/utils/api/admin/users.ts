import { adminApi as api } from "./api";
import { IRowUser, IUser } from "../../interfaces/user";

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    const response = await api.post("/users", userData);
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data.message || "Failed to create a new user"
    );
  }
};


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

export const deleteUser = async (userId: number): Promise<void> => {
	try {
		await api.delete(`/users/${userId}`);
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to delete the user"
		);
	}
};

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
