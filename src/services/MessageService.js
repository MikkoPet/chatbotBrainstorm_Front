import axios from 'axios';

const API_BASE_URL = 'https://api.cool.com';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchMessages = async (id) => {
    try {
        const response = await apiService.get('/endpoint/' + {id});
        return response.data;
    } catch (error) {
        throw error;
    }
};
