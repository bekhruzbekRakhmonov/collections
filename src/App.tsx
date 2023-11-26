import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Feed from "./pages/users/feed/Feed";
import CreateCollection from "./pages/users/collection/CreateCollections";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoutes from "./auth/PrivateRoutes";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import ShowCollection from "./pages/users/collection/ShowCollection";
import ProfilePage from "./pages/users/profile/Profile";
import EditCollection from "./pages/users/collection/EditCollection";
import ResponsiveAppBar from "./components/users/appbar/AppBar";
import { useLocalStorage } from "@uidotdev/usehooks";
import { SupportedLanguages } from "./utils/i18/enums";
import init18n from "./utils/i18";
import UserSettings from "./pages/users/profile/UserSettings";
import { Admin } from "./pages/admin";
import SearchResult from "./pages/users/search/SearchResult";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NotFoundPage from "./components/common/error/NotFound";
import ShowItem from "./pages/users/item/ShowItem";
import PrivateAdminRoutes from "./auth/PrivateAdminRoutes";
import Logout from "./pages/auth/Logout";
import EditItem from "./pages/users/item/EditItem";
init18n()

const App: React.FC = () => {
	const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
	const [language, setLanguage] = useLocalStorage<SupportedLanguages>("language", SupportedLanguages.EN);

	const location = window.location;

	const handleDarkModeToggle = () => {
		setDarkMode((prevDarkMode) => !prevDarkMode);
	};

	useEffect(() => {
		init18n(language);
	}, [language]);

	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia(
			"(prefers-color-scheme: dark)"
		);
		const handleChange = (event: MediaQueryListEvent) => {
			setDarkMode(event.matches);
		};

		darkModeMediaQuery.addEventListener("change", handleChange);
		return () => {
			darkModeMediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	const theme = createTheme({
		palette: {
			mode: darkMode ? "dark" : "light",
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				{!location.pathname.includes("admin") && (
					<ResponsiveAppBar
						handleDarkModeToggle={handleDarkModeToggle}
						darkMode={darkMode}
						language={language}
						setLanguage={setLanguage}
					/>
				)}

				<ErrorBoundary>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						<Route path="/" element={<Feed />} />
						<Route
							path="/show-collection/:id"
							element={<ShowCollection />}
						/>
						<Route path="/search" element={<SearchResult />} />
						<Route element={<PrivateRoutes />}>
							<Route path="/logout" element={<Logout />} />
							<Route
								path="/create-collection"
								element={<CreateCollection />}
							/>
							<Route
								path="/edit-collection/:id"
								element={<EditCollection />}
							/>
							<Route
								path="/users/:id"
								element={<ProfilePage />}
							/>
							<Route
								path="/show-item/:id"
								element={<ShowItem />}
							/>
							<Route
								path="/edit-item/:id"
								element={<EditItem />}
							/>
							<Route
								path="/settings"
								element={<UserSettings />}
							/>
						</Route>
						<Route element={<PrivateAdminRoutes />}>
							<Route path="/admin" element={<Dashboard />} />
							<Route
								path="/admin/add-user"
								element={<Admin.AddUser />}
							/>

							<Route
								path="/admin/add-item"
								element={<Admin.AddItem />}
							/>
							<Route
								path="/admin/add-custom-field"
								element={<Admin.AddCustomField />}
							/>
							<Route
								path="/admin/edit-collection/:id"
								element={<Admin.EditCollection />}
							/>
							<Route
								path="/admin/edit-item/:id"
								element={<Admin.EditItem />}
							/>
							<Route
								path="/admin/edit-user/:id"
								element={<Admin.EditUser />}
							/>
							<Route
								path="/admin/edit-comment/:id"
								element={<Admin.EditComment />}
							/>
							<Route
								path="/admin/edit-custom-field/:id"
								element={<Admin.EditCustomField />}
							/>
						</Route>
						<Route path="/*" element={<NotFoundPage />} />
					</Routes>
				</ErrorBoundary>
			</Router>
		</ThemeProvider>
	);
};

export default App;
