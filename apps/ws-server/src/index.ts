import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";
import { prisma } from "@repo/db/client";
import { messageValidation } from "@repo/types";

const wss = new WebSocketServer({ port: 3002 });

interface User {
    userId: string;
    rooms: string[];
    ws: WebSocket;
}

// TODO: Make a class for state management
const users: User[] = [];

function checkToken(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (typeof decoded == "string") return null
        if (!decoded || !decoded.userId) return null;
        return decoded.userId
    } catch (error) {
        return null;
    }
}

wss.on("connection", (ws, request) => {
    const url = request.url;
    if (!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get("token") ?? '';
    const userId = checkToken(token);
    if (!userId) {
        ws.close()
        return;
    }
    users.push({ userId, rooms: [], ws });


    ws.on("message", async (message: string) => {
        try {
            const data = JSON.parse(message);

            if (data.type == "JOIN") {
                const user = users.find(x => x.ws === ws);
                if (!user) return;
                user.rooms.push(data.roomId);
            }
            if (data.type == "LEAVE") {
                const user = users.find(x => x.ws === ws);
                if (!user) return;
                user.rooms = user.rooms.filter(x => x !== data.roomId);
            }
            if (data.type == "CHAT") {
                const roomId = data.roomId;
                const message = typeof data.message === "string" ? JSON.parse(data.message) : data.message;

                // const { shape_id, type, width, height, radius, top, left, angle, fill } = message
                // const parsedValue = messageValidation.safeParse({ shape_id, type, width, height, radius, top, left, angle, fill })
                // if (!parsedValue.success) {
                //     console.log("😭😭😭" + parsedValue.error)
                //     return
                // }

                // try {
                //     // TODO: send it to a queue and pipeline it db later
                //     await prisma.chat.create({
                //         data: {
                //             userId, roomId, message: {
                //                 create: [message]
                //             }
                //         }
                //     });

                    users.forEach(user => {
                        if (user.rooms.includes(roomId)) {
                            // if(user.ws === ws) return
                            user.ws.send(JSON.stringify({ type: "CHAT", roomId, message }));
                        }
                    })
                // } catch (error) {
                //     console.error(error)
                // }
            }
        } catch (error) {
            console.error(error)
        }
    });
});