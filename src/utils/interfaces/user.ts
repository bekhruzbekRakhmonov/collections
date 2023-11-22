export interface IUser {
    id: number;
    name: string;
    email: string;
    role: string;
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