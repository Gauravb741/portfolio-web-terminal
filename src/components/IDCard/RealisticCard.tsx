import React, { useState, useEffect, useRef } from "react";
import { profile } from "../../data/profile";

/* =========================================================
   DESIGN TOKENS — MAD BLACK EDITION
   Border accent: pure white #ffffff
   Card body:     pure matte black
   Text:          clean white / silver
   ========================================================= */

const G = "#ffffff";
const G2 = "rgba(255,255,255,0.65)";
const G3 = "rgba(255,255,255,0.22)";
const G4 = "rgba(255,255,255,0.09)";

const INK = "#ffffff";
const INK2 = "rgba(255,255,255,0.78)";
const INK3 = "rgba(255,255,255,0.42)";

const BG = "#080808";
const BG2 = "#0d0d0d";
const BG3 = "#111111";

/* =========================================================
   CARD GEOMETRY — asymmetric hex with diagonal slash
   Top-left normal, top-right slashed at 30°,
   Bottom-left slashed at 30°, bottom-right clipped small
   ========================================================= */

// Outer border shape
const OUTER =
  "polygon(" +
  "0% 6%," +           // left edge start
  "3% 0%," +           // top-left bevel
  "72% 0%," +          // top edge
  "100% 14%," +        // top-right slash (steep)
  "100% 88%," +        // right edge
  "96% 94%," +         // bottom-right small clip
  "80% 100%," +        // bottom-right notch
  "4% 100%," +         // bottom edge
  "0% 94%" +           // bottom-left bevel
  ")";

// Inner fill — 1.5px inset
const INNER =
  "polygon(" +
  "0.6% 6.4%," +
  "3.4% 0.7%," +
  "71.6% 0.7%," +
  "99.2% 14.5%," +
  "99.2% 87.7%," +
  "95.5% 93.6%," +
  "79.5% 99.2%," +
  "4.5% 99.2%," +
  "0.6% 93.5%" +
  ")";

/* =========================================================
   GRAIN CANVAS — renders noise for the photo fade
   ========================================================= */

const GrainCanvas: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const imageData = ctx.createImageData(width, height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = Math.random() * 60; // sparse alpha
      }
      ctx.putImageData(imageData, 0, 0);
    };

    draw();
    const id = setInterval(draw, 120);
    return () => clearInterval(id);
  }, [width, height]);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.55,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
  );
};

/* =========================================================
   SCAN LINE ANIMATION
   ========================================================= */

const ScanLine: React.FC = () => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      setPos((elapsed % 4) / 4);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: `${pos * 100}%`,
        height: "1px",
        background: `linear-gradient(90deg, transparent 0%, ${G3} 30%, rgba(255,255,255,0.28) 50%, ${G3} 70%, transparent 100%)`,
        pointerEvents: "none",
        zIndex: 25,
        transition: "none",
      }}
    />
  );
};

/* =========================================================
   BLINK DOT
   ========================================================= */

const BlinkDot: React.FC = () => {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: on ? G : "transparent",
        boxShadow: on ? `0 0 8px ${G}` : "none",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }}
    />
  );
};

/* =========================================================
   FRONT FACE
   ========================================================= */

