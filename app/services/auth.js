import { _getCookies } from '@/utils/cookies';
import axios from 'axios';

const accessToken = _getCookies("accessToken")
/**
 * Function to sign up a user with phone number, role ID, and referral code.
 * 
 * @param {string} phoneNumber - The phone number of the user.
 * @param {string} roleId - The role ID of the user.
 * @param {string} referralCode - The referral code.
 * @returns {Promise} - The axios promise with the server response.
 */
export const signupWithPhoneNumber = async (phoneNumber) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}/users/superAdminLogin`, {
            phoneNumber
        }, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // API responded with a status code outside the 2xx range
            throw new Error(error.response.data?.message || 'Failed to send OTP');
          } else if (error.request) {
            // Request was made, but no response received
            throw new Error('No response from the server. Please try again later.');
          } else {
            // Something else caused the error
            throw new Error('An unexpected error occurred.');
          }
    }
};



export const verifyOtp = async (phoneNumber, otp) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}/users/verifyOtp`, {
            phoneNumber,
            otp
        }, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error during verification:', error);
        throw error;
    }
};


export const getUserById = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_LOGIN_URL}/users/getUserById`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // API responded with a status code outside the 2xx range
            throw new Error(error.response.data?.message || 'Failed to fetch user details');
          } else if (error.request) {
            // Request was made, but no response received
            throw new Error('No response from the server. Please try again later.');
          } else {
            // Something else caused the error
            throw new Error('An unexpected error occurred.');
          }
    }
}