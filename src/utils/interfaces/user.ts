export interface IUser {
	id: number;
	name: string;
	email: string;
	role: "admin" | "user";
	status: string;
}

export interface IRowUser {
	id: number;
	name: string;
	email: string;
	role: 'admin' | 'user';
	status: 'active' | 'blocked';
    password: string;
}

export interface IUserStatistics {
    collections_count: number;
    items_count: number,
    likes_count: number,
}