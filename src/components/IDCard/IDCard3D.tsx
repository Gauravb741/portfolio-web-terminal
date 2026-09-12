import React, { useRef, useCallback, useEffect, useState } from "react";
import { RealisticCard } from "./RealisticCard";
import { LanyardSystem } from "./LanyardSystem";
import { useCardPhysics, CardPhysicsState } from "../../hooks/useCardPhysics";
import { useMousePosition } from "../../hooks/useMousePosition";

export interface IDCard3DProps {
  commandRef?: React.MutableRefObject<((cmd: string) => void) | null>;
}

const CARD_W    = 218;
const CARD_H    = 336;
const LANYARD_H = 165;
const NAV_H     = 148; // increased to accommodate larger buttons + description

// Container is wider than the card so all 7 buttons are fully visible
const CONTAINER_W = 320;

type FlipState = "front" | "flipping-to-back" | "back" | "flipping-to-front";

/** Fires a window CustomEvent that Terminal.tsx listens to. */
function fireNav(cmd: string) {
  window.dispatchEvent(new CustomEvent("portfolio-nav", { detail: cmd }));
}

const NAV_ITEMS = [
  { cmd: "whoami",       label: "WHOAMI",  icon: "◉" },
  { cmd: "projects",     label: "PROJS",   icon: "◆" },
  { cmd: "experience",   label: "EXP",     icon: "▸" },
  { cmd: "skills",       label: "SKILLS",  icon: "⊕" },
  { cmd: "certificates", label: "CERTS",   icon: "✦" },
  { cmd: "achievements", label: "ACHIEVE", icon: "★" },
  { cmd: "contact",      label: "CONTACT", icon: "✉" },
] as const;

const NavButton: React.FC<{ icon: string; label: string; cmd: string }> = ({
  icon, label, cmd,
}) => {
  const [hov, setHov] = useState(false);
  const [hit, setHit] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setHit(true);
    setTimeout(() => setHit(false), 180);
    fireNav(cmd);
  }, [cmd]);

  const borderColor = hit
    ? "rgba(255,255,255,0.90)"
    : hov
    ? "rgba(255,255,255,0.65)"
    : "rgba(255,255,255,0.30)";

  const fillColor = hit
    ? "rgba(255,255,255,0.18)"
    : hov
    ? "rgba(255,255,255,0.10)"
    : "rgba(10,10,10,0.88)";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setHit(false); }}
      title={cmd}
      style={{
        clipPath:   "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
        background: borderColor,
        padding:    "1.5px",
        flexShrink: 0,
        cursor:     "pointer",
        transform:  hit ? "scale(0.93)" : "scale(1)",
        transition: "background 0.12s ease, transform 0.12s ease",
        outline:    "none",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div style={{
        background:    fillColor,
        transition:    "background 0.12s ease",
        padding:       "9px 10px 8px",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        gap:           "4px",
        minWidth:      "38px",
      }}>
        <span style={{
          fontSize:   "15px",
          lineHeight: 1,
          color:      hov ? "#ffffff" : "rgba(255,255,255,0.65)",
          transition: "color 0.12s",
        }}>
          {icon}
        </span>
        <span style={{
          fontFamily:    "'Courier New', monospace",
          fontSize:      "7.5px",
          fontWeight:    700,
          letterSpacing: "0.08em",
          color:         hov ? "#ffffff" : "rgba(255,255,255,0.75)",
          transition:    "color 0.12s",
          whiteSpace:    "nowrap",
        }}>
          {label}
        </span>
      </div>
    </div>
  );
};

