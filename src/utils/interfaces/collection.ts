import { ICustomField } from "./custom-fields";
import { IItem, IRowItem } from "./item";
import { IUser } from "./user";

export interface ICollection {
	name: string;
	topic: string;
	photo: string;
	description: string;
}

export interface IRowCollection {
	id: number;
	name: string;
	topic: string;
	photo: string;
	description: string;
	created_at: string;
	owner: IUser;
	items: IRowItem[];
	custom_fields: ICustomField[];
}