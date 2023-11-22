import { IRowUser, IUser } from "./user";

export interface IComment {
    owner: string;
    content: string;
}

export interface IRowComment {
	id: number;
	owner: IRowUser;
	content: string;
	created_at: string;
    updated_at: string;
}