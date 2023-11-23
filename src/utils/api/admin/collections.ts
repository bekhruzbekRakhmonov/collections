import api from "../api";
import { ICollection, IRowCollection } from "../../interfaces/collection";


export const getCollections = async (
	page: number = 1,
	limit: number = 5,
	order?: string,
	orderBy?: string
): Promise<{ data: IRowCollection[]; total: number; }> => {
	try {
		const response = await api.get("/collections/admin", {
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
			error.response?.data.message || "Failed to fetch collections"
		);
	}
};


export const getCollection = async (
	collectionId: number
): Promise<ICollection> => {
	try {
		const response = await api.get(`/collections/${collectionId}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch the collection"
		);
	}
};

export const deleteCollection = async (collectionId: number): Promise<void> => {
	try {
		await api.delete(`/collections/${collectionId}`);
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to delete the collection"
		);
	}
};

export const updateCollection = async (
	collectionId: number,
	updatedCollectionData: Partial<ICollection>
): Promise<ICollection> => {
	try {
		const response = await api.put(
			`/collections/${collectionId}`,
			updatedCollectionData
		);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to update the collection"
		);
	}
};