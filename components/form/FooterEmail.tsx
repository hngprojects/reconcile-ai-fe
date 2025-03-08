"use client";
import React, { FormEvent } from "react";
import { Button } from "../ui/button";

const FooterEmail = () => {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const handleSubmit = (e: FormEvent) => {
    setSubscribed(true);
    e.preventDefault();
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex justify-end">
      <div className="flex flex-col gap-4 w-full sm:w-fit">
        <p className="text-[16px] self-start">Stay up to date</p>
        <div className="flex sm:flex-row flex-col w-full sm:w-fit gap-4">
          <input
            required
            type="email"
            placeholder="Enter your email"
            className="py-2.5 px-3.5 bg-white text-black rounded-lg outline-none border-none w-full sm:w-[315px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="outline"
            className={`border-primary font-semibold cursor-pointer h-12 md:w-[115px] ${
              subscribed ? "text-destructive" : "text-primary"
            } `}
          >
            {!subscribed ? "Subscribe" : "Subscribed "}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FooterEmail;
