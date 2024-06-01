import { _getCookies } from '@/utils/cookies';
import axios from 'axios';


const accessToken = _getCookies("accessToken")
export const fetchAllServices = async (page, limit, garageId, startDate, endDate, search) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_BACKEND}/service/fetchAllBookings`, {
            params: {
                page,
                limit,
                garageId,
                startDate,
                endDate,
                search
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
