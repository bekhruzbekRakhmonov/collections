import api from "../api";
import { ICollection, IRowCollection } from "../../interfaces/collection";
import { ICustomField } from "../../interfaces/custom-fields";
import { IItem } from "../../interfaces/item";

export const getCollections = async (page: number) => {
	try {
		const response = await api.get("/collections");
		console.log(response.data.data.result);
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to fetch collections");
	}
};

export const getCollection = async (id: number | string): Promise<IRowCollection> => {
	try {
		const response = await api.get("/collections/" + id);
		console.log(response)
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to fetch collection");
	}
};

export const createCollection = async ({collection, customFields, itemCustomFields, items}: {
	collection: ICollection;
	customFields: ICustomField[];
	itemCustomFields: ICustomField[];
	items: IItem[];
}) => {
	try {
		const response = await api.post("/collections", {
			...collection,
			customFields,
			itemCustomFields,
			items,
		});
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create collection"
		);
	}
};

export const updateCollection = async (id: number, data: ICollection) => {
	try {
		const response = await api.patch(`/collections/${id}`, data);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to update collection");
	}
};

export const deleteCollection = async (id: number) => {
	try {
		const response = await api.delete("/collections/" + id);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to delete collection");
	}
};
