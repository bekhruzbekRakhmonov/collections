import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	ReactElement,
	useEffect,
} from "react";
import * as api from "../utils/api/api";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { IUser } from "../utils/interfaces/user";
import { usersApi } from "../utils/api/users";
import Loading from "../components/loading/Loading";

interface AuthContextProps {
	user: any;
	isAuthenticated: boolean;
	login: (credentials: any) => Promise<void>;
	register: (userData: any) => Promise<void>;
	logout: () => Promise<void>;
	error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
	children,
}: AuthProviderProps): ReactElement => {
	const [user, setUser] = useState<IUser | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	// const isAuthenticated = !!user;

	useEffect(() => {
		const checkAuth = async () => {
			console.log("Auth checking")
			const accessToken = Cookies.get("accessToken");
			const refreshToken = Cookies.get("refreshToken");

			if (accessToken && refreshToken) {
				try {
					const tokenPayload: any = jwtDecode(accessToken);
					const user = await usersApi.getUser(tokenPayload.userId)
					setIsAuthenticated(true);
					setUser(user);
				} catch (error) {
					console.error("Invalid access token:", error);
					Cookies.remove("accessToken");
					Cookies.remove("refreshToken");

				}
			}
			setLoading(false);
		};

		checkAuth();
	}, []); 

	const login = async (credentials: any): Promise<void> => {
		try {
			const response = await api.login(credentials);
			const { accessToken, refreshToken, user } = response.data;

			Cookies.set("accessToken", accessToken);
			Cookies.set("refreshToken", refreshToken);
			setUser(user);
			setIsAuthenticated(true);
			setError(null);
		} catch (error) {
			setError("Invalid credentials. Please try again.");
			throw error;
		}
	};

	const register = async (userData: any): Promise<void> => {
		try {
			const newUser = await api.register(userData);
			setUser(newUser.data);
			setError(null);
		} catch (error) {
			setError("Registration failed. Please try again.");
			throw error;
		}
	};

	const logout = async (): Promise<void> => {
		try {
			setUser(null);
			setError(null);
			Cookies.remove("accessToken");
			Cookies.remove("refreshToken");
		} catch (error) {
			setError("Logout failed. Please try again.");
			throw error;
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, login, register, logout, error }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
