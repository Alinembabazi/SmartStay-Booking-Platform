import axios from "axios";

const BASE_URL = "https://airbnb19.p.rapidapi.com/api/v2";
const RAPID_API_HOST = "airbnb19.p.rapidapi.com";
const RAPID_API_KEY = "112f38fbe7e9fmsh0f48342cb0b7f70p105ee3jsn3101129b409alkjhljhgc"

if (!RAPID_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn("Missing VITE_RAPID_API_KEY in environment variables.");
}

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": RAPID_API_HOST,
    "x-rapidapi-key": RAPID_API_KEY,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 429) {
      error.userMessage = "Rate limit reached. Please wait and try again.";
    } else if (error?.response?.status >= 500) {
      error.userMessage = "Server is unavailable. Please try again later.";
    } else {
      error.userMessage = error?.response?.data?.message || "Request failed. Please retry.";
    }
    return Promise.reject(error);
  }
);