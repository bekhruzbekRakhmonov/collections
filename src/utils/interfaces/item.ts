import { ICustomField, IRowCustomField } from "./custom-fields";
import { ILike } from "./like";
import { IRowUser } from "./user";

export interface IItem {
	id?: number;
	name: string;
	custom_fields: ICustomField[];
	likes?: ILike[];
	tags: string;
	[key: string]:
		| string
		| number
		| boolean
		| Date
		| ICustomField[]
		| ILike[]
		| string[]
		| undefined;
}

export interface IRowItem {
	id: number;
	name: string;
	owner: IRowUser;
	custom_fields?: IRowCustomField[];
	likes?: ILike[];
	tags: string;
	created_at: string;
	updated_at: string;
}