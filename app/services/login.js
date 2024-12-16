import axios from "axios";

/**
 * Function to sign up a user with phone number, role ID, and referral code.
 *
 * @param {string} phoneNumber - The phone number of the user.
 * @param {string} roleId - The role ID of the user.
 * @param {string} referralCode - The referral code.
 * @returns {Promise} - The axios promise with the server response.
 */
export const signupWithPhoneNumber = async (
  phoneNumber,
  roleId,
  referralCode
) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
    console.log(apiUrl);
    // Ensure all required parameters are included
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_LOGIN_URL}/users/superAdminLogin`,
      {
        phoneNumber,
        roleId, // Include roleId in the request body
        referralCode, // Include referralCode in the request body
      },
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Enhance error logging to get more insights
    if (error.response) {
      console.error("Error response:", error.response.data); // Detailed error message from the server
      console.error("Status code:", error.response.status); // Status code returned by the server
    } else {
      console.error("Error during signup:", error.message); // Generic error message
    }
    throw error; // Rethrow the error for further handling in the calling function
  }
};

/**
 * Function to verify the OTP entered by the user.
 *
 * @param {string} phoneNumber - The phone number of the user.
 * @param {string} otp - The OTP entered by the user.
 * @returns {Promise} - The axios promise with the server response.
 */
export const verifyOtp = async (phoneNumber, otp) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_LOGIN_URL}/users/verifyOtp`,
      {
        phoneNumber,
        otp,
      },
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Enhance error logging for OTP verification as well
    if (error.response) {
      console.error("Error response:", error.response.data); // Detailed error message from the server
      console.error("Status code:", error.response.status); // Status code returned by the server
    } else {
      console.error("Error during OTP verification:", error.message); // Generic error message
    }
    throw error; // Rethrow the error for further handling
  }
};
