import { z } from "zod";

export const userFormValidation = z.object({
    name: z.string()
    .min(5, "Username must be at least 5 characters.")
    .max(50,"Name must be at most 50 characters"),
    email:z.string().email("Invalid email address"),
    phone:z.string().refine((phone)=>/^\+\d{10,14}$/.test(phone),'Invalid Phone Number')
})
