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

export const fetchServiceDetailsById = async (serviceId) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_LOGIN_URL}/admin/fetchBookingByServiceId?serviceId=${serviceId}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching service Info:', error);
        throw error;
    }
}


export const updateServiceStatus = async ({ id, serviceStatus }) => {
    console.log(id, serviceStatus, "::::::::::::")
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_ADMIN_BACKEND}/service/updateServiceStatus`,
            {
                serviceID: id,  // Ensure this is the correct key as per the API requirements
                serviceStatus: serviceStatus
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating service Info:', error);
        throw error;
    }
};


export const fileUpload = async (formData) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}/admin/uploadPhoto`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response; // Return response data
    } catch (error) {
        throw error; // Throw the error to propagate it to the caller
    }
};