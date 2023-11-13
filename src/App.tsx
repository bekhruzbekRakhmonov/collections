import React from "react";
import { useAuth } from "./auth/AuthContext";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import ResponsiveAppBar from "./components/users/appbar/AppBar";
import ProfilePage from "./pages/users/profile/Profile";
import Feed from "./pages/users/feed/Feed";
import ResponsiveDrawer from "./pages/admin/dashboard/Drawer";
import CreateCollection from "./pages/users/collection/CreateCollections";
import ShowCollection from "./pages/users/collection/ShowCollection";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ErrorBoundary from "./ErrorBoundary";

const App: React.FC = () => {
	const { isAuthenticated } = useAuth();
	console.log(isAuthenticated)
	return (
		<Router>
			<ErrorBoundary
			>
				<ResponsiveAppBar />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route
						path="/"
						element={
							isAuthenticated ? (
								<Feed />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route path="/profile" element={<ProfilePage />} />
					<Route
						path="/create-collection"
						element={<CreateCollection />}
					/>
					<Route
						path="/show-collection/:id"
						element={<ShowCollection />}
					/>
					<Route path="/admin" element={<ResponsiveDrawer />} />
					<Route path="/*" element={<Navigate to="/login" />} />
				</Routes>
			</ErrorBoundary>
		</Router>
	);
};

export default App;
