import api from "../api";
import { IItem } from "../../interfaces/item";

export const getItems = async (
	page: number = 1,
	limit: number = 5,
	order?: string,
	orderBy?: string
): Promise<{ data: IItem[]; total: number; }> => {
	try {
		const response = await api.get("/items", {
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
			error.response?.data.message || "Failed to fetch items"
		);
	}
};


export const getItem = async (itemId: number): Promise<IItem> => {
	try {
		const response = await api.get(`/items/${itemId}`);
		return response.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch the item"
		);
	}
};

export const deleteItem = async (itemId: number): Promise<void> => {
	try {
		await api.delete(`/items/${itemId}`);
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to delete the item"
		);
	}
};

export const updateItem = async (
	itemId: number,
	updatedItemData: Partial<IItem>
): Promise<IItem> => {
	try {
		const response = await api.put(`/items/${itemId}`, updatedItemData);
		return response.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to update the item"
		);
	}
};