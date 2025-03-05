"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from 'next/image';
import Link from 'next/link';

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Email validation
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }
    }
  };

  const isFormValid = () => {
    return formData.email.trim() !== '' && 
           formData.password.trim() !== '' &&
           validateEmail(formData.email) &&
           !errors.email;
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

        {/* Login Text */}
        <h2 className="text-center text-xl sm:text-2xl font-[600] mb-2">Login to your account</h2>
        <p className='text-[20px] text-[#141414] font-[400] text-center mb-6'>Welcome back, please enter your details.</p>

        {/* Social Signin Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
          <Button
            variant="outline"
            className="w-full sm:w-1/2 border-[1px] border-[#CBD5E1] text-primary h-14 sm:h-16 cursor-pointer"
          >
            <Image 
              src="/GoogleIcon.svg" 
              alt="Google" 
              width={24} 
              height={24} 
              className="mr-2"
            />
            <span className='text-[#0A0A0A] text-[16px]'>Sign in with Google</span>
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-1/2 border-[1px] border-[#CBD5E1] text-primary h-14 sm:h-16 cursor-pointer"
          >
            <Image 
              src="/FacebookIcon.svg" 
              alt="Facebook" 
              width={24} 
              height={24} 
              className="mr-2"
            />
            <span className='text-[#0A0A0A] text-[16px]'>Sign in with Facebook</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-[#CBD5E1]" />
          <span className="mx-4 text-[13px] text-[#525252]">OR</span>
          <hr className="flex-grow border-t border-[#CBD5E1]" />
        </div>

        {/* Signin Form */}
        <form className="space-y-4 sm:space-y-6">
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
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-3 sm:px-4 sm:py-4 border-[1px] rounded-lg text-[#333333] text-[14px] sm:text-[16px] font-[400]
                ${errors.email ? 'border-red-500' : 
                  (formData.email ? 'border-green-500' : 'border-[#A1A1A1]')}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-base sm:text-lg font-medium text-[#1E1E1E] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 sm:px-4 sm:py-4 border-[1px] rounded-lg pr-10 text-[#333333] text-[14px] sm:text-[16px] font-[400]
                  ${formData.password ? 'border-green-500' : 'border-[#A1A1A1]'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
               <Checkbox 
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
              /> 
              <label
                htmlFor="remember-me"
                className="text-[14px] sm:text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Link 
              href="/forgot-password" 
              className="text-[#2E604A] text-[14px] sm:text-[16px] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-4 sm:py-8 mt-4 rounded-lg cursor-pointer text-white font-semibold text-[14px] sm:text-[16px]
              ${isFormValid() 
                ? 'bg-[#2E604A] hover:bg-[#2E604A]/90' 
                : 'bg-gray-400 cursor-not-allowed'}`}
          >
           Login
          </Button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-4">
          <p className="text-[12px] sm:text-[13px]">
            <span className='font-[600] text-[#525252]'>Don&apos;t have an account?</span>{' '}
            <Link href="/signup" className="text-[#2E604A] font-[700] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}