import { JWT_SECRET } from "@repo/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        res.status(400).json({ msg: "Invalid token!" });
        return
    }

    const token = header.split(" ")[1] ?? '';
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            res.status(401).json({ msg: "Unauthorized!" });
            return;
        }
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Unauthorized!" });
        return;
    }

}