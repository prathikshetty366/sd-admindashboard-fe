
import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "../../components/InputField/InputField"; // Import the Input component
import Button from "../../components/Button/Button"; // Import the Button component
import { _setAuthCookies } from "@/utils/cookies"; // Import cookie utility
import Image from "next/image";
import logo from "@/public/teams/spannerdoor.png"; // Import logo image
import loginsreenimg from "@/public/login/loginscreenimg.jpg"; // Import logo image
import { signupWithPhoneNumber, verifyOtp } from '@/app/services/auth';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (/^\d{10}$/.test(phoneNumber)) {
      setError('');
      try {
        const otpSentResponse = await signupWithPhoneNumber(phoneNumber);
        if (otpSentResponse?.success) {
          setOtpSent(true);
        } else {
          setError('Failed to send OTP. Please try again.');
        }
      } catch (err) {
        console.error('Error during phone number submission:', err.message);
        setError(err.message); // Display the error message from the API or fallback
      }
    } else {
      setError('Please enter a valid 10-digit phone number.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log('Entered OTP:', otp); // Log the full OTP
    if (/^\d{4}$/.test(otp)) {
      setError('');
      try {
        const otpVerification = await verifyOtp(phoneNumber, otp);
        if (otpVerification.success) {
          _setAuthCookies('accessToken', otpVerification?.data?.accessToken);
          _setAuthCookies('refreshToken', otpVerification?.data?.refreshToken);
          router.push('/orders');
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred during OTP verification.');
      }
    } else {
      setError('Please enter a valid 4-digit OTP.');
    }
  };


  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Section (Image) */}
      <div className="w-full lg:w-1/2 relative hidden lg:block">
        <Image
          src={loginsreenimg}
          alt="Login Image"
          layout="fill" // Ensures the image fills its container without overflow
          objectFit="cover" // Ensures the image covers the container without stretching
          className="absolute inset-0" // Makes sure the image covers the full container
        />
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start px-6 py-12 bg-white">
        <div className="w-full max-w-sm p-8  rounded-lg">
          {/* Inline Logo and Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex justify-start space-x-2">
            <span>Welcome to</span>
            <Image src={logo} alt="Logo" width={30} height={30} />
            {/* Inline logo */}
          </h2>

          <p></p>

          <form
            onSubmit={otpSent ? handleOtpSubmit : handlePhoneSubmit}
            className="space-y-6"
          >
            {/* Phone Number Input */}
            {!otpSent && (
              <Input
                id="phone"
                label="Registered Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Enter 10-digit phone number"
              />
            )}

            {/* OTP Input */}
            {otpSent && (
              <Input
                id="otp"
                label="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter 4-digit OTP"
              />
            )}

            {/* Error Message */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Submit Button */}
            <Button type="submit" loading={loading}>
              {otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        </div>
        <div className="px-8 py-12">
          <Button variant="filled" color="red" href="/">
            Help? Contact Admin for any Access issue
          </Button>
        </div>
      </div>

      {/* Footer Section - Privacy Policy and Terms */}
      <div className="absolute bottom-4 right-4 text-sm text-gray-500">
        <p>
          <span className="mr-2">Spannerdoor Pvt Ltd.All Rights Reserved</span>{" "}
          | <span className="mr-2">Privacy Policy</span> |
          <span className="ml-2">Terms and Conditions</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
