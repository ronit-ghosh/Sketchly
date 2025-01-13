import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware";

export const router: Router = Router();

router.post('/', authMiddleware, (req, res) => {
    res.json({ msg: 'hi from room' })
})