"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, SkipForward } from "lucide-react";

type Stage = "gate" | "playing" | "done";

export default function IntroVideo() {
  const [stage, setStage] = useState<Stage>("gate");
  const [muted, setMuted] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [exiting, setExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Once video starts, allow skip after 2s
  useEffect(() => {
    if (stage !== "playing") return;
    const t = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(t);
  }, [stage]);

  // Auto-dismiss when video ends
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onEnd = () => handleDismiss();
    vid.addEventListener("ended", onEnd);
    return () => vid.removeEventListener("ended", onEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = async () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    try {
      await vid.play();
    } catch {
      // fallback – shouldn't happen after user gesture
      vid.muted = true;
      setMuted(true);
      await vid.play().catch(() => {});
    }
    setStage("playing");
  };

  const handleDismiss = () => {
    if (exiting) return;
    setExiting(true);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !muted;
    setMuted(!muted);
  };

  if (stage === "done") return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black">
      {/* Pre-load the video silently so it is ready instantly on click */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        playsInline
        preload="auto"
        muted
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          stage === "playing" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* ── GATE: click to enter ── */}
      <AnimatePresence>
        {stage === "gate" && (
          <motion.div
            key="gate"
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ background: "rgba(3, 8, 4, 0.94)" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Logo */}
            <motion.img
              src="/bizzbuildlogo.png"
              alt="BizzBuild"
              className="h-16 md:h-24 w-auto mb-10 invert brightness-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 0 30px rgba(74,222,128,0.25))" }}
            />

            {/* Enter button */}
            <div className="relative flex items-center justify-center">
              {/* Pulse ring */}
              <motion.div
                className="absolute w-52 h-16 rounded-full pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0, 0.25] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ border: "1px solid rgba(74,222,128,0.4)" }}
              />

              <motion.button
                onClick={handleEnter}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-3 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm"
                style={{
                  background: "rgba(74,222,128,0.09)",
                  border: "1px solid rgba(74,222,128,0.4)",
                  color: "#4ade80",
                  boxShadow: "0 0 32px rgba(74,222,128,0.18)",
                }}
              >
                <Volume2 size={18} />
                Enter with Sound
              </motion.button>
            </div>

            <motion.p
              className="mt-6 text-white/30 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Sound on for best experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PLAYING: controls ── */}
      <AnimatePresence>
        {stage === "playing" && !exiting && (
          <motion.div
            key="controls"
            className="absolute top-6 right-6 flex items-center gap-3 z-20"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sound toggle */}
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border"
              style={{
                background: "rgba(0,0,0,0.55)",
                borderColor: muted ? "rgba(255,255,255,0.18)" : "rgba(74,222,128,0.45)",
                color: muted ? "rgba(255,255,255,0.45)" : "#4ade80",
                boxShadow: muted ? "none" : "0 0 16px rgba(74,222,128,0.35)",
              }}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Skip — appears after 2s */}
            <AnimatePresence>
              {canSkip && (
                <motion.button
                  key="skip"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleDismiss}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border backdrop-blur-md"
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    borderColor: "rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.8)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const b = e.currentTarget;
                    b.style.borderColor = "rgba(74,222,128,0.5)";
                    b.style.color = "#4ade80";
                    b.style.background = "rgba(74,222,128,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const b = e.currentTarget;
                    b.style.borderColor = "rgba(255,255,255,0.18)";
                    b.style.color = "rgba(255,255,255,0.8)";
                    b.style.background = "rgba(0,0,0,0.55)";
                  }}
                >
                  <SkipForward size={14} />
                  Skip
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EXIT: fade to black then unmount ── */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            key="exit"
            className="absolute inset-0 bg-black z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => setStage("done")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
