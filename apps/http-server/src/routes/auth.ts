import { Router } from "express";
import { signupValidation, signinValidation } from "@repo/types";

export const router: Router = Router();

router.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    const parsedValue = signupValidation.safeParse({ username, email, password });
    if (!parsedValue.success) {
        res.status(400).json({ msg: parsedValue.error.issues[0]?.message });
        return;
    }
});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    const parsedValue = signinValidation.safeParse({ email, password });
    if (!parsedValue.success) {
        res.status(400).json({ msg: parsedValue.error.issues[0]?.message });
        return;
    }
});
