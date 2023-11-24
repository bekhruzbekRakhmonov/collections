import { ICustomField, IRowCustomField } from "../../interfaces/custom-fields";
import api from "../api";

export const createCustomField = async (itemId: string, newCustomFieldData: ICustomField): Promise<IRowCustomField> => {
	try {
		const response = await api.post(`/custom-fields/${itemId}`, newCustomFieldData);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create custom field"
		);
	}
};

export const createCustomFields = async (
	itemsIds: number[],
	newCustomFieldsData: ICustomField[][]
): Promise<IRowCustomField> => {
	try {
		const response = await api.post(
			`/custom-fields/many`,
			{itemsIds, customFields: newCustomFieldsData}
		);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to create custom fields"
		);
	}
};

export const getCustomFields = async (page: number) => {
	try {
		const response = await api.get("/custom-fields");
		return response.data.data.result;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to fetch Custom Fields"
		);
	}
};

export const getCustomField = async (customFieldId: string) => {
	try {
		const response = await api.get(`/custom-fields/${customFieldId}`);
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to fetch custom field with ID ${customFieldId}`
		);
	}
};

export const updateCustomFields = async (
	itemsIds: number[],
	updatedCustomFieldsData: ICustomField[][],
	removedCustomFieldsIds: number[]
): Promise<IRowCustomField> => {
	try {
		const response = await api.put("/custom-fields/many", {
			itemsIds,
			customFields: updatedCustomFieldsData,
			removedCustomFieldsIds,
		});
		return response.data.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message || "Failed to update custom fields"
		);
	}
};

export const deleteCustomField = async (customFieldId: string) => {
	try {
		const response = await api.delete(`/custom-fields/${customFieldId}`);
		return response.data.data.message;
	} catch (error: any) {
		throw new Error(
			error.response?.data.message ||
				`Failed to delete custom field with ID ${customFieldId}`
		);
	}
};
