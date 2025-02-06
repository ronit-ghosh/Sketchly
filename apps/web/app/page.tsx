"use client"
import { Canvas, Circle, Rect } from "fabric"
import { useEffect, useRef, useState } from "react"
import Settings from "./components/Settings"

const Main = () => {
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState<Canvas | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight
      });
      initCanvas.backgroundColor = "#121212"
      initCanvas.renderAll()

      setCanvas(initCanvas)
      return () => { initCanvas.dispose() }
    }
  }, [])

  const addRect = () => {
    if (canvas) {
      const rect = new Rect({
        width: 100,
        height: 100,
        top: 100,
        left: 200,
        fill: "transparent",
        stroke: "#d3d3d3",
      })
      canvas.add(rect)
    }
  }

  const addCircle = () => {
    if (canvas) {
      const rect = new Circle({
        radius: 100,
        top: 100,
        left: 200,
        fill: "transparent",
        stroke: "#d3d3d3",
      })
      canvas.add(rect)
    }
  }

  const addRhombus = () => {
    if (canvas) {
      const rhombus = new Rect({
        width: 100,
        height: 100,
        top: 100,
        left: 200,
        angle: 45,
        fill: "transparent",
        stroke: "#d3d3d3",
      })
      canvas.add(rhombus)
    }
  }

  const clearCanvas = () => {
    if (!canvas) return
    canvas.clear()
    canvas.renderAll()
  }

  useEffect(() => {
    if (!canvas) return
    console.log(canvas.getObjects())
  }, [canvas])

  return (
    <div id="container">
      <div className="buttonContainer">
        <button className="btn" onClick={addRect}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#d3d3d3"} fill={"none"}>
            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <button className="btn" onClick={addCircle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#d3d3d3"} fill={"none"}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="btn" onClick={addRhombus}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#d3d3d3"} fill={"none"}>
            <path d="M8.05622 4.78867C9.91534 2.92956 10.8449 2 12 2C13.1551 2 14.0847 2.92956 15.9438 4.78867L19.2113 8.05622C21.0704 9.91534 22 10.8449 22 12C22 13.1551 21.0704 14.0847 19.2113 15.9438L15.9438 19.2113C14.0847 21.0704 13.1551 22 12 22C10.8449 22 9.91534 21.0704 8.05622 19.2113L4.78867 15.9438C2.92956 14.0847 2 13.1551 2 12C2 10.8449 2.92956 9.91534 4.78867 8.05622L8.05622 4.78867Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="btn" onClick={clearCanvas}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#d3d3d3"} fill={"none"}>
            <path d="M21 3L13 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.44573 11.0854C6.96539 12.0368 4.98269 11.8736 3 11.0885C3.50059 17.531 6.50414 20.0089 10.5089 21C10.5089 21 13.5261 18.8664 13.961 13.8074C14.0081 13.2595 14.0317 12.9856 13.9178 12.6769C13.8038 12.3682 13.5802 12.1468 13.1329 11.704C12.3973 10.9757 12.0295 10.6116 11.5929 10.5204C11.1564 10.4293 10.5862 10.648 9.44573 11.0854Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.5 16.4464C4.5 16.4464 7 16.9286 9.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 7.25C8.5 7.94036 7.94036 8.5 7.25 8.5C6.55964 8.5 6 7.94036 6 7.25C6 6.55964 6.55964 6 7.25 6C7.94036 6 8.5 6.55964 8.5 7.25Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 4V4.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <Settings canvas={canvas} />
    </div>
  )
}

export default Main
