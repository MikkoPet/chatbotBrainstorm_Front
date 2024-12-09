import { jwtDecode } from "jwt-decode";

export const decodeToken = (navigate) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No token found");
        }

        const decodedUser = jwtDecode(token);
        return decodedUser;
    } catch (error) {
        console.error("Error decoding token:", error.message);
        navigate("/login");
        return null;
    }
};
