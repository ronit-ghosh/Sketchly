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

router.get("/:roomId", authMiddleware, async (req, res) => {
    const roomId = Number(req.params.roomId);
    try {
        const messages = await prisma.chat.findMany({
            where: { roomId },
            take: 50,
            orderBy: { id: "desc" }
        })
        if (!messages) return;
        res.json({ messages });
    } catch (error) {
        res.status(400).json({ msg: "Error while fetching room details!" });
    }
});

router.get("/:slug", authMiddleware, async (req, res) => {
    const slug = req.params.slug;
    try {
        const room = await prisma.room.findFirst({
            where: { slug },
        });
        if (!room) return;
        res.json({ roomId: room.id });
    } catch (error) {
        res.status(400).json({ msg: "Error while fetching room details!" });
    }
});