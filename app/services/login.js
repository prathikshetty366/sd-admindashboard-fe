import axios from 'axios';

/**
 * Function to sign up a user with phone number, role ID, and referral code.
 * 
 * @param {string} phoneNumber - The phone number of the user.
 * @param {string} roleId - The role ID of the user.
 * @param {string} referralCode - The referral code.
 * @returns {Promise} - The axios promise with the server response.
 */
export const signupWithPhoneNumber = async (phoneNumber, roleId, referralCode) => {
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
        console.error('Error during signup:', error);
        throw error;
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