import { z } from "zod";

export const CreateUserSchema = z
  .object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
