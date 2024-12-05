import axios from 'axios';

const API_BASE_URL = 'localhost:8000/api';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const postUser = async (endpoint, data) => {
    try {
        console.log(typeof data);
        const response = await apiService.post('/' + endpoint, data);
        console.log(response);
        localStorage.setItem({'token' : response});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};