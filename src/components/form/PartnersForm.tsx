"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { toast } from "sonner";
import { handlePartnerSubmission } from "@/src/lib/api";
import type { PartnerResponse } from "@/src/lib/api";
import { fetchCountryCodes } from "@/src/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Image from "next/image";

interface Country {
  code: string;
  name: string;
  flag: string;
}

export default function PartnerForm() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    countryCode: "+234",
    phoneNumber: "",
    serviceInterested: "",
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

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceInterested: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        full_name: formData.fullName,
        business_name: formData.businessName,
        email: formData.email,
        phone_number: `${formData.countryCode}${formData.phoneNumber}`,
        service_interested: formData.serviceInterested,
      };

      const response: PartnerResponse =
        await handlePartnerSubmission(submissionData);

      if (response.success) {
        toast.success(
          response.message || "Partnership request submitted successfully!",
        );
        setFormData({
          fullName: "",
          businessName: "",
          email: "",
          countryCode: "+234",
          phoneNumber: "",
          serviceInterested: "",
        });
      } else {
        if (response.errors) {
          Object.entries(response.errors).forEach((entry) => {
            const errors = entry[1];
            toast.error(errors[0]);
          });
        } else {
          throw new Error(
            response.message || "Failed to submit partnership request",
          );
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit partnership request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-[650px] bg-white border border-gray-200 rounded-md p-6"
      aria-labelledby="form-heading"
    >
      <h2 id="form-heading" className="sr-only">
        Partner with us Form
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm text-black">
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

        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-sm text-black">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-black">
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
          <Label htmlFor="service-interest" className="text-sm text-black">
            What are you interested in?
          </Label>
          <Select
            value={formData.serviceInterested}
            onValueChange={handleServiceChange}
          >
            <SelectTrigger
              id="service-interest"
              className="w-full h-16 bg-white !text-base cursor-pointer p-4"
              aria-label="Select service interest"
            >
              <SelectValue placeholder="Select Interest" />
            </SelectTrigger>
            <SelectContent>
              <div role="listbox" id="service-options">
                <SelectItem value="Reseller Partner">
                  Reseller Partners
                </SelectItem>
                <SelectItem value="Referral Partner">
                  Referral Partners
                </SelectItem>
              </div>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone-input" className="text-sm text-black">
            Phone Number
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.countryCode}
              onValueChange={handleCountryCodeChange}
            >
              <SelectTrigger
                id="country-code"
                className="w-[120px] h-12 min-h-[48px] border border-input bg-white cursor-pointer"
                aria-label="Select country code"
              >
                <SelectValue placeholder="+234" />
              </SelectTrigger>
              <SelectContent>
                <div role="listbox" id="country-codes">
                  {countries.map((country: Country) => (
                    <SelectItem
                      key={`${country.code}-${country.name}`}
                      value={country.code}
                      className="flex items-center gap-2 h-12 px-3 py-2 cursor-pointer"
                    >
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                      <span>{country.code}</span>
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
            <Input
              id="phone-input"
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
          {isSubmitting ? "Processing..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
