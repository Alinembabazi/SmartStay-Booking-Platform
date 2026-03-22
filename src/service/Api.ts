import axios from "axios";

const BASE_URL = "https://airbnb19.p.rapidapi.com/api/v2";
const RAPID_API_HOST = "airbnb19.p.rapidapi.com";
const viteEnv =
	typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {};
const RAPID_API_KEY = viteEnv.VITE_RAPID_API_KEY;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
		"x-rapidapi-host": RAPID_API_HOST,
		"x-rapidapi-key": RAPID_API_KEY,
	},
	timeout: 15000,
});

export async function searchPropertyByPlaceId({placeId, adults = 1, guestFavorite = false, ib = false, currency = "USD",}) {
    const response = await api.get("/searchPropertyByPlaceId", {
		params: {
			placeId,
			adults,
			guestFavorite,
			ib,
			currency,
		},
	});

	return response.data;
}

export default api;