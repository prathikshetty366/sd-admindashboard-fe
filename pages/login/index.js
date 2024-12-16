import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "../../components/InputField/InputField"; // Import the Input component
import Button from "../../components/Button/Button"; // Import the Button component
import { signupWithPhoneNumber, verifyOtp } from "@/app/services/login"; // Import API functions
import { _setAuthCookies } from "@/utils/cookies"; // Import cookie utility
import Image from "next/image";
import logo from "@/public/teams/fulllogo.png";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call the signup API to send OTP
      const response = await signupWithPhoneNumber(phoneNumber);

      if (response.success) {
        setOtpSent(true);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(otp)) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call the verifyOtp API to verify the OTP
      const response = await verifyOtp(phoneNumber, otp);

      if (response.success) {
        _setAuthCookies("accessToken", response.data.accessToken);
        _setAuthCookies("refreshToken", response.data.refreshToken);
        router.push("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-sm w-full p-8 shadow-md rounded-lg">
        <div className="login-header">
          <div className="logo-wrapper">
            <Image src={logo} width={110} height={120} alt="logo" />
            {/* <h2>Spannerdoor Pvt Ltd</h2> */}
          </div>
        </div>

        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>

        <form
          onSubmit={otpSent ? handleOtpSubmit : handlePhoneSubmit}
          className="space-y-6 mt-6"
        >
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

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" loading={loading}>
            {otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
