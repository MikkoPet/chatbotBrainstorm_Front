import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const postData = async (endpoint, data) => {
    try {
        const response = await apiService.get('/' + endpoint + '/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
