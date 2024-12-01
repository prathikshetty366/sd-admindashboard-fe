'use client';
import dynamic from 'next/dynamic';

const OTPInput = dynamic(() => import('otp-input-react'), { ssr: false });

function Otpinput({ otp, setOtp }) {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <div className="flex items-center justify-between">
        <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
          OTP
        </label>
        <div className="text-sm">
          <a href="mailto:support@spannerdoor.com" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Resend OTP
          </a>
        </div>
      </div>

      <div className="mt-2">
        <OTPInput
          value={otp} // Bind the value to the parent state
          onChange={setOtp} // Update the parent state on change
          autoFocus
          OTPLength={4}
          otpType="number"
          disabled={false}
          inputClassName="border border-gray-300 rounded-md w-12 h-12 text-center focus:border-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
  );
}

export default Otpinput;
