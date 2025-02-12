"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

// 1️⃣ Dynamically import Excalidraw (disable SSR)
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw, { ssr: false },
);

const Main = () => {
    const excalidrawAPI = useRef<any>(null);
    const ws = useRef<WebSocket | null>(null);
    const params = useParams().roomSlug;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNmJlNzZlMi1iMzk2LTRlMDItYjY3Zi0zMzkyYzQxMjc2ODEiLCJpYXQiOjE3Mzg5NDk2NjF9.2pRwdqEyW2lLJ4VdViS6UPHTkwQxEnVpt687XOZ9zJY"; // Replace with a secure token
    const roomId = 1;

    // 2️⃣ Connect WebSocket After Component Mounts
    useEffect(() => {
        if (!params) return;

        ws.current = new WebSocket(`ws://localhost:3002?token=${token}`);

        ws.current.onopen = () => {
            console.log("WebSocket Connected ✅");
            ws.current?.send(JSON.stringify({ type: "JOIN", roomId }));
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "DRAW") {
                syncDrawings(data.message);
            }
        };

        ws.current.onclose = () => {
            console.log("WebSocket Disconnected ❌");
        };

        return () => {
            ws.current?.send(JSON.stringify({ type: "LEAVE", roomId }));
            ws.current?.close();
        };
    }, [params]);

    // 3️⃣ Function to Send Drawing Data via WebSocket
    const sendDrawings = (elements: any) => {
        if (!ws.current) return;
        ws.current.send(JSON.stringify({ type: "DRAW", roomId, message: elements }));
    };

    // 4️⃣ Function to Sync Drawings
    const syncDrawings = (elements: any) => {
        if (!excalidrawAPI.current) return;
        excalidrawAPI.current.updateScene({ elements });
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Excalidraw
                // @ts-ignore
                ref={excalidrawAPI}
                onChange={(elements) => sendDrawings(elements)}
                initialData={{ elements: [] }}
            />
        </div>
    );
};

export default Main;
