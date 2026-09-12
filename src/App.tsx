import React, { useRef, useCallback } from "react";
import { IDCard3D }  from "./components/IDCard/IDCard3D";
import { Terminal }  from "./components/Terminal/Terminal";
import { profile }   from "./data/profile";
import "./App.css";

export default function App() {
  const cardCommandRef = useRef<((cmd: string) => void) | null>(null);

  const handleCommand = useCallback((cmd: string) => {
    cardCommandRef.current?.(cmd);
  }, []);

  return (
    <div className="app-root">
      {/* LEFT — Card panel */}
      <div className="left-panel">
        <div className="left-bg" />
        <div className="card-area">
          <IDCard3D commandRef={cardCommandRef} />
        </div>
        <div className="card-info-strip">
          <div className="card-info-name">{profile.name}</div>
          <div className="card-info-role">{profile.role}</div>
          <div className="card-info-id">{profile.developerId}</div>
        </div>
      </div>

      {/* DIVIDER */}
      <div
        className="panel-divider"
        onMouseDown={(e) => {
          e.preventDefault();
          const startX     = e.clientX;
          const leftPanel  = document.querySelector(".left-panel") as HTMLElement;
          const startWidth = leftPanel.offsetWidth;

          const onMove = (mv: MouseEvent) => {
            const newWidth = Math.max(
              280,
              Math.min(startWidth + mv.clientX - startX, window.innerWidth - 280)
            );
            leftPanel.style.width = newWidth + "px";
          };

          const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup",   onUp);
            document.body.style.cursor     = "";
            document.body.style.userSelect = "";
          };

          document.body.style.cursor     = "col-resize";
          document.body.style.userSelect = "none";
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup",   onUp);
        }}
      />

      {/* RIGHT — Terminal panel */}
      <div className="right-panel">
        <Terminal onCommand={handleCommand} />
      </div>
    </div>
  );
}