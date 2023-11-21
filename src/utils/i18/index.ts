import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SupportedLanguages } from "./enums";
import { useLocalStorage } from "@uidotdev/usehooks";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
			collections: "Collections",
			collectionName: "Collection Name",
			name: "Name",
			firstName: "First Name",
			lastName: "Last Name",
			email: "Email",
			password: "Password",
			logout: "Logout",
			login: "Login",
			register: "Register",
			edit: "Edit",
			delete: "Delete",
			copy: "Copy",
			"Register here": "Register here",
			"Not registered yet": "Not registered yet",
			"Already registered": "Already registered",
			"Login here": "Login here",
		},
	},
	uz: {
		translation: {
			collections: "Kollektsiyalar",
			collectionName: "Kolektsiya nomi",
			name: "Ism",
			firstName: "Ism",
			lastName: "Familya",
			email: "Email",
			password: "Parol",
			logout: "Chiqish",
			login: "Kirish",
			register: "Ro'yhatdan o'tish",
			edit: "Tahrirlash",
			delete: "O'chirish",
			copy: "Nusxa Olish",
			"Register here": "Bu yerda ro'yxatdan o'ting",
			"Not registered yet": "Hali ro'yxatdan o'tmaganmisiz",
			"Already registered": "Allaqchon ro'yxatdan o'tganmisiz",
			"Login here": "Bu yerdan kiring",
		},
	},
};

const init18n = (language?: SupportedLanguages) => {
	const savedLanguage = localStorage.getItem("language") || SupportedLanguages.EN
	i18n.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			resources,
			lng: language || savedLanguage,

			interpolation: {
				escapeValue: false, // react already safes from xss
			},
		});
};

export default init18n;
