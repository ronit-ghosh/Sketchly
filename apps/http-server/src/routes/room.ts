import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware";
import { roomValidation } from "@repo/types";
import { prisma } from "@repo/db/client";

export const router: Router = Router();

router.post('/create', authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const name = req.body.name;

    const parsedValue = roomValidation.safeParse({ name });
    if (!parsedValue.success) {
        res.status(401).json({ msg: parsedValue.error.issues[0]?.message });
        return;
    }

    try {
        const roomExists = await prisma.room.findFirst({
            where: {
                slug: name,
            },
        });

        if (roomExists) {
            res.status(400).json({ msg: "Room already exists!" });
            return;
        }

        const room = await prisma.room.create({
            data: {
                slug: name,
                adminId: userId,
            },
        });
        res.json({ msg: "Room created successfully!", roomId: room.id });
    } catch (error) {
        res.status(400).json({ msg: "Error creating room!", error });
    }
});

router.get("/roomId/:id", authMiddleware, async (req, res) => {
    const roomId = Number(req.params.id);
    try {
        const messages = await prisma.shapes.findMany({
            where: { roomId },
        })

        res.json({ shapes: messages });
    } catch (error) {
        res.status(400).json({ msg: "Error while fetching shapes!" });
    }
});

router.get("/slug", authMiddleware, async (req, res) => {
    const slug = req.body.slug;
    try {
        const room = await prisma.room.findUnique({
            where: { slug },
        });
        if (!room) return;
        res.json({ roomId: room.id });
    } catch (error) {
        res.status(400).json({ msg: "Error while fetching room details!" });
        console.error(error)
    }
});