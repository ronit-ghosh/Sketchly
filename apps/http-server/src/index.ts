import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as roomRouter } from "./routes/room";
import cors from "cors";
import { httpServerPort } from "@repo/common";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);

app.listen(httpServerPort, () => {
    console.log(`Server is running on http://localhost:${httpServerPort}`);
});