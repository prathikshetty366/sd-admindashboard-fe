import React, { useState } from 'react';
import './login.scss';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image'
import logo from "@/public/assets/login/spd-logo.png"
import info from "@/public/assets/login/information.png"
import { signupWithPhoneNumber, verifyOtp } from '@/app/services/login';
import { useRouter } from 'next/router';
import { _setAuthCookies } from '@/utils/cookies';
const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter()

    const handlePhoneSubmit = async () => {
        if (/^\d{10}$/.test(phoneNumber)) {
            setError('');
            // Simulate sending OTP here
            const otpSent = await signupWithPhoneNumber(phoneNumber)
            console.log(otpSent)
            if (otpSent.success) {
                setOtpSent(true);
            }
        } else {
            setError('Please enter a valid 10-digit phone number.');
        }
    };

    const handleOtpSubmit = async () => {
        if (/^\d{4}$/.test(otp)) {
            setError('');
            // Simulate OTP verification here
            const otpVerification = await verifyOtp(phoneNumber, otp)
            if (otpVerification.success) {
                _setAuthCookies("accessToken", otpVerification?.data?.accessToken)
                _setAuthCookies("refreshToken", otpVerification?.data?.refreshToken)
                router.push('/bookings')
            }
        } else {
            setError('Please enter a valid 4-digit OTP.');
        }
    };

    return (
        <>
            <div className='login-header'
            >
                <div className='logo-wrapper'>
                    <Image src={logo} width={110} height={120} alt='logo' />
                    <h2>Spannerdoor Pvt Ltd</h2>
                </div>
                <div className='info-header'>
                    <Image src={info} width={40} height={40} alt='logo' />
                </div>
            </div>
            <div className="login-container">
                <h2>Login</h2>
                {!otpSent ? (
                    <div className="phone-input">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                        />
                        <button onClick={handlePhoneSubmit}>Submit</button>
                    </div>
                ) : (
                    <div className="otp-input">
                        <label>OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter the OTP"
                        />
                        <button onClick={handleOtpSubmit}>Verify OTP</button>
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>

        </>

    );
};

export default Login;
