import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000/api';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

const auth = localStorage.getItem("token");

export const fetchMessages = async (id) => {

    try {
        const response = await apiService.get(API_BASE_URL + '/rooms/' + id, {
            headers: {
                'Authorization': 'Bearer ' + auth,
            }
        });
        return response.data.messages;
    } catch (error) {
        throw error;
    }
};
