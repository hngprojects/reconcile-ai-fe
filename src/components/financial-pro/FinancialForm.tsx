"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  return (
    <form 
      className="w-full max-w-[620px] mx-auto bg-white border rounded-md p-6"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-[#333333] font-semibold text-sm">
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            className="w-full p-3 h-12 rounded border border-gray-300 placeholder-[#B8B8B8] text-sm lg:text-[20px]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-[#333333] font-semibold text-sm">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@address.com"
            required
            className="w-full p-3 h-12 rounded border border-gray-300 placeholder-[#B8B8B8] text-sm lg:text-[20px]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-[#333333] font-semibold text-sm">
            Phone Number
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            className="w-full p-3 h-12 rounded border border-gray-300 placeholder-[#B8B8B8] text-sm lg:text-[20px]"
          />
        </div>

        <Button
          type="submit"
          className="w-full text-white font-semibold py-6 rounded-[12px] px-4"
        >
          Start your free trial Now
        </Button>
      </div>
    </form>
  );
}