import axios from 'axios';
import { jwtDecode } from 'jwt-decode';




const API_BASE_URL = 'http://localhost:8000/api';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

const auth = localStorage.getItem("token");

export const fetchRooms = async () => {

    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    try {
        const response = await apiService.get(API_BASE_URL + '/rooms'
            // , 
            // {
            // headers: {
            //     'Authorization': 'Bearer ' + auth,
            // }
        // }
    );


    let filteredRes = response.data.member.filter((room) => 
        room.users.some(roomUser => roomUser.id === user.id)
    ); 
                
        return filteredRes;
    } catch (error) {
        throw error;
    }
};
