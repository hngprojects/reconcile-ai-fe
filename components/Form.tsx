"use client";
import React, { FormEvent } from "react";
import { Button } from "./ui/button";

const Form = () => {
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
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
      <p className="text-[16px]">Stay up to date</p>
      <div className="flex gap-4">
        <input
          required
          type="email"
          placeholder="Enter your email"
          className="input w-[315px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="outline"
          className={`border-primary h-12 w-[115px] ${
            subscribed ? "text-destructive" : "text-primary"
          } `}
        >
          {!subscribed ? "Subscribe" : "Subscribed "}
        </Button>
      </div>
    </form>
  );
};

export default Form;
