import { z } from "zod";
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid email address"),
});
export {emailSchema}