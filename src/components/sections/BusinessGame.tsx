"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowRight, Zap } from "lucide-react";

/* ─── Canvas constants ──────────────────────────────── */
const W = 900, H = 320;
const GROUND = 252;
const PX = 100, PW = 30, PH = 38;
const GRAVITY = 0.65;
const JUMP_V = -16;
const BASE_SPD = 5.5;
const SPD_INC = 0.0014;

const OBS_LABELS = [
  "BAD HIRE", "NO STRATEGY", "CASH CRUNCH",
  "BRAND CRISIS", "LOST LEAD", "NO SYSTEMS",
  "MARKET DROP", "WRONG PIVOT", "POOR UX",
];

type Phase = "idle" | "playing" | "dead";

interface Obs  { x: number; w: number; h: number; label: string }
interface Ptcl { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; col: string }
interface Star  { x: number; y: number; r: number; a: number }

/* ─── Static star field ─────────────────────────────── */
const STARS: Star[] = Array.from({ length: 80 }, () => ({
  x: Math.random() * W,
  y: Math.random() * (GROUND - 30),
  r: Math.random() * 1.2 + 0.2,
  a: Math.random() * 0.35 + 0.05,
}));

/* ─── Draw ──────────────────────────────────────────── */
function draw(
  ctx: CanvasRenderingContext2D,
  py: number,
  onGround: boolean,
  obs: Obs[],
  ptcls: Ptcl[],
  sc: number,
  hi: number,
  spd: number,
  phase: Phase,
  tick: number,
) {
  /* ── background ── */
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#020705");
  bg.addColorStop(0.6, "#030c05");
  bg.addColorStop(1, "#040f06");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* stars */
  for (const s of STARS) {
    ctx.globalAlpha = s.a * (0.7 + 0.3 * Math.sin(tick * 0.02 + s.x));
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  /* speed lines (only when playing) */
  if (phase === "playing") {
    const lineCount = 18;
    ctx.strokeStyle = "rgba(74,222,128,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i < lineCount; i++) {
      const ly = 20 + (i / lineCount) * (GROUND - 40);
      const len = 30 + Math.random() * 80;
      const lx = ((tick * (BASE_SPD + i * 0.4) * 2) % (W + 200)) - 100;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx - len, ly);
      ctx.stroke();
    }
  }

  /* subtle grid */
  ctx.strokeStyle = "rgba(74,222,128,0.025)";
  ctx.lineWidth = 1;
  for (let gx = 0; gx < W; gx += 80) {
    ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, GROUND); ctx.stroke();
  }
  for (let gy = 40; gy < GROUND; gy += 60) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
  }

  /* ── ground ── */
  // glow beneath
  const groundGlow = ctx.createLinearGradient(0, GROUND, 0, H);
  groundGlow.addColorStop(0, "rgba(74,222,128,0.12)");
  groundGlow.addColorStop(0.5, "rgba(74,222,128,0.04)");
  groundGlow.addColorStop(1, "transparent");
  ctx.fillStyle = groundGlow;
  ctx.fillRect(0, GROUND, W, H - GROUND);

  // ground line
  ctx.shadowColor = "#4ade80";
  ctx.shadowBlur = 10;
  ctx.strokeStyle = "#4ade80";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();
  ctx.shadowBlur = 0;

  // dashes on ground
  ctx.strokeStyle = "rgba(74,222,128,0.15)";
  ctx.lineWidth = 1;
  ctx.setLineDash([20, 30]);
  ctx.lineDashOffset = -(tick * spd * 0.5) % 50;
  ctx.beginPath(); ctx.moveTo(0, GROUND + 12); ctx.lineTo(W, GROUND + 12); ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineDashOffset = 0;

  /* ── obstacles ── */
  for (const o of obs) {
    const oy = GROUND - o.h;

    // outer glow
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 20;
    const oFill = ctx.createLinearGradient(o.x, oy, o.x + o.w, GROUND);
    oFill.addColorStop(0, "rgba(185,28,28,0.85)");
    oFill.addColorStop(1, "rgba(127,10,10,0.95)");
    ctx.fillStyle = oFill;
    ctx.beginPath();
    (ctx as any).roundRect(o.x, oy, o.w, o.h, [4, 4, 2, 2]);
    ctx.fill();
    ctx.shadowBlur = 0;

    // top cap
    const capGrd = ctx.createLinearGradient(o.x, oy, o.x + o.w, oy);
    capGrd.addColorStop(0, "rgba(252,165,165,0.0)");
    capGrd.addColorStop(0.5, "rgba(252,165,165,0.9)");
    capGrd.addColorStop(1, "rgba(252,165,165,0.0)");
    ctx.fillStyle = capGrd;
    ctx.fillRect(o.x, oy, o.w, 3);

    // inner shine
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(o.x + 3, oy + 4, 4, o.h - 8);

    // border
    ctx.strokeStyle = "rgba(248,113,113,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    (ctx as any).roundRect(o.x, oy, o.w, o.h, [4, 4, 2, 2]);
    ctx.stroke();

    // label
    if (o.h > 40) {
      ctx.save();
      ctx.translate(o.x + o.w / 2, oy + o.h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.font = "bold 7.5px 'Courier New', monospace";
      ctx.fillStyle = "rgba(252,165,165,0.85)";
      ctx.textAlign = "center";
      ctx.letterSpacing = "0.08em";
      ctx.fillText(o.label, 0, 3);
      ctx.restore();
    }
  }

  /* ── particles ── */
  for (const p of ptcls) {
    const alpha = (p.life / p.max) * 0.85;
    ctx.globalAlpha = alpha;
    ctx.shadowColor = p.col;
    ctx.shadowBlur = 4;
    ctx.fillStyle = p.col;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * (p.life / p.max), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  /* ── player ── */
  const px = PX, py2 = py;
  const cx = px + PW / 2, cy = py2 + PH / 2;

  // glow
  const pGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 50);
  pGlow.addColorStop(0, onGround ? "rgba(74,222,128,0.22)" : "rgba(74,222,128,0.5)");
  pGlow.addColorStop(1, "transparent");
  ctx.fillStyle = pGlow;
  ctx.fillRect(cx - 55, cy - 55, 110, 110);

  // body — sleek hexagonal/angular shape
  ctx.shadowColor = "#4ade80";
  ctx.shadowBlur = onGround ? 14 : 24;

  // Main body (clipped diamond/arrow)
  ctx.fillStyle = "#4ade80";
  ctx.beginPath();
  ctx.moveTo(px + PW * 0.5, py2);               // top point
  ctx.lineTo(px + PW,       py2 + PH * 0.35);   // right top
  ctx.lineTo(px + PW,       py2 + PH * 0.75);   // right bottom
  ctx.lineTo(px + PW * 0.5, py2 + PH);          // bottom point
  ctx.lineTo(px,            py2 + PH * 0.75);   // left bottom
  ctx.lineTo(px,            py2 + PH * 0.35);   // left top
  ctx.closePath();
  ctx.fill();

  // inner highlight
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.beginPath();
  ctx.moveTo(px + PW * 0.5, py2 + 4);
  ctx.lineTo(px + PW - 5,   py2 + PH * 0.35);
  ctx.lineTo(px + PW * 0.5, py2 + PH * 0.5);
  ctx.lineTo(px + 5,        py2 + PH * 0.35);
  ctx.closePath();
  ctx.fill();

  // center dot
  ctx.fillStyle = "#060d06";
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(cx - 1, cy - 1, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;

  // landing shadow
  if (onGround) {
    const shadow = ctx.createRadialGradient(cx, GROUND + 3, 1, cx, GROUND + 3, 28);
    shadow.addColorStop(0, "rgba(74,222,128,0.5)");
    shadow.addColorStop(1, "transparent");
    ctx.fillStyle = shadow;
    ctx.fillRect(cx - 32, GROUND - 3, 64, 12);
  }

  /* ── HUD ── */
  // speed bar
  const barW = 80, barH = 5;
  const barX = 16, barY = 16;
  const spd01 = Math.min((spd - BASE_SPD) / 8, 1);
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  (ctx as any).roundRect && ctx.beginPath();
  (ctx as any).roundRect(barX, barY, barW, barH, 3);
  ctx.fill();
  const barFill = ctx.createLinearGradient(barX, 0, barX + barW, 0);
  barFill.addColorStop(0, "#4ade80");
  barFill.addColorStop(0.6, "#facc15");
  barFill.addColorStop(1, "#ef4444");
  ctx.fillStyle = barFill;
  ctx.beginPath();
  (ctx as any).roundRect(barX, barY, barW * spd01, barH, 3);
  ctx.fill();
  ctx.font = "8px 'Courier New', monospace";
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.textAlign = "left";
  ctx.fillText("SPEED", barX, barY + barH + 11);

  // score
  ctx.font = "bold 18px 'Courier New', monospace";
  ctx.textAlign = "right";
  ctx.fillStyle = "#4ade80";
  ctx.shadowColor = "#4ade80";
  ctx.shadowBlur = 8;
  ctx.fillText(`${sc}m`, W - 14, 26);
  ctx.shadowBlur = 0;
  ctx.font = "9px 'Courier New', monospace";
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fillText(`BEST ${hi}m`, W - 14, 42);

  /* ── idle prompt ── */
  if (phase === "idle") {
    // frosted panel
    ctx.fillStyle = "rgba(4,15,6,0.75)";
    (ctx as any).roundRect && ctx.beginPath();
    (ctx as any).roundRect(W / 2 - 190, H / 2 - 38, 380, 76, 12);
    ctx.fill();
    ctx.strokeStyle = "rgba(74,222,128,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    (ctx as any).roundRect(W / 2 - 190, H / 2 - 38, 380, 76, 12);
    ctx.stroke();

    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = "#4ade80";
    ctx.shadowColor = "#4ade80";
    ctx.shadowBlur = 10;
    ctx.textAlign = "center";
    ctx.fillText("PRESS  SPACE  TO  START", W / 2, H / 2 - 6);
    ctx.shadowBlur = 0;
    ctx.font = "10px 'Courier New', monospace";
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillText("SPACE ×2  for double jump  ·  TAP  on mobile", W / 2, H / 2 + 18);
  }

  /* ── scanlines overlay ── */
  ctx.fillStyle = "rgba(0,0,0,0.04)";
  for (let sl = 0; sl < H; sl += 3) {
    ctx.fillRect(0, sl, W, 1);
  }
}

/* ─── Component ─────────────────────────────────────── */
export default function BusinessGame() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const phaseRef   = useRef<Phase>("idle");
  const pyRef      = useRef(GROUND - PH);
  const vyRef      = useRef(0);
  const groundRef  = useRef(true);
  const djRef      = useRef(true);
  const obsRef     = useRef<Obs[]>([]);
  const ptclsRef   = useRef<Ptcl[]>([]);
  const spdRef     = useRef(BASE_SPD);
  const frameRef   = useRef(0);
  const scRef      = useRef(0);
  const hiRef      = useRef(0);
  const nextObsRef = useRef(120);
  const rafRef     = useRef(0);
  const tickRef    = useRef(0);

  const [phase,   setPhase]   = useState<Phase>("idle");
  const [score,   setScore]   = useState(0);
  const [hiScore, setHi]      = useState(0);

  /* spawn particle burst */
  const burst = useCallback((x: number, y: number, col: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const spd2 = 1.5 + Math.random() * 3;
      ptclsRef.current.push({
        x, y,
        vx: Math.cos(angle) * spd2,
        vy: Math.sin(angle) * spd2 - 1,
        life: 28 + Math.random() * 20,
        max: 48,
        r: 2 + Math.random() * 2,
        col,
      });
    }
  }, []);

  /* trailing particles while running */
  const trailParticle = useCallback(() => {
    ptclsRef.current.push({
      x: PX - 4,
      y: pyRef.current + PH * 0.6,
      vx: -1.5 - Math.random() * 2,
      vy: (Math.random() - 0.5) * 1.2,
      life: 14 + Math.random() * 8,
      max: 22,
      r: 1 + Math.random() * 1.5,
      col: "#4ade80",
    });
  }, []);

  const jump = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    if (groundRef.current) {
      vyRef.current = JUMP_V;
      groundRef.current = false;
      djRef.current = true;
      burst(PX + PW / 2, GROUND, "#4ade80", 6);
    } else if (djRef.current) {
      vyRef.current = JUMP_V * 0.83;
      djRef.current = false;
      burst(PX + PW / 2, pyRef.current + PH, "#86efac", 5);
    }
  }, [burst]);

  const startGame = useCallback(() => {
    pyRef.current = GROUND - PH;
    vyRef.current = 0;
    groundRef.current = true;
    djRef.current = true;
    obsRef.current = [];
    ptclsRef.current = [];
    spdRef.current = BASE_SPD;
    frameRef.current = 0;
    scRef.current = 0;
    nextObsRef.current = 120;
    phaseRef.current = "playing";
    setPhase("playing");
    setScore(0);
  }, []);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || phaseRef.current !== "playing") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    frameRef.current++;
    tickRef.current++;
    spdRef.current += SPD_INC;
    scRef.current = Math.floor(frameRef.current / 6);
    if (frameRef.current % 20 === 0) setScore(scRef.current);

    /* physics */
    vyRef.current += GRAVITY;
    pyRef.current += vyRef.current;
    if (pyRef.current >= GROUND - PH) {
      pyRef.current = GROUND - PH;
      vyRef.current = 0;
      if (!groundRef.current) burst(PX + PW / 2, GROUND, "#4ade80", 4);
      groundRef.current = true;
      djRef.current = true;
    }

    /* trail */
    if (frameRef.current % 3 === 0) trailParticle();

    /* update particles */
    ptclsRef.current = ptclsRef.current
      .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.1, life: p.life - 1 }))
      .filter(p => p.life > 0);

    /* spawn obstacle */
    nextObsRef.current--;
    if (nextObsRef.current <= 0) {
      const h = 32 + Math.random() * 62;
      obsRef.current.push({
        x: W + 10,
        w: 28 + Math.random() * 26,
        h,
        label: OBS_LABELS[Math.floor(Math.random() * OBS_LABELS.length)],
      });
      nextObsRef.current = 75 + Math.random() * 95;
    }

    /* move obstacles */
    obsRef.current = obsRef.current
      .map(o => ({ ...o, x: o.x - spdRef.current }))
      .filter(o => o.x > -80);

    /* collision */
    const cx = PX + 5, cy = pyRef.current + 5, cw = PW - 10, ch = PH - 8;
    for (const o of obsRef.current) {
      const oy = GROUND - o.h;
      if (cx < o.x + o.w - 3 && cx + cw > o.x + 3 && cy + ch > oy + 3) {
        // death burst
        burst(PX + PW / 2, pyRef.current + PH / 2, "#ef4444", 16);
        burst(PX + PW / 2, pyRef.current + PH / 2, "#fca5a5", 10);
        phaseRef.current = "dead";
        const finalScore = scRef.current;
        const newHi = Math.max(hiRef.current, finalScore);
        hiRef.current = newHi;
        setHi(newHi);
        setScore(finalScore);
        setPhase("dead");
        // draw one last frame with particles
        draw(ctx, pyRef.current, groundRef.current, obsRef.current,
          ptclsRef.current, finalScore, newHi, spdRef.current, "dead", tickRef.current);
        return;
      }
    }

    draw(ctx, pyRef.current, groundRef.current, obsRef.current,
      ptclsRef.current, scRef.current, hiRef.current, spdRef.current, "playing", tickRef.current);
    rafRef.current = requestAnimationFrame(loop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burst, trailParticle]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      if (phaseRef.current === "idle") startGame();
      else if (phaseRef.current === "playing") jump();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startGame, jump]);

  /* native touch — must be passive:false so preventDefault() actually works */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      if (phaseRef.current === "idle") startGame();
      else if (phaseRef.current === "playing") jump();
    };
    canvas.addEventListener("touchstart", onTouch, { passive: false });
    return () => canvas.removeEventListener("touchstart", onTouch);
  }, [startGame, jump]);

  /* start loop on phase change */
  useEffect(() => {
    if (phase === "playing") {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* initial draw */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    draw(ctx, GROUND - PH, true, [], [], 0, 0, BASE_SPD, "idle", 0);
  }, []);

  const handleTap = () => {
    if (phaseRef.current === "idle") startGame();
    else if (phaseRef.current === "playing") jump();
  };

  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault(); // kill 300ms delay + stop page scroll
    if (phaseRef.current === "idle") startGame();
    else if (phaseRef.current === "playing") jump();
  };

  const handleRestart = () => {
    cancelAnimationFrame(rafRef.current);
    startGame();
  };

  return (
    <section
      id="business-game"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "#02060203" }}
    >
      {/* Ambient bg glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(74,222,128,0.05) 0%, transparent 70%)" }} />

      {/* Top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.25), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.1), transparent)" }} />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#4ade80]/40" />
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#4ade80]">
              <Zap size={11} /> Arcade
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#4ade80]/40" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            The{" "}
            <span
              className="bg-gradient-to-r from-[#4ade80] via-[#22c55e] to-[#86efac] bg-clip-text text-transparent"
              style={{ filter: "drop-shadow(0 0 30px rgba(74,222,128,0.4))" }}
            >
              BizzBuild
            </span>{" "}
            Runner
          </h2>
          <p className="mt-4 text-white/35 text-sm tracking-wide">
            Dodge every business obstacle that blocks your path to growth.
          </p>
        </motion.div>

        {/* Game frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          {/* Outer glow frame */}
          <div
            className="relative rounded-2xl p-[1px]"
            style={{
              background: "linear-gradient(135deg, rgba(74,222,128,0.35) 0%, rgba(74,222,128,0.05) 40%, rgba(74,222,128,0.05) 60%, rgba(248,113,113,0.1) 100%)",
              boxShadow: "0 0 80px rgba(74,222,128,0.1), 0 24px 80px rgba(0,0,0,0.7)",
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#4ade80]/50 rounded-tl-sm pointer-events-none z-20" />
            <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#4ade80]/50 rounded-tr-sm pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#4ade80]/20 rounded-bl-sm pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#4ade80]/20 rounded-br-sm pointer-events-none z-20" />

            <div className="relative w-full rounded-[14px] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                onClick={handleTap}
                className="w-full h-auto block cursor-pointer select-none"
                style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
              />

              {/* DEAD overlay */}
              <AnimatePresence>
                {phase === "dead" && (
                  <motion.div
                    key="dead"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(3,8,4,0.93) 0%, rgba(15,3,3,0.93) 100%)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Red top line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: "linear-gradient(90deg, transparent, #ef4444, transparent)" }} />

                    <div className="flex flex-col md:flex-row items-center gap-8 px-8 w-full max-w-2xl">

                      {/* Left: score */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center shrink-0"
                      >
                        {/* X mark */}
                        <div className="relative w-16 h-16 mb-3">
                          <svg viewBox="0 0 64 64" className="w-full h-full">
                            <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(239,68,68,0.25)" strokeWidth="1.5" />
                            <line x1="20" y1="20" x2="44" y2="44" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"
                              style={{ filter: "drop-shadow(0 0 4px #ef4444)" }} />
                            <line x1="44" y1="20" x2="20" y2="44" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"
                              style={{ filter: "drop-shadow(0 0 4px #ef4444)" }} />
                          </svg>
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-1">Score</p>
                        <p className="text-5xl font-black text-white leading-none"
                          style={{ textShadow: "0 0 20px rgba(74,222,128,0.3)" }}>
                          {score}
                          <span className="text-xl font-light text-white/35 ml-1">m</span>
                        </p>
                        {score >= hiScore && score > 0 && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[9px] font-black uppercase tracking-widest text-[#4ade80] mt-2"
                          >
                            NEW BEST
                          </motion.p>
                        )}
                        {hiScore > 0 && score < hiScore && (
                          <p className="text-[9px] text-white/25 mt-1 font-mono">BEST {hiScore}m</p>
                        )}
                      </motion.div>

                      {/* Divider */}
                      <div className="hidden md:block w-px self-stretch"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)" }} />

                      {/* Right: pitch + CTAs */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-4 flex-1"
                      >
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ef4444]/70 mb-2">
                            Obstacle Hit
                          </p>
                          <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                            You need us to win<br />
                            <span
                              className="bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent"
                              style={{ filter: "drop-shadow(0 0 12px rgba(74,222,128,0.4))" }}
                            >
                              this journey.
                            </span>
                          </h3>
                          <p className="text-white/35 text-xs mt-2 leading-relaxed">
                            BizzBuild clears every obstacle — brand, systems, sales & growth.
                          </p>
                        </div>

                        <div className="h-px w-full"
                          style={{ background: "linear-gradient(90deg, rgba(74,222,128,0.3), transparent)" }} />

                        <div className="flex gap-3">
                          <a
                            href="#contact"
                            className="flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
                            style={{
                              background: "linear-gradient(135deg, #4ade80, #16a34a)",
                              color: "#020705",
                              boxShadow: "0 0 32px rgba(74,222,128,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                            }}
                          >
                            Contact Now <ArrowRight size={13} />
                          </a>
                          <button
                            onClick={handleRestart}
                            className="px-4 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:border-white/30"
                            style={{
                              border: "1px solid rgba(255,255,255,0.12)",
                              color: "rgba(255,255,255,0.45)",
                            }}
                          >
                            <RotateCcw size={13} />
                          </button>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom red line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile tap button — standalone, outside canvas, full width */}
          {phase !== "dead" && (
            <button
              onClick={handleTap}
              className="md:hidden w-full mt-3 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 active:scale-95 transition-transform"
              style={{
                background: "linear-gradient(135deg, rgba(74,222,128,0.12), rgba(34,197,94,0.06))",
                border: "1px solid rgba(74,222,128,0.35)",
                color: "#4ade80",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {phase === "idle" ? "Tap Here to Start" : "Tap Here to Jump"}
            </button>
          )}

          {/* Desktop controls hint */}
          <div className="hidden md:flex items-center justify-between mt-5 px-1">
            <div className="flex items-center gap-5 text-[10px] text-white/20 font-mono uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded text-[9px]"
                  style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", color: "rgba(74,222,128,0.5)" }}>
                  SPACE
                </kbd>
                Jump
              </span>
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded text-[9px]"
                  style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", color: "rgba(74,222,128,0.5)" }}>
                  SPACE ×2
                </kbd>
                Double Jump
              </span>
            </div>
            <p className="text-[9px] text-white/15 font-mono uppercase tracking-widest">
              Speed increases over time
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
