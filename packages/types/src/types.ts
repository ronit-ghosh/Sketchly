import { z } from "zod";

export const signupValidation = z.object({
    username: z.string().min(3, { message: "Username must be atleast 3 characteres long!" }),
    email: z.string().email({ message: "Email is invalid!" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long!" }).max(16, { message: "Password must be within 16 characters long!" }),
})

export const signinValidation = z.object({
    email: z.string().email({ message: "Email is invalid!" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long!" }).max(16, { message: "Password must be within 16 characters long!" }),
})

