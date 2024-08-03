import axios from "axios";

const API_URL = process.env.PUBLIC_API_URL as string;

if (!API_URL) {
    throw new Error('API_URL is not set');
}

export async function fetchItems() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch items');
    }
}
