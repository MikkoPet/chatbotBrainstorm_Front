import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

/**
 * Login function, use the credentials to store the JWT in localstorage.
 */
export const postUser = async (endpoint, data) => {
    try {
        const response = await apiService.post(endpoint, data);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
    } catch (error) {
        console.error("Error in postUser:", error);
        throw error;
    }
};
