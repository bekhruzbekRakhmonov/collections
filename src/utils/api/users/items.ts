import { IItem } from "../../interfaces/item";
import api from "../api";

export const getItems = async (page: number) => {
	try {
		const response = await api.get("/items");
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch items"
		);
	}
};

export const getItem = async (itemId: string) => {
	try {
		const response = await api.get(`/items/${itemId}`);
		return response.data.data.item;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to fetch item with ID ${itemId}`
		);
	}
};

export const updateItem = async (itemId: string, updatedData: IItem) => {
	try {
		const response = await api.put(`/items/${itemId}`, updatedData);
		return response.data.data.item;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to update item with ID ${itemId}`
		);
	}
};

export const deleteItem = async (itemId: string) => {
	try {
		const response = await api.delete(`/items/${itemId}`);
		return response.data.data.message;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to delete item with ID ${itemId}`
		);
	}
};
