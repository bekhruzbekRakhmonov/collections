import { adminApi as api } from "./api";
import { IItem, IRowItem } from "../../interfaces/item";

export const getItems = async (
	columnName?: string,
	q?: string,
	page: number = 1,
	limit: number = 5,
	order?: string,
	orderBy?: string
): Promise<{ data: IRowItem[]; total: number }> => {
	try {
		const response = await api.get("/items", {
			params: {
				q,
				columnName,
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
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch the item"
		);
	}
};

export const createItem = async (itemData: IItem): Promise<IItem> => {
	try {
		const response = await api.post("/items", itemData);
		return response.data.data;
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
		const response = await api.patch(`/items/${itemId}`, updatedItemData);
		return response.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to update the item"
		);
	}
};
