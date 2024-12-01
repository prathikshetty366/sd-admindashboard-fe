import Otpinput from '@/components/otpinput';
import React, { useState } from 'react';
import { signupWithPhoneNumber, verifyOtp } from '@/app/services/auth';
import { useRouter } from 'next/router';
import { _setAuthCookies } from '@/utils/cookies';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(''); // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="teams/logo.png" className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={otpSent ? handleOtpSubmit : handlePhoneSubmit} className="space-y-6">
          {!otpSent && (
            <div>
              <label htmlFor="loginphoneno" className="block text-sm font-medium leading-6 text-gray-900">
                Registered Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="loginphoneno"
                  name="loginphoneno"
                  type="text"
                  required
                  autoComplete="phone no"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}

          {otpSent && <Otpinput otp={otp} setOtp={setOtp} />}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have Access{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
}
