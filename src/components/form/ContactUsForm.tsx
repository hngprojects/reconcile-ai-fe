"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/src/components/ui/button";
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

const contactUsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+[0-9]{10,15}$/, // to only allow this format +2341234567890
      "Phone number must start with a '+' followed by 10 to 15 digits."
    )
    .transform((value) => value.slice(1)), // remove the '+' before sending to the backend
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(300, "Message must be no more than 300 characters long")
    .refine((value) => value.trim().length > 0, {
      message: "Message cannot be just spaces.",
    })
    .transform((value) => value.trim()), // to trim whitespaces
});

const ContactUsForm = ({
  setIsSubmitted,
}: {
  setIsSubmitted: (val: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactUsSchema>) => {
    try {
      const result = await handleContactUs(data);
      if (result.success) {
        setIsSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
          render={({ field }) => (
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <label htmlFor="phone_number" className="text-sm text-[#717171]">
                Phone Number
              </label>
              <FormControl>
                <Input
                  className="h-12 bg-white !text-base"
                  id="phone_number"
                  placeholder="Enter phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-[#2E604A] text-white font-semibold py-6 text-[18px]"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactUsForm;
