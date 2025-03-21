"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual form submission logic
      console.log("Form submitted:", formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form after successful submission
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phoneNumber: "",
      });
      
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-[620px] mx-auto bg-white border rounded-md p-6"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-gray-800 font-medium">
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
            className="w-full p-3 h-12 rounded border border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-800 font-medium">
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
            className="w-full p-3 h-12 rounded border border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-gray-800 font-medium">
            Company Name
          </label>
          <Input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
            className="w-full p-3 h-12 rounded border border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-gray-800 font-medium">
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
            className="w-full p-3 h-12 rounded border border-gray-300"
          />
        </div>

        <Button
          type="submit"
          className="w-full text-white font-semibold py-6 rounded-[12px] px-4"
          disabled={isSubmitting}
        >
          Start your free trial Now
        </Button>
      </div>
    </form>
  );
}