const CardFront: React.FC<{
  rotX: number;
  rotY: number;
  swingAngle: number;
}> = ({ rotX, rotY, swingAngle }) => {
  const [imgErr, setImgErr] = useState(false);

  const lightX = 48 + rotY * 1.2;
  const lightY = 38 - rotX * 1.1;
  const sheenAngle = 105 + swingAngle * 0.4;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* ── OUTER BORDER — white rim ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: OUTER,
          WebkitClipPath: OUTER,
          background: `linear-gradient(
            135deg,
            #ffffff 0%,
            rgba(255,255,255,0.85) 22%,
            rgba(255,255,255,0.40) 48%,
            rgba(255,255,255,0.18) 72%,
            #050505 100%
          )`,
        }}
      />

      {/* ── INNER CARD BODY ── */}
      <div
        style={{
          position: "absolute",
          inset: "1.5px",
          clipPath: INNER,
          WebkitClipPath: INNER,
          overflow: "hidden",
          background: `
            radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.05), transparent 42%),
            linear-gradient(160deg, ${BG2} 0%, ${BG} 55%, #030303 100%)
          `,
        }}
      >
        {/* ── MICRO GRID TEXTURE ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── MOVING SHEEN ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background: `linear-gradient(
              ${sheenAngle}deg,
              transparent 30%,
              rgba(255,255,255,0.010) 46%,
              rgba(255,255,255,0.025) 50%,
              rgba(255,255,255,0.006) 54%,
              transparent 70%
            )`,
          }}
        />

        {/* ── ANIMATED SCAN LINE ── */}
        <ScanLine />

        {/* ── PHOTO ZONE — full bleed top 56% ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "56%",
            zIndex: 5,
            overflow: "hidden",
          }}
        >
          {!imgErr ? (
            <>
              <img
                src={profile.profileImage}
                alt={profile.name}
                onError={() => setImgErr(true)}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 10%",
                  filter: "grayscale(1) contrast(1.18) brightness(0.88) sepia(0.12) hue-rotate(260deg)",
                  WebkitMaskImage: `linear-gradient(
                    to bottom,
                    #000 0%,
                    #000 62%,
                    rgba(0,0,0,0.92) 72%,
                    rgba(0,0,0,0.60) 84%,
                    rgba(0,0,0,0.20) 93%,
                    transparent 100%
                  )`,
                  maskImage: `linear-gradient(
                    to bottom,
                    #000 0%,
                    #000 62%,
                    rgba(0,0,0,0.92) 72%,
                    rgba(0,0,0,0.60) 84%,
                    rgba(0,0,0,0.20) 93%,
                    transparent 100%
                  )`,
                }}
              />
              {/* grain canvas — animates over the fade zone */}
              <GrainCanvas width={300} height={220} />
            </>
          ) : (
            /* fallback silhouette */
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: "8%",
                background: `radial-gradient(ellipse at 50% 30%, ${G4}, transparent 68%)`,
              }}
            >
              <svg viewBox="0 0 60 80" width="55%" fill="none">
                <circle cx="30" cy="22" r="16" fill="rgba(255,255,255,0.08)" />
                <path d="M6 78C7 57 17 46 30 46C43 46 53 57 54 78" fill="rgba(255,255,255,0.06)" />
              </svg>
            </div>
          )}

          {/* top-left corner mark */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "6%",
              width: "14px",
              height: "14px",
              borderTop: `1.5px solid ${G2}`,
              borderLeft: `1.5px solid ${G2}`,
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "8%",
              right: "6%",
              width: "14px",
              height: "14px",
              borderTop: `1.5px solid ${G2}`,
              borderRight: `1.5px solid ${G2}`,
              zIndex: 10,
            }}
          />
        </div>

        {/* ── DIAGONAL SLASH SEPARATOR ── */}
        <div
          style={{
            position: "absolute",
            top: "52%",
            left: "-5%",
            right: "-5%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${G2} 20%, ${G} 50%, ${G2} 80%, transparent)`,
            transform: "rotate(-3deg)",
            zIndex: 8,
          }}
        />

        {/* ── HEADER CHIP ── top-left */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "6%",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(0,0,0,0.72)",
            border: `1px solid ${G2}`,
            padding: "3px 8px",
            zIndex: 12,
            clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          }}
        >
          <span
            style={{
              color: G,
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(5px, 1.1cqw, 7px)",
              letterSpacing: "0.14em",
              fontWeight: 700,
            }}
          >
            DEV / ID
          </span>
          <BlinkDot />
        </div>

        {/* ── NAME BLOCK ── */}
        <div
          style={{
            position: "absolute",
            top: "54%",
            left: "6%",
            right: "6%",
            zIndex: 10,
          }}
        >
          {/* ROLE — above name, small */}
          <div
            style={{
              color: G,
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(5px, 1.3cqw, 7.5px)",
              letterSpacing: "0.22em",
              fontWeight: 700,
              marginBottom: "1.4cqw",
              textTransform: "uppercase",
            }}
          >
            {profile.role}
          </div>

          {/* FULL NAME — large, split weight */}
          <div
            style={{
              fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(14px, 5.2cqw, 28px)",
              lineHeight: 0.95,
              color: INK,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            {profile.name}
          </div>

          {/* STATUS ROW */}
          <div
            style={{
              marginTop: "2.2cqw",
              display: "flex",
              alignItems: "center",
              gap: "2cqw",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.4cqw",
                background: "#000",
                border: `1px solid ${G}`,
                padding: "1cqw 2.4cqw",
                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              }}
            >
              <BlinkDot />
              <span
                style={{
                  color: G,
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(4px, 1.2cqw, 7px)",
                  letterSpacing: "0.16em",
                  fontWeight: 700,
                }}
              >
                ACTIVE
              </span>
            </div>

            <span
              style={{
                color: INK3,
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(4px, 1.05cqw, 6.5px)",
                letterSpacing: "0.1em",
              }}
            >
              {profile.developerId}
            </span>
          </div>
        </div>

        {/* ── INFO TABLE ── */}
        <div
          style={{
            position: "absolute",
            top: "74%",
            left: "6%",
            right: "6%",
            zIndex: 10,
          }}
        >
          {[
            { k: "EDU", v: profile.education },
            { k: "UNI", v: profile.university },
            { k: "LOC", v: profile.location },
            { k: "VALID", v: profile.expiryDate },
          ].map((row, i, arr) => (
            <div
              key={row.k}
              style={{
                display: "grid",
                gridTemplateColumns: "22% 1fr",
                columnGap: "4%",
                padding: "1.2cqw 0",
                borderBottom:
                  i < arr.length - 1
                    ? `1px solid rgba(255,255,255,0.14)`
                    : "none",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  color: G2,
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(8px, 8cqw, 8px)",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  paddingTop: "0.15em",
                }}
              >
                {row.k}
              </span>
              <span
                style={{
                  color: INK2,
                  fontFamily: "Inter, Arial, sans-serif",
                  fontSize: "clamp(7.5px, 7.5cqw, 7.5px)",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  overflowWrap: "break-word",
                  wordBreak: "normal",
                }}
              >
                {row.v}
              </span>
            </div>
          ))}
        </div>

        {/* ── BOTTOM LEFT ACCENT TEXT ── */}
        <div
          style={{
            position: "absolute",
            left: "6%",
            bottom: "5%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              color: G,
              fontFamily: "'Courier New', monospace",
              fontWeight: 900,
              fontSize: "clamp(16px, 4.8cqw, 26px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              opacity: 0.07,
              userSelect: "none",
            }}
          >
            DEV
          </div>
        </div>

        {/* ── DIAGONAL CORNER MARK — top right slash zone ── */}
        <div
          style={{
            position: "absolute",
            top: "6%",
            right: "10%",
            width: "1px",
            height: "8%",
            background: `linear-gradient(to bottom, ${G3}, transparent)`,
            transform: "rotate(22deg)",
            zIndex: 6,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

/* =========================================================
   BACK FACE
   ========================================================= */

const CardBack: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
    }}
  >
    {/* OUTER BORDER */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        clipPath: OUTER,
        WebkitClipPath: OUTER,
        background: `linear-gradient(
          315deg,
          #ffffff 0%,
          rgba(255,255,255,0.80) 28%,
          rgba(255,255,255,0.35) 58%,
          rgba(255,255,255,0.14) 80%,
          #050505 100%
        )`,
      }}
    />

    {/* INNER BODY */}
    <div
      style={{
        position: "absolute",
        inset: "1.5px",
        clipPath: INNER,
        WebkitClipPath: INNER,
        overflow: "hidden",
        background: `linear-gradient(160deg, ${BG3} 0%, ${BG} 60%, #030303 100%)`,
      }}
    >
      {/* GRID */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* BIG DIAGONAL SLASH — decorative */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "140%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${G3} 40%, ${G2} 55%, ${G3} 70%, transparent)`,
          transform: "rotate(25deg)",
          transformOrigin: "left center",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "140%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.14) 55%, rgba(255,255,255,0.08) 70%, transparent)`,
          transform: "rotate(25deg)",
          transformOrigin: "left center",
        }}
      />

      {/* ── BACK HEADER ── */}
      <div
        style={{
          position: "absolute",
          top: "7%",
          left: "7%",
          right: "7%",
          zIndex: 5,
        }}
      >
        <div
          style={{
            color: G2,
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(5px, 1.2cqw, 7px)",
            letterSpacing: "0.2em",
            fontWeight: 700,
            marginBottom: "1.8cqw",
          }}
        >
          AUTHORIZED DEVELOPER
        </div>

        <div
          style={{
            fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(13px, 4.6cqw, 24px)",
            lineHeight: 0.95,
            color: INK,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            marginBottom: "1.5cqw",
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            color: G,
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(9px, 9cqw, 9px)",
            letterSpacing: "0.18em",
            fontWeight: 700,
          }}
        >
          {profile.role}
        </div>
      </div>

      {/* ── MAGNETIC STRIPE ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "28%",
          height: "5.5%",
          minHeight: "22px",
          background: `linear-gradient(180deg, #020404 0%, #080e0b 50%, #020404 100%)`,
          borderTop: `1px solid rgba(255,255,255,0.06)`,
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
        }}
      />

      {/* ── CONTACT SECTION ── */}
      <div
        style={{
          position: "absolute",
          top: "37%",
          left: "7%",
          right: "7%",
          zIndex: 5,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.42)",
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(4.5px, 1.05cqw, 6.5px)",
            letterSpacing: "0.18em",
            marginBottom: "2cqw",
          }}
        >
          CONTACT / LINKS
        </div>

        {[
          { label: "EMAIL", value: profile.email },
          { label: "GH", value: profile.github.replace("https://", "") },
          { label: "LI", value: profile.linkedin.replace("https://", "") },
          { label: "WEB", value: profile.portfolio.replace("https://", "") },
        ].map((row, i, arr) => (
          <div
            key={row.label}
            style={{
              display: "grid",
              gridTemplateColumns: "18% 1fr",
              columnGap: "4%",
              padding: "1.8cqw 0",
              borderBottom:
                i < arr.length - 1
                  ? `1px solid rgba(255,255,255,0.12)`
                  : "none",
              alignItems: "start",
            }}
          >
            <span
              style={{
                color: G2,
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(10px, 10cqw, 10px)",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                color: INK2,
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(7.5px, 7.5cqw, 7.5px)",
                lineHeight: 1.35,
                overflowWrap: "anywhere",
                wordBreak: "break-all",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── SKILL TAGS ── */}
      <div
        style={{
          position: "absolute",
          bottom: "16%",
          left: "7%",
          right: "7%",
          zIndex: 5,
          display: "flex",
          flexWrap: "wrap",
          gap: "1.4cqw",
        }}
      >
        {["Python", "Java", "Docker", "K8s", "AWS"].map((tag) => (
          <span
            key={tag}
            style={{
              color: G,
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(4px, 1cqw, 6px)",
              letterSpacing: "0.1em",
              fontWeight: 700,
              border: `1px solid ${G3}`,
              padding: "0.6cqw 1.6cqw",
              background: G4,
              clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── BACK FOOTER ── */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: "7%",
          right: "7%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 6,
          borderTop: `1px solid rgba(255,255,255,0.12)`,
          paddingTop: "1.5cqw",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.50)",
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(4px, 5cqw, 6px)",
            letterSpacing: "0.08em",
          }}
        >
          {profile.cardSerial}
        </span>
        <span
          style={{
            color: INK3,
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(4px, 1cqw, 6px)",
            letterSpacing: "0.08em",
          }}
        >
          &gt; FLIP / RETURN
        </span>
      </div>
    </div>
  </div>
);

/* =========================================================
   MAIN EXPORT
   ========================================================= */

interface RealisticCardProps {
  rotX: number;
  rotY: number;
  swingAngle: number;
  isFlipped?: boolean; // optional — flip is now owned internally
}

export const RealisticCard: React.FC<RealisticCardProps> = ({
  rotX,
  rotY,
  swingAngle,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "5 / 9",
        position: "relative",
        containerType: "inline-size",
        transformStyle: "preserve-3d",
        perspective: "1200px",
        cursor: "pointer",
        transform: flipped
          ? "rotateY(180deg)"
          : `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: flipped
          ? "transform 0.75s cubic-bezier(0.4, 0.0, 0.2, 1)"
          : "transform 0.08s linear",
      }}
    >
      <CardFront rotX={flipped ? 0 : rotX} rotY={flipped ? 0 : rotY} swingAngle={swingAngle} />
      <CardBack />
    </div>
  );
};