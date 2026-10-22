"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  // Attempt autoplay (muted first for browser policy compliance)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    // If unmuting, make sure it's playing
    if (!v.muted && v.paused) v.play().catch(() => {});
    setMuted(v.muted);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-black"
      style={{ height: "100svh" }}
    >
      {/* ── Background Video ── */}
      <video
        ref={videoRef}
        src="/Video/homepage.mp4"
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />

      {/* Subtle dark vignette overlay — keeps edges cinematic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Fade-in the video once it's ready */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black z-20"
          />
        )}
      </AnimatePresence>

      {/* ── Mute / Unmute Button ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.85 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-8 right-6 md:bottom-10 md:right-10 z-30
                   w-12 h-12 md:w-14 md:h-14
                   rounded-full flex items-center justify-center
                   bg-black/40 backdrop-blur-md
                   border border-white/20 hover:border-white/50
                   text-white transition-all duration-300 hover:bg-black/60
                   shadow-[0_0_20px_rgba(0,0,0,0.4)]"
      >
        <AnimatePresence mode="wait">
          {muted ? (
            <motion.svg
              key="muted"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Speaker + X lines = muted icon */}
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </motion.svg>
          ) : (
            <motion.svg
              key="unmuted"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Speaker + sound waves = unmuted icon */}
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Know More Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <a
          href="#clients"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("clients")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex flex-col items-center gap-2 cursor-pointer"
          aria-label="Know More"
        >
          <span
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em]
                       text-white border border-white/30 bg-black/30 backdrop-blur-md
                       hover:bg-white/10 hover:border-white/60 transition-all duration-300
                       shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          >
            Know More
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-white/50 group-hover:text-white transition-colors duration-300" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
