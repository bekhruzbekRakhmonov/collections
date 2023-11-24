import api from "../api";
import { ICollection, IRowCollection } from "../../interfaces/collection";
import { ICustomField } from "../../interfaces/custom-fields";

export const getCollections = async (page: number = 1) => {
	try {
		const response = await api.get("/collections", {
			params: {
				page
			}
		});
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to fetch collections");
	}
};

export const getCollectionsByUserId = async (userId: number, page: number = 1, limit: number = 10) => {
	try {
		const response = await api.get(`/collections/${userId}/list`, {
			params: {
				page,
				limit
			}
		});
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch collections"
		);
	}
};

export const getCollection = async (id: number | string): Promise<IRowCollection> => {
	try {
		const response = await api.get("/collections/" + id);
		return response.data.data;
	} catch (error: any) {
		throw new Error(error.response?.data.message || "Failed to fetch collection");
	}
};

export const createCollection = async ({collection, customFields}: {
	collection: ICollection;
	customFields: ICustomField[];
}): Promise<IRowCollection> => {
	try {
		const response = await api.post("/collections", {
			...collection,
			customFields,
		});
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create collection"
		);
	}
};

export const updateCollection = async (
	id: number,
		collection: ICollection,
		customFields: ICustomField[],
		removedCustomFieldsIds: number[],
) => {
	try {
		const response = await api.patch(`/collections/${id}`, {
			...collection,
			customFields,
			removedCustomFieldsIds,
		});
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to update collection"
		);
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
