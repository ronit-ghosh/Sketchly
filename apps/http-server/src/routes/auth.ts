import { Router } from "express";
import bcrypt from "bcrypt";
import { signupValidation, signinValidation } from "@repo/types";
import { prisma } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";

export const router: Router = Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const parsedValue = signupValidation.safeParse({ username, email, password });
    if (!parsedValue.success) {
        res.status(401).json({ msg: parsedValue.error.issues[0]?.message });
        return;
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            res.status(402).json({ msg: "User already exists!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        if (!user) {
            res.status(500).json({ msg: "Error creating user!" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET)

        res.json({ msg: "User created successfully!", token });
    } catch (error) {
        res.status(500).json({ msg: "Error creating user!" });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const parsedValue = signinValidation.safeParse({ email, password });
    if (!parsedValue.success) {
        res.status(400).json({ msg: parsedValue.error.issues[0]?.message });
        return;
    }
    try {
        const existingUser = await prisma.user.findFirst({
            where: { email }
        });
        if (!existingUser) {
            res.status(404).json({ msg: "User not found! Please sign up first!" });
            return;
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

        if (!isPasswordCorrect) {
            res.status(403).json({ msg: "Incorrect password!" });
            return;
        }

        const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET)

        res.json({ msg: "User signed in successfully!", token });
    } catch (error) {
        res.status(500).json({ msg: "Error creating user!" });
    }

});
