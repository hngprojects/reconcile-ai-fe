"use server"

import { z } from "zod";
import { emailSchema } from "../types/schema";
const subscribeAction = async(data:  z.infer<typeof emailSchema>) =>{
    const response = await fetch("https://api-dev.reconxi.com/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log({response})
      const json = response.ok ? await response.json() : null;
      return {
        status: response.status,
        message:json?.message || (response.ok ? "Success" : "Unable to subscribe"),
        data: json, 
      };
}
export {subscribeAction}