export const IDCard3D: React.FC<IDCard3DProps> = ({ commandRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const shadowRef    = useRef<HTMLDivElement>(null);

  const stateRef = useRef<CardPhysicsState>({
    rotX: 0, rotY: 0, rotZ: 0, posX: 0, posY: 0, swingAngle: 0,
  });

  const currentFlipY = useRef(0);
  const targetFlipY  = useRef(0);
  const flipVel      = useRef(0);
  const flipState    = useRef<FlipState>("front");
  const flipRafRef   = useRef<number>(0);
  const isAnimating  = useRef(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const isDragging = useRef(false);
  const dragStart  = useRef({ x: 0, y: 0, angle: 0 });
  const mouse      = useMousePosition();
  const mouseRef   = useRef(mouse);
  mouseRef.current = mouse;

  const [liveState, setLiveState] = useState<CardPhysicsState>({
    rotX: 0, rotY: 0, rotZ: 0, posX: 0, posY: 0, swingAngle: 0,
  });

  const applyCardTransform = useCallback((physics: CardPhysicsState, flipY: number) => {
    if (!cardRef.current) return;
    const ang    = physics.swingAngle;
    const angRad = (ang * Math.PI) / 180;
    const offX   = Math.sin(angRad) * LANYARD_H * 0.55;
    const offY   = (1 - Math.cos(angRad)) * LANYARD_H * 0.55;
    cardRef.current.style.transform = `
      perspective(1100px)
      translateX(${offX + physics.posX}px)
      translateY(${offY + physics.posY}px)
      rotateZ(${ang}deg)
      rotateX(${physics.rotX}deg)
      rotateY(${flipY}deg)
    `;
  }, []);

  const animateFlip = useCallback(() => {
    const target = targetFlipY.current;
    const diff   = target - currentFlipY.current;
    if (Math.abs(diff) < 0.08 && Math.abs(flipVel.current) < 0.05) {
      currentFlipY.current = target;
      flipVel.current      = 0;
      isAnimating.current  = false;
      if (target % 360 === 0 || target === 0) {
        flipState.current = "front"; setIsFlipped(false);
      } else {
        flipState.current = "back";  setIsFlipped(true);
      }
      applyCardTransform(stateRef.current, currentFlipY.current);
      return;
    }
    flipVel.current      += diff * 0.055;
    flipVel.current      *= 0.82;
    currentFlipY.current += flipVel.current;
    applyCardTransform(stateRef.current, currentFlipY.current);
    flipRafRef.current = requestAnimationFrame(animateFlip);
  }, [applyCardTransform]);

  const triggerFlip = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    if (flipState.current === "front") {
      targetFlipY.current = currentFlipY.current + 180;
      flipVel.current     = 8;
      flipState.current   = "flipping-to-back";
    } else if (flipState.current === "back") {
      targetFlipY.current = currentFlipY.current + 180;
      flipVel.current     = 8;
      flipState.current   = "flipping-to-front";
    } else {
      isAnimating.current = false;
      return;
    }
    cancelAnimationFrame(flipRafRef.current);
    flipRafRef.current = requestAnimationFrame(animateFlip);
  }, [animateFlip]);

  const handleUpdate = useCallback((state: CardPhysicsState) => {
    stateRef.current = state;
    applyCardTransform(state, currentFlipY.current);
    if (shadowRef.current) {
      const ang    = state.swingAngle;
      const angRad = (ang * Math.PI) / 180;
      const sX     = Math.sin(angRad) * 50;
      const blur   = 28 + Math.abs(ang) * 0.6;
      const op     = Math.max(0.12, 0.48 - Math.abs(ang) * 0.008);
      const scaleX = Math.max(0.4, 1 - Math.abs(ang) * 0.012);
      shadowRef.current.style.transform = `translateX(calc(-50% + ${sX}px)) scaleX(${scaleX})`;
      shadowRef.current.style.filter    = `blur(${blur}px)`;
      shadowRef.current.style.opacity   = String(op);
    }
    setLiveState(prev => {
      if (
        Math.abs(prev.swingAngle - state.swingAngle) > 0.05 ||
        Math.abs(prev.rotX      - state.rotX)       > 0.1  ||
        Math.abs(prev.rotY      - state.rotY)       > 0.1
      ) return { ...state };
      return prev;
    });
  }, [applyCardTransform]);

  const { applyImpulse, applyCommand, applySwing } = useCardPhysics(handleUpdate);

  useEffect(() => { if (commandRef) commandRef.current = applyCommand; }, [commandRef, applyCommand]);
  useEffect(() => () => cancelAnimationFrame(flipRafRef.current), []);

  const proxRaf = useRef<number>(0);
  useEffect(() => {
    const tick = () => {
      if (!containerRef.current || isDragging.current) {
        proxRaf.current = requestAnimationFrame(tick); return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + LANYARD_H  + CARD_H / 2;
      const dx   = mouseRef.current.x - cx;
      const dy   = mouseRef.current.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxD = 300;
      if (dist < maxD && dist > 10) {
        const prox  = 1 - dist / maxD;
        const speed = Math.min(mouseRef.current.speed, 4);
        const force = prox * prox * 0.01 * (1 + speed * 0.25);
        applyImpulse((dy / maxD) * force * 25, (dx / maxD) * force * 25);
        if (speed > 0.8) applySwing((dx / maxD) * force * 5 * speed);
      }
      proxRaf.current = requestAnimationFrame(tick);
    };
    proxRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(proxRaf.current);
  }, [applyImpulse, applySwing]);

  const dragMoved    = useRef(false);
  const mouseDownPos = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current   = true;
    dragMoved.current    = false;
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    dragStart.current    = { x: e.clientX, y: e.clientY, angle: stateRef.current.swingAngle };
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - mouseDownPos.current.x;
    const dy = e.clientY - mouseDownPos.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragMoved.current = true;
    const tgt = dragStart.current.angle + (e.clientX - dragStart.current.x) * 0.28;
    applySwing((tgt - stateRef.current.swingAngle) * 0.18);
    applyImpulse(
      (e.clientY - dragStart.current.y) * 0.008,
      (e.clientX - dragStart.current.x) * 0.008,
    );
  }, [applySwing, applyImpulse]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (!dragMoved.current) triggerFlip();
    dragMoved.current = false;
  }, [triggerFlip]);

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    dragMoved.current  = false;
  }, []);

  const touchMoved    = useRef(false);
  const touchStartPos = useRef({ x: 0, y: 0 });

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current    = true;
    touchMoved.current    = false;
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    dragStart.current = {
      x: e.touches[0].clientX, y: e.touches[0].clientY,
      angle: stateRef.current.swingAngle,
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - touchStartPos.current.x;
    const dy = e.touches[0].clientY - touchStartPos.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) touchMoved.current = true;
    const tgt = dragStart.current.angle + (e.touches[0].clientX - dragStart.current.x) * 0.28;
    applySwing((tgt - stateRef.current.swingAngle) * 0.18);
    applyImpulse(
      (e.touches[0].clientY - dragStart.current.y) * 0.008,
      (e.touches[0].clientX - dragStart.current.x) * 0.008,
    );
    e.preventDefault();
  }, [applySwing, applyImpulse]);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (!touchMoved.current) triggerFlip();
    touchMoved.current = false;
  }, [triggerFlip]);

  // Card is centred inside the wider container
  const cardOffsetLeft = (CONTAINER_W - CARD_W) / 2;

  return (
    <div
      ref={containerRef}
      style={{
        position:      "relative",
        width:         CONTAINER_W,
        height:        LANYARD_H + CARD_H + 44 + NAV_H,
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        userSelect:    "none",
      }}
    >
      {/* Lanyard — centred over card, not container */}
      <div style={{ position: "absolute", left: cardOffsetLeft, top: 0, width: CARD_W }}>
        <LanyardSystem
          swingAngle={liveState.swingAngle}
          rotX={liveState.rotX}
          rotY={liveState.rotY}
          cardWidth={CARD_W}
          lanyardHeight={LANYARD_H + 22}
        />
      </div>

      {/* 3-D card */}
      <div
        ref={cardRef}
        title="Click to flip card"
        style={{
          position:       "absolute",
          top:            LANYARD_H,
          left:           "50%",
          marginLeft:     -CARD_W / 2,
          width:          CARD_W,
          height:         CARD_H,
          transformStyle: "preserve-3d",
          cursor:         "pointer",
          willChange:     "transform",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <RealisticCard
          rotX={liveState.rotX}
          rotY={liveState.rotY}
          swingAngle={liveState.swingAngle}
          isFlipped={isFlipped}
        />
      </div>

      {/* Click hint */}
      <div style={{
        position:      "absolute",
        top:           LANYARD_H + CARD_H + 10,
        left:          "50%",
        transform:     "translateX(-50%)",
        fontSize:      "9px",
        color:         "rgba(255,255,255,0.22)",
        letterSpacing: "1.5px",
        fontFamily:    "'JetBrains Mono', monospace",
        whiteSpace:    "nowrap",
        pointerEvents: "none",
        userSelect:    "none",
      }}>
        click to flip
      </div>

      {/* ── EXPLORE STRIP ── */}
      <div style={{
        position: "absolute",
        top:      LANYARD_H + CARD_H + 34,
        left:     0,
        width:    CONTAINER_W,
      }}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,rgba(255,255,255,0.20),transparent)" }} />
          <span style={{
            fontFamily:    "'Courier New', monospace",
            fontSize:      "7px",
            color:         "rgba(255,255,255,0.45)",
            letterSpacing: "0.22em",
            fontWeight:    700,
            flexShrink:    0,
          }}>
            EXPLORE
          </span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.20))" }} />
        </div>

        {/* All 7 buttons in a single row — no overflow needed at CONTAINER_W=320 */}
        <div style={{
          display:       "flex",
          flexDirection: "row",
          gap:           "4px",
          justifyContent:"center",
        }}>
          {NAV_ITEMS.map(item => (
            <NavButton key={item.cmd} icon={item.icon} label={item.label} cmd={item.cmd} />
          ))}
        </div>

        {/* Description text */}
        <div style={{
          marginTop:  "12px",
          textAlign:  "center",
          padding:    "0 6px",
        }}>
          <span style={{
  fontFamily:    "'Courier New', monospace",
  fontSize:      "11px",                        // ← was 8px
  color:         "rgba(255,255,255,0.75)",       // ← was 0.42 (brighter)
  letterSpacing: "0.06em",
  lineHeight:    1.6,
}}>
  Click a button above <span style={{ color: "rgba(255,255,255,0.40)" }}>·</span> or type commands in the terminal
</span>
<br />
<span style={{
  fontFamily:    "'Courier New', monospace",
  fontSize:      "10px",                        // ← was 7.5px
  color:         "rgba(255,255,255,0.55)",       // ← was 0.28 (brighter)
  letterSpacing: "0.06em",
}}>
  Type <span style={{
    color:       "rgba(150,220,150,1.0)",        // ← was 0.75 (full brightness)
    fontWeight:  700,
    letterSpacing: "0.05em",
  }}>help</span> in the terminal to see all commands
</span>
        </div>
      </div>

      {/* Ground shadow */}
      <div
        ref={shadowRef}
        style={{
          position:      "absolute",
          top:           LANYARD_H + CARD_H + 14,
          left:          "50%",
          width:         CARD_W * 0.82,
          height:        "18px",
          background:    "radial-gradient(ellipse at center,rgba(0,0,0,0.75) 0%,transparent 70%)",
          filter:        "blur(28px)",
          opacity:       0.45,
          pointerEvents: "none",
          transform:     "translateX(-50%)",
          willChange:    "transform, filter, opacity",
        }}
      />
    </div>
  );
};