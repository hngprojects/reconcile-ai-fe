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
} 
from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
const emailSchema = z.object({
  email: z
  .string()
  .min(1, "Email cannot be empty")
  .email("Invalid email address"),
});

const EmailSubscribeForm = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [subscribed, setSubscribed] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    try {
      console.log(data)
      const response = await fetch("https://api-dev.reconxi.com/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const Response = await response.json()
      console.log("api",Response)
      if (Response.status = "success") {
        setSubscribed(true);
      } else {
        setErrorMessage(Response.message)
      }
    } catch (error) {

      const errorMessage =
      error instanceof Error ? error.message : String(error);
      setErrorMessage(errorMessage)
    }
  };

  return (
    <div>
      {subscribed ? (
        <h1>Thank you for subscribing, you can now check your email</h1>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <div className="flex w-full justify-end">
                      <div className="flex flex-col gap-4  w-full sm:w-fit">
                        <p className="text-[16px] self-start">
                          Stay up to date
                        </p>
                        <div className="flex sm:flex-row flex-col w-full sm:w-fit gap-4">
                          <div className="">
                            <Input
                              placeholder="Enter your email"
                              className=" bg-white px-3.5 h-12 text-black rounded-lg outline-none border-none w-full sm:w-[315px]"
                              {...field}
                            />
                            <FormMessage className="text-sm text-left text-red-500 mt-0.5" /> 
                            {errorMessage && <p className="text-sm text-left text-red-500 mt-0.5" >{errorMessage}</p>}
                          </div>
                          <Button
                            variant="outline"
                            className={`border-primary text-primary font-semibold cursor-pointer h-12 md:w-[115px]`}
                          >
                            Subscribe
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
      )}
    </div>
  );
};



export default EmailSubscribeForm;






