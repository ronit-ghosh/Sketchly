import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as roomRouter } from "./routes/room";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);

app.listen(6000, () => {
    console.log(`Server is running on http://localhost:${6000}`);
});