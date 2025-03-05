"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // TODO: Implement password reset logic
      console.log('Send reset instructions to', email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-10">
          <Image 
            src="/Logo.svg" 
            alt="Logo" 
            width={64} 
            height={64} 
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* Forgot Password Text */}
        <h2 className="text-center text-xl sm:text-2xl font-[600] mb-2">Forgot Password</h2>
        <p className='text-[16px] text-[#141414] font-[400] text-center mb-6'>
          Enter the email address you used to create your account to receive instructions on how to reset your password
        </p>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-base sm:text-lg font-medium text-[#1E1E1E] mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-3 py-3 sm:px-4 sm:py-4 border-[1px] rounded-lg text-[#333333] text-[14px] sm:text-[16px] font-[400]
                ${error ? 'border-red-500' : 
                  (email ? 'border-green-500' : 'border-[#A1A1A1]')}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!email || !!error}
            className={`w-full py-4 sm:py-8 mt-4 rounded-lg cursor-pointer text-white font-semibold text-[14px] sm:text-[16px]
              ${email && !error 
                ? 'bg-[#2E604A] hover:bg-[#2E604A]/90' 
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Send
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-[12px] sm:text-[13px]">
            <span className='font-[600] text-[#525252]'>Remember your password?</span>{' '}
            <Link href="/login" className="text-[#2E604A] font-[700] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}