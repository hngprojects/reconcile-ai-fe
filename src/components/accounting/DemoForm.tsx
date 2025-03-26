"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { handleMarketingDemo } from "@/src/lib/api";
import { toast } from "sonner";
import { fetchCountryCodes } from "@/src/lib/constants";
import Image from "next/image";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface DemoFormProps {
  buttonText?: string;
}

export default function AccountingDemoForm({
  buttonText = "Get Your Free Demo Now",
}: DemoFormProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    countryCode: "+234",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      const countryData = await fetchCountryCodes();
      setCountries(countryData as Country[]);
    };
    loadCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryCode: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await handleMarketingDemo({
        full_name: formData.fullName,
        business_name: formData.businessName,
        email: formData.email,
        phone_number: `${formData.countryCode}${formData.phoneNumber}`,
      });

      if (result.success) {
        toast.success(
          "Demo request submitted successfully! We'll be in touch soon.",
        );
        setFormData({
          fullName: "",
          businessName: "",
          email: "",
          countryCode: "+234",
          phoneNumber: "",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit demo request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:max-w-[650px] mx-auto bg-white border border-gray-200 rounded-md p-6"
      aria-labelledby="form-heading"
    >
      <h2 id="form-heading" className="sr-only">
        Request a Demo Form
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm text-[#333333] font-semibold">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            aria-required="true"
            className="h-12 bg-white !text-base"
          />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="businessName" className="text-sm text-[#333333] font-semibold">
            Business Name
          </Label>
          <Input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            required
            aria-required="true"
            className="h-12 bg-white !text-base"
          />
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-[#333333] font-semibold">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            aria-required="true"
            className="h-12 bg-white !text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm text-[#333333] font-semibold">
            Phone Number
          </Label>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={formData.countryCode}
                onChange={(e) => handleCountryCodeChange(e.target.value)}
                className="w-[120px] h-12 min-h-[48px] border border-input bg-white cursor-pointer rounded-md pl-9 pr-8 appearance-none"
              >
                {countries.map((country: Country) => (
                  <option
                    key={`${country.code}-${country.name}`}
                    value={country.code}
                    className="flex items-center gap-2 h-12 px-3 py-2"
                  >
                    {country.code}
                  </option>
                ))}
              </select>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                {countries.find((c) => c.code === formData.countryCode)
                  ?.flag && (
                  <Image
                    src={
                      countries.find((c) => c.code === formData.countryCode)
                        ?.flag || "/assets/images/placeholder-flag.png"
                    }
                    alt={`Flag for ${formData.countryCode}`}
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                )}
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-500"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              aria-required="true"
              className="h-12 min-h-[48px] bg-white !text-base flex-1"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#2E604A] text-white font-semibold py-6 text-[18px] cursor-pointer"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Processing..." : buttonText}
        </Button>
      </div>
    </form>
  );
}
