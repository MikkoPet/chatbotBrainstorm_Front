import axios from 'axios';

//import { ContextParser } from "jsonld-context-parser";

const API_BASE_URL = 'http://localhost:8000/api';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchMessages = async (id) => {
    //const myParser = new ContextParser();

    try {
        //const response = await apiService.get('/rooms/' + id);
        const response = await apiService.get(API_BASE_URL + '/rooms/' + id);
        console.log(response);
        return response.data.messages;
    } catch (error) {
        throw error;
    }
};
