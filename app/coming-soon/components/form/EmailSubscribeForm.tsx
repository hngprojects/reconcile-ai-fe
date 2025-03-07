"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid email address"),
});

const EmailSubscribeForm = () => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    try {
      // Example: await subscribeEmail(data.email);
      console.log("Subscribing email:", data.email);
    } catch (error) {
      // Handle subscription error
      console.error("Subscription failed", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    className="p-4 h-full pr-36 focus-visible:ring-1" // Added extra padding for button
                    {...field}
                  />
                  <Button
                    type="submit"
                    className="absolute right-0 top-1/2 transform !px-4 -translate-y-1/2 h-full bg-[#2E604A]"
                  >
                    Notify Me <Send className="ml-2" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-sm text-left text-red-500 mt-0.5" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EmailSubscribeForm;
