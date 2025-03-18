"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { fetchCountryCodes } from "@/src/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { handleContactUs } from "@/src/lib/api";
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

const contactUsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  country_code: z.string().min(1, "Country code is required"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(300, "Message must be no more than 300 characters long")
    .refine((value) => value.trim().length > 0, {
      message: "Message cannot be just spaces.",
    })
    .transform((value) => value.trim()),
});

const ContactUsForm = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryData = await fetchCountryCodes();
        setCountries(countryData as Country[]);
      } catch (error) {
        console.error("Failed to fetch country codes:", error);
        toast.error("Failed to load country codes. Please refresh.");
      }
    };
    loadCountries();
  }, []);

  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      country_code: "+234", // Set default to Nigeria
      phone_number: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactUsSchema>) => {
    try {
      const formattedData = {
        ...data,
        phone_number: `${data.country_code}${data.phone_number}`,
      };

      const result = await handleContactUs(formattedData);
      if (result.success) {
        toast.success("Message sent successfully!", {
          description: "We will get back to you soon.",
        });
        form.reset();
      }
    } catch (err) {
      toast.error("Failed to send message", {
        description:
          err instanceof Error ? err.message : "Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <label htmlFor="name" className="text-sm text-[#717171]">
                Name
              </label>
              <FormControl>
                <Input
                  className="h-12 bg-white !text-base"
                  id="name"
                  placeholder="Enter full name"
                  {...field}
                  aria-invalid={!!fieldState?.error}
                  aria-describedby={
                    fieldState?.error ? `name-error` : undefined
                  }
                />
              </FormControl>
              {fieldState?.error && <FormMessage id="name-error" />}
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <label htmlFor="email" className="text-sm text-[#717171]">
                Email
              </label>
              <FormControl>
                <Input
                  className="h-12 bg-white !text-base"
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  {...field}
                  aria-invalid={!!fieldState?.error}
                  aria-describedby={
                    fieldState?.error ? `email-error` : undefined
                  }
                />
              </FormControl>
              {fieldState?.error && <FormMessage id="email-error" />}
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field, fieldState }) => (
            <FormItem>
              <label htmlFor="phone_number" className="text-sm text-[#717171]">
                Phone Number
              </label>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="country_code"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-[120px] h-12 min-h-[48px] border border-input bg-white cursor-pointer"
                        id="country-code-select"
                        aria-label="Select country code"
                      >
                        <SelectValue placeholder="+234" />
                      </SelectTrigger>
                      <SelectContent>
                        <div role="listbox" id="country-code-list">
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
                  )}
                />
                <FormControl>
                  <Input
                    className="h-12 min-h-[48px] bg-white !text-base flex-1"
                    id="phone_number"
                    placeholder="Enter phone number"
                    {...field}
                    aria-invalid={!!fieldState?.error}
                    aria-describedby={
                      fieldState?.error ? `phone-error` : undefined
                    }
                  />
                </FormControl>
              </div>
              {fieldState?.error && <FormMessage id="phone-error" />}
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <label htmlFor="message" className="text-sm text-[#717171]">
                Message
              </label>
              <FormControl>
                <Textarea
                  id="message"
                  className="bg-white h-32 !text-base"
                  placeholder="Message..."
                  {...field}
                  aria-invalid={!!fieldState?.error}
                  aria-describedby={
                    fieldState?.error ? `message-error` : undefined
                  }
                />
              </FormControl>
              {fieldState?.error && <FormMessage id="message-error" />}
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-[#2E604A] text-white font-semibold py-6 text-[18px] cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactUsForm;
