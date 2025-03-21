"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { handleMarketingDemo } from "@/src/lib/api";
import { fetchCountryCodes } from "@/src/lib/constants";
import { toast } from "sonner";
import Image from "next/image";

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface DemoFormProps {
  buttonText?: string;
}

// Define form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z.string().min(6, "Phone number is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DemoForm({
  buttonText = "Get Your Free Demo Now",
}: DemoFormProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      countryCode: "+234",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    const loadCountries = async () => {
      const countryData = await fetchCountryCodes();
      setCountries(countryData as Country[]);
    };
    loadCountries();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const result = await handleMarketingDemo({
        full_name: data.fullName,
        business_name: data.companyName,
        email: data.email,
        phone_number: `${data.countryCode}${data.phoneNumber}`,
      });

      if (result.success) {
        toast.success(
          "Request submitted successfully! We'll be in touch soon."
        );
        form.reset({
          fullName: "",
          companyName: "",
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
          : "Failed to submit request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="font-semibold text-xl md:text-3xl text-[#101828] flex-wrap">
          Ready to Reconcile Smarter?
        </h3>
        <p className="text-base text-[#475467]">
          Join thousands of financial professionals using ReconXi’s free bank
          reconciliation software to simplify accounting.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-[500px] bg-white border border-gray-200 rounded-md p-6"
          aria-labelledby="form-heading"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="gap-0.5">
                  <FormLabel className="text-sm text-[#717171]">
                    Enter Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter full name"
                      className="h-12 bg-white !text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-0.5">
                  <FormLabel className="text-sm text-[#717171]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                      className="h-12 bg-white !text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="gap-0.5">
                  <FormLabel className="text-sm text-[#717171]">
                    Enter Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter company name"
                      className="h-12 bg-white !text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-1">
              <Label className="text-sm text-[#717171]">Phone Number</Label>
              <div className="flex gap-1">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="w-[120px]">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 min-h-[48px] border border-input bg-white cursor-pointer">
                            <SelectValue placeholder="+234" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country: Country) => (
                            <SelectItem
                              key={`${country.code}-${country.name}`}
                              value={country.code}
                              className="flex items-center gap-1 h-12 px-3 py-2 cursor-pointer"
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
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1 gap-1">
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter phone number"
                          className="h-12 min-h-[48px] bg-white !text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
      </Form>
    </>
  );
}
