import { IItem, IRowItem } from "../../interfaces/item";
import api from "../api";

export const createItem = async (collection_id: number, {name, tags}: IItem): Promise<IRowItem> => {
	try {
		const response = await api.post(`/items`, { collection_id, name, tags });
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create item"
		);
	}
};

export const createItems = async (
	collection_id: number,
	newItemsData: IItem[]
): Promise<IRowItem[]> => {
	try {
		const response = await api.post(`/items/many`, {collection_id, items: newItemsData});
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create items"
		);
	}
};

export const getItems = async (page: number) => {
	try {
		const response = await api.get("/items", {params: {page}});
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch items"
		);
	}
};

export const getItemsByCollectionId = async (collection_id: number) => {
	try {
		const response = await api.get(`/items/${collection_id}/collections`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch items"
		);
	}
};

export const getItem = async (itemId: string) => {
	try {
		const response = await api.get(`/items/${itemId}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to fetch item with ID ${itemId}`
		);
	}
};

export const updateItem = async (itemId: string | number, updatedData: IRowItem) => {
	try {
		const response = await api.patch(`/items/${itemId}`, updatedData);
		return response.data.data.item;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to update item with ID ${itemId}`
		);
	}
};

export const updateItems = async (collection_id: number, updatedItemsData: IItem[], removedItemsIds: number[]): Promise<IItem[]> => {
	try {
		const response = await api.put("/items/many", {
			collection_id,
			items: updatedItemsData,
			removedItemsIds,
		});
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				"Failed to update items"
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
