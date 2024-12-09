import { jwtDecode } from 'jwt-decode';

export const decodeToken = async (user, navigate) => {
    try {
        const token = localStorage.getItem("token");
        if (!token || typeof token != String) {
            throw new Error("No token found");
        }
        user = jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error.message);
        navigate('/login');
    }

}