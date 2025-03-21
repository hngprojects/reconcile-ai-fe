"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function WalkthroughForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    phoneNumber: "",
    jobTitle: ""
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
        businessEmail: "",
        companyName: "",
        phoneNumber: "",
        jobTitle: ""
      });
      
      alert("Demo scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling demo:", error);
      alert("Failed to schedule demo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     
    
       
        
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-md p-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
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
          
          <div>
            <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Business Email
            </label>
            <Input
              id="businessEmail"
              name="businessEmail"
              type="email"
              value={formData.businessEmail}
              onChange={handleChange}
              placeholder="email@address.com"
              required
              className="w-full p-3 h-12 rounded border border-gray-300"
            />
          </div>
          
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
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
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
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
          
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
              required
              className="w-full p-3 h-12 rounded border border-gray-300"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full text-white font-semibold py-6 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Schedule Your Free Enterprise Demo Today"}
          </Button>
        </form>
     
  );
}