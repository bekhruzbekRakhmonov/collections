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
import SideBar from "./pages/admin/dashboard/Sidebar";
import EditCollection from "./pages/users/collection/EditCollection";
import ResponsiveAppBar from "./components/users/appbar/AppBar";
import { useLocalStorage } from "@uidotdev/usehooks";
import { SupportedLanguages } from "./utils/i18/enums";
import init18n from "./utils/i18";
init18n()

const App: React.FC = () => {
	const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
	const [language, setLanguage] = useLocalStorage<SupportedLanguages>("language", SupportedLanguages.EN);

	const location = window.location;
	console.log(location.pathname)

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
			// Add your custom theme colors here
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
						<Route element={<PrivateRoutes />}>
							<Route
								path="/create-collection"
								element={<CreateCollection />}
							/>
							<Route
								path="/edit-collection/:id"
								element={<EditCollection />}
							/>
							<Route path="/profile" element={<ProfilePage />} />
						</Route>
						<Route element={<PrivateRoutes />}>
							<Route path="/admin" element={<SideBar />} />
						</Route>
					</Routes>
				</ErrorBoundary>
			</Router>
		</ThemeProvider>
	);
};

export default App;
