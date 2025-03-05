"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  });

  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      validatePassword(value);
    }
  };

  const isFormValid = () => {
    return formData.newPassword === formData.confirmPassword &&
           passwordValidation.length &&
           passwordValidation.uppercase &&
           passwordValidation.lowercase &&
           passwordValidation.specialChar;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-10">
          <Image 
            src="/AuthLogo.svg" 
            alt="Logo" 
            width={64} 
            height={64} 
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>

        {/* Reset Password Text */}
        <h2 className="text-center text-xl sm:text-2xl font-[600] mb-2">Reset Password</h2>
        <p className='text-[16px] text-[#141414] font-[400] text-center mb-6'>
          Kindly enter your new password to continue
        </p>

        {/* Reset Password Form */}
        <form className="space-y-6">
          {/* New Password Input */}
          <div>
            <label 
              htmlFor="newPassword" 
              className="block text-base sm:text-lg font-medium text-[#1E1E1E] mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 sm:px-4 sm:py-4 border-[1px] rounded-lg pr-10 text-[#333333] text-[14px] sm:text-[16px] font-[400]
                  ${formData.newPassword ? 'border-green-500' : 'border-[#A1A1A1]'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 px-3 flex cursor-pointer items-center"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

           
          </div>

          {/* Confirm Password Input */}
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-base sm:text-lg font-medium text-[#1E1E1E] mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 sm:px-4 sm:py-4 border-[1px] rounded-lg pr-10 text-[#333333] text-[14px] sm:text-[16px] font-[400]
                  ${formData.confirmPassword ? 
                    (formData.newPassword === formData.confirmPassword ? 'border-green-500' : 'border-red-500') 
                    : 'border-[#A1A1A1]'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 cursor-pointer flex items-center"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">Passwords do not match</p>
            )}
          </div>
           {/* Password Validation Criteria */}
           <div className="mt-2 space-y-1">
              <div className="flex items-center">
                {passwordValidation.length ? (
                    <Image src='/check_circle.svg' width={14} height={14} alt='check'/>
                //   <Check className="text-[#007A55] mr-2" size={16} />
                ) : (
                    <Image src='/times.svg' width={14} height={14} alt='times'/>
                )}
                <span className={`text-[12px] pl-2 ${passwordValidation.length ? 'text-green-500' : 'text-red-500'}`}>
                  Must be 8 characters long
                </span>
              </div>
              <div className="flex items-center">
                {passwordValidation.uppercase ? (
                  <Image src='/check_circle.svg' width={14} height={14} alt='check'/>
                ) : (
                    <Image src='/times.svg' width={14} height={14} alt='times'/>
                )}
                <span className={`text-[12px] pl-2 ${passwordValidation.uppercase ? 'text-green-500' : 'text-red-500'}`}>
                  Must have 1 uppercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordValidation.lowercase ? (
                  <Image src='/check_circle.svg' width={14} height={14} alt='check'/>
                ) : (
                    <Image src='/times.svg' width={14} height={14} alt='times'/>
                )}
                <span className={`text-[12px] ml-2 ${passwordValidation.lowercase ? 'text-green-500' : 'text-red-500'}`}>
                  Must have 1 lowercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordValidation.specialChar ? (
                  <Image src='/check_circle.svg' width={14} height={14} alt='check'/>
                ) : (
                    <Image src='/times.svg' width={14} height={14} alt='times'/>
                )}
                <span className={`text-[12px] ml-2 ${passwordValidation.specialChar ? 'text-green-500' : 'text-red-500'}`}>
                  Must have 1 special character
                </span>
              </div>
            </div>

          {/* Reset Password Button */}
          <Button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-4 sm:py-8 mt-4 rounded-lg cursor-pointer text-white font-semibold text-[14px] sm:text-[16px]
              ${isFormValid() 
                ? 'bg-[#2E604A] hover:bg-[#2E604A]/90' 
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Reset Password
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