import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, request) => {
    const url = request.url;
    if (!url) return;

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get("token") ?? '';
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded === "string") return

    if (!decoded || !decoded.userId) {
        ws.close(4001, "Unauthorized");
        return;
    }

    ws.on("message", (message: string) => {
        message === 'ping' ? ws.send("pong") : ws.send("dong");
    });
});