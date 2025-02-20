import { z } from "zod";

export const signupValidation = z.object({
    username: z.string().min(3, { message: "Username must be atleast 3 characteres long!" }),
    email: z.string().email({ message: "Email is invalid!" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long!" }).max(16, { message: "Password must be within 16 characters!" }),
})

export const signinValidation = z.object({
    email: z.string().email({ message: "Email is invalid!" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long!" }).max(16, { message: "Password must be within 16 characters long!" }),
})

export const roomValidation = z.object({
    name: z.string()
})

export const messageValidation = z.object({
    shape_id: z.string(),
    type: z.enum(["RECT", "CIRCLE"]),
    width: z.number().optional(),
    height: z.number().optional(),
    radius: z.number().optional(),
    top: z.number(),
    left: z.number(),
    angle: z.number().optional(),
    fill: z.string().optional(),
    stroke: z.string().default("#d3d3d3")
})
