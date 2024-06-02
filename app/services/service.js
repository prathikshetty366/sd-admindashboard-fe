import { _getCookies } from '@/utils/cookies';
import axios from 'axios';


const accessToken = _getCookies("accessToken")
export const fetchAllServices = async (page, limit, garageId, startDate, endDate, search, status) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_BACKEND}/service/fetchAllBookings`, {
            params: {
                page,
                limit,
                garageId,
                startDate,
                endDate,
                search,
                status
            },
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};


export const fetchAllGarages = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_LOGIN_URL}/address/getAllGarages`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}