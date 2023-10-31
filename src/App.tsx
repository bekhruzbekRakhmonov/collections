import React from "react";
import { useAuth } from "./auth/AuthContext";
import LoginComponent from "./components/auth/LoginComponent";
import DashboardComponent from "./components/users/dashboard/Dashboard";
import RegisterComponent from "./components/auth/RegisterComponent";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import ProfilePage from "./components/users/pages/Profile";
import ResponsiveAppBar from "./components/users/appbar/AppBar";

const App: React.FC = () => {
	const { isAuthenticated } = useAuth();

	return (
		<div>
			<Router>
				<ResponsiveAppBar/>
				<Routes>
					<Route path="/login" element={<LoginComponent />} />
					<Route path="/register" element={<RegisterComponent />} />
					<Route path="/profile" element={<ProfilePage />} />

					<Route
						path="/dashboard"
						element={
							isAuthenticated ? (
								<DashboardComponent />
							) : (
								// <Navigate to="/login" />
								<DashboardComponent />
							)
						}
					/>
					{/* <Route path="/*" element={<Navigate to="/login" />} /> */}
				</Routes>
			</Router>
		</div>
	);
};

export default App;
