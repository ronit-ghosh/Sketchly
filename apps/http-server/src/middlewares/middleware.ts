import { JWT_SECRET } from "@repo/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    const { email } = req.body;
    if (!header || !header.startsWith("Bearer ")) {
        res.status(400).json({ msg: "Invalid token!" });
        return
    }

    const token = header.split(" ")[1] ?? '';
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") return;
    
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id;
        next();
        return;
    } else {
        res.status(400).json({ msg: "Unauthorized!" });
        return;
    }

}