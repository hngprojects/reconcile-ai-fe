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
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { handleAddToNewsLetter } from "@/src/lib/api";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid email address"),
});

const EmailSubscribeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    setIsSubmitting(true);

    try {
      const result = await handleAddToNewsLetter(data.email);

      if (result.success) {
        toast.success("Subscribed successfully!", {
          description: "Thank you for subscribing to our newsletter.",
        });
        form.reset();
      } else if (result.error) {
        toast.error("Subscription failed", {
          description: "This email has already been subscribed",
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        description:
          err instanceof Error ? err.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full justify-end">
                    <div className="flex flex-col gap-4 w-full md:w-fit">
                      <p className="text-[16px] self-start">Stay up to date</p>
                      <div className="flex md:flex-row flex-col w-full gap-4">
                        <div className="">
                          <Input
                            placeholder="Enter your email"
                            className=" bg-white px-3.5 h-12 text-black rounded-lg outline-none border-none w-full md:max-w-md"
                            {...field}
                          />
                          <FormMessage className="text-sm text-left text-red-500 mt-0.5 whitespace-normal" />
                        </div>
                        <Button
                          variant="outline"
                          className={`border-primary text-primary font-semibold cursor-pointer h-12 md:w-[115px]`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Subscribe"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default EmailSubscribeForm;
