import axios from 'axios';
import { _getCookies } from '@/utils/cookies';

export const signupCustomer = async (phoneNumber, roleId) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}/users/signup`, {
            phoneNumber,
            roleId
        }, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};


export const updateCustomer = async (userData, customerToken) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}/users/updateUser`, userData, {
            headers: {
                'Authorization': `Bearer ${customerToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error during user update:', error);
        throw error;
    }
};


export const fetchRcInfo = async (registration, customerToken) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}/vehicle/fetchRcInfo`, {
            registration
        }, {
            headers: {
                'Authorization': `Bearer ${customerToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching RC info:', error);
        throw error;
    }
};


export const assignVehicleToCustomer = async (vehicleId, customerToken) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}/vehicle/assignVehicleToCustomer`, {
            vehicleId
        }, {
            headers: {
                'Authorization': `Bearer ${customerToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error assigning vehicle to customer:', error);
        throw error;
    }
};

export const createBooking = async (serviceData, customerToken) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_LOGIN_URL}/service/createBooking`,
            serviceData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${customerToken}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}


export const fetchAvailableSlots = async (garageId, customerToken) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_LOGIN_URL}/service/available-slots?garageId=${garageId}`,
            {
                headers: {
                    'Authorization': `Bearer ${customerToken}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching available slots:', error);
        throw error;
    }
}