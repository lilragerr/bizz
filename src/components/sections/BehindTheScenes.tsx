"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Video,
  PauseCircle,
  PlayCircle,
  Maximize2,
} from "lucide-react";

export interface WorkItem {
  id: string;
  originalIndex: number;
  title: string;
  category: string;
  url: string;
  aspectClass: string;
  description: string;
  tag: string;
}

const ALL_WORKS: WorkItem[] = [
  {
    id: "bhakti-farms",
    originalIndex: 0,
    title: "Bhakti Farms Eco-Resort",
    category: "Brand Film",
    url: "/Video/BBC%20BTS%20BhaktiFarms.mp4",
    aspectClass: "aspect-[9/16]",
    description: "Atmospheric brand documentary capturing organic eco-resort scale, architecture, and lifestyle design.",
    tag: "Vertical Reel",
  },
  {
    id: "creative-process",
    originalIndex: 1,
    title: "Creative Sprint Process",
    category: "Behind The Scenes",
    url: "/Video/BBC%20BTS%20CreativeProcess.mp4",
    aspectClass: "aspect-[16/9]",
    description: "Deep dive into strategy workshops, storyboard iterations, and high-velocity creative direction.",
    tag: "Widescreen",
  },
  {
    id: "hand-me",
    originalIndex: 2,
    title: "Hand Me Collection",
    category: "Commercial",
    url: "/Video/BBC%20BTS%20HAND%20ME.mp4",
    aspectClass: "aspect-[1/1]",
    description: "Tactile product showcase featuring stylized camera movements, dynamic lighting, and rhythmic cuts.",
    tag: "Square Studio",
  },
  {
    id: "hfm-2",
    originalIndex: 3,
    title: "HFM Executive Strategy",
    category: "Strategy Sprint",
    url: "/Video/BBC%20BTS%20HFM%202.mp4",
    aspectClass: "aspect-[4/5]",
    description: "High-level enterprise consulting footage featuring multi-screen financial analytics and ops modelling.",
    tag: "Portrait Cut",
  },
  {
    id: "macwin",
    originalIndex: 4,
    title: "Macwin Global Campaign",
    category: "Brand Film",
    url: "/Video/BBC%20BTS%20MACWIN.mp4",
    aspectClass: "aspect-[16/9]",
    description: "Ultra-wide cinematic commercial cut with dramatic high-contrast lighting and structural depth.",
    tag: "Cinematic",
  },
  {
    id: "minicubs-2",
    originalIndex: 5,
    title: "MiniCubs Production",
    category: "Commercial",
    url: "/Video/BBC%20BTS%20MINICUBS%202.mp4",
    aspectClass: "aspect-[9/16]",
    description: "Dynamic mobile-first campaign engineered for high audience retention and multi-platform reach.",
    tag: "Vertical Reel",
  },
  {
    id: "mumbai-3",
    originalIndex: 6,
    title: "Mumbai City Production Sprints",
    category: "Behind The Scenes",
    url: "/Video/BBC%20BTS%20MUMBAI%203.mp4",
    aspectClass: "aspect-[16/9]",
    description: "On-location film production across Mumbai's urban landscapes, capturing raw city energy.",
    tag: "Landscape",
  },
  {
    id: "sajori",
    originalIndex: 7,
    title: "Sajori Aesthetic Series",
    category: "Visual Arts",
    url: "/Video/BBC%20BTS%20SAJORI.mp4",
    aspectClass: "aspect-[1/1]",
    description: "Minimalist fashion editorial sequence focusing on texture, shadow, and architectural elegance.",
    tag: "Square Studio",
  },
  {
    id: "sajori-2",
    originalIndex: 8,
    title: "Sajori Part II – Director Cut",
    category: "Cinematic Reel",
    url: "/Video/BBC%20BTS%20BBC%20BTS%20SAJORI%202.mp4",
    aspectClass: "aspect-[4/3]",
    description: "Raw behind-the-scenes moments, camera rig setups, and real-time lighting adjustments.",
    tag: "Classic 4:3",
  },
  {
    id: "sileon",
    originalIndex: 9,
    title: "Sileon Master Cut",
    category: "Cinematic Reel",
    url: "/Video/BBC%20BTS%20SILEON.mp4",
    aspectClass: "aspect-[16/9]",
    description: "High-octane commercial reel showcasing post-production color grading, motion graphics, and sound design.",
    tag: "Widescreen",
  },
  {
    id: "sileon-2",
    originalIndex: 10,
    title: "Sileon S2 Mobile Reel",
    category: "Commercial",
    url: "/Video/BBC%20BTS%20SILEON%202.mp4",
    aspectClass: "aspect-[9/16]",
    description: "Fast-paced vertical edit tailored for social-first audience acquisition and brand impact.",
    tag: "Vertical Reel",
  },
  {
    id: "topboys",
    originalIndex: 11,
    title: "TopBoys Campaign",
    category: "Brand Film",
    url: "/Video/BBC%20BTS%20TOPBOYS.mp4",
    aspectClass: "aspect-[1/1]",
    description: "Edgy urban brand film combining raw street aesthetics with high-end polished studio direction.",
    tag: "Square Cut",
  },
  {
    id: "bbc-bts-core",
    originalIndex: 12,
    title: "BizzBuild Core Anthem",
    category: "Behind The Scenes",
    url: "/Video/BBC%20BTS.mp4",
    aspectClass: "aspect-[16/9]",
    description: "Our flagship agency reel showing team collaboration, studio operations, and high-impact executions.",
    tag: "Flagship Reel",
  },
];

const CATEGORIES = ["All Works", "Brand Film", "Behind The Scenes", "Commercial", "Cinematic Reel"];

export default function BehindTheScenes() {
  const [selectedCategory, setSelectedCategory] = useState("All Works");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [hoveredWorkId, setHoveredWorkId] = useState<string | null>(null);
  const [isMotionPaused, setIsMotionPaused] = useState(false);

  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const filteredWorks =
    selectedCategory === "All Works"
      ? ALL_WORKS
      : ALL_WORKS.filter((item) => item.category === selectedCategory);

  // Split into 3 columns
  const col1 = filteredWorks.filter((_, i) => i % 3 === 0);
  const col2 = filteredWorks.filter((_, i) => i % 3 === 1);
  const col3 = filteredWorks.filter((_, i) => i % 3 === 2);

  const openModal = (index: number) => {
    setActiveModalIndex(index);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const closeModal = () => setActiveModalIndex(null);

  const handleNextWork = useCallback(() => {
    setActiveModalIndex((prev) =>
      prev !== null ? (prev + 1) % filteredWorks.length : 0
    );
  }, [filteredWorks.length]);

  const handlePrevWork = useCallback(() => {
    setActiveModalIndex((prev) =>
      prev !== null ? (prev - 1 + filteredWorks.length) % filteredWorks.length : 0
    );
  }, [filteredWorks.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNextWork();
      if (e.key === "ArrowLeft") handlePrevWork();
      if (e.key === " ") {
        e.preventDefault();
        if (modalVideoRef.current) {
          if (modalVideoRef.current.paused) {
            modalVideoRef.current.play();
            setIsPlaying(true);
          } else {
            modalVideoRef.current.pause();
            setIsPlaying(false);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, handleNextWork, handlePrevWork]);

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      setCurrentTime(modalVideoRef.current.currentTime);
      setDuration(modalVideoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (modalVideoRef.current) {
      modalVideoRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };

  const togglePlay = () => {
    if (!modalVideoRef.current) return;
    if (isPlaying) modalVideoRef.current.pause();
    else modalVideoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const fmt = (t: number) => {
    if (isNaN(t)) return "00:00";
    const m = Math.floor(t / 60), s = Math.floor(t % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const currentModalWork = activeModalIndex !== null ? filteredWorks[activeModalIndex] : null;

  // Column mouse-enter/leave for pausing animation
  const pauseCol = (e: React.MouseEvent<HTMLDivElement>) => {
    const strip = e.currentTarget.querySelector<HTMLDivElement>(".col-strip");
    if (strip) strip.style.animationPlayState = "paused";
  };
  const resumeCol = (e: React.MouseEvent<HTMLDivElement>) => {
    const strip = e.currentTarget.querySelector<HTMLDivElement>(".col-strip");
    if (strip) strip.style.animationPlayState = "running";
  };

  return (
    <section id="our-works" className="relative w-full py-28 bg-[#000000] overflow-hidden">
      {/* Subtle ambient orbs — lightweight radial gradients only, no blur */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <div
          className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/70 text-[11px] uppercase tracking-widest font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Video size={12} className="text-white" />
              <span>Our Works in Motion</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter">
              Featured <span className="text-gradient-animated text-glow">Works & BTS.</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-xl text-base font-light leading-relaxed">
              Continuous gallery of brand films, BTS sprints, and commercial cuts.
              Hover to pause a column — click any clip to play with full controls.
            </p>
          </div>

          {/* Motion control */}
          <button
            onClick={() => setIsMotionPaused(!isMotionPaused)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover-trigger shrink-0"
          >
            {isMotionPaused ? (
              <><PlayCircle size={15} className="text-emerald-400" /><span>Resume</span></>
            ) : (
              <><PauseCircle size={15} className="text-white/60" /><span>Pause Motion</span></>
            )}
          </button>
        </div>

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 hover-trigger ${
                selectedCategory === cat
                  ? "bg-white text-black shadow-[0_0_16px_rgba(255,255,255,0.25)] scale-105"
                  : "bg-white/[0.03] text-white/55 hover:text-white hover:bg-white/10 border border-white/[0.07]"
              }`}
            >
              {cat}{cat === "All Works" && ` (${ALL_WORKS.length})`}
            </button>
          ))}
        </div>

        {/* ── INFINITE VERTICAL MARQUEE GRID ── */}
        <div
          className="relative w-full h-[800px] overflow-hidden rounded-2xl border border-white/[0.08] bg-black"
        >
          {/* Fade masks top/bottom */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 z-20"
            style={{ background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-20"
            style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full p-3 md:p-4">
            {/* Column 1 — scrolls UP */}
            <div
              className="relative overflow-hidden h-full"
              onMouseEnter={pauseCol}
              onMouseLeave={resumeCol}
            >
              <div
                className="col-strip flex flex-col gap-3"
                style={{
                  animation: isMotionPaused ? "none" : "marqueeVerticalUp 45s linear infinite",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                {[...col1, ...col1].map((item, idx) => (
                  <GridCard
                    key={`c1-${item.id}-${idx}`}
                    item={item}
                    hoveredWorkId={hoveredWorkId}
                    setHoveredWorkId={setHoveredWorkId}
                    onCardClick={() =>
                      openModal(filteredWorks.findIndex((w) => w.id === item.id))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Column 2 — scrolls DOWN */}
            <div
              className="hidden md:block relative overflow-hidden h-full"
              onMouseEnter={pauseCol}
              onMouseLeave={resumeCol}
            >
              <div
                className="col-strip flex flex-col gap-3"
                style={{
                  animation: isMotionPaused ? "none" : "marqueeVerticalDown 50s linear infinite",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                {[...col2, ...col2].map((item, idx) => (
                  <GridCard
                    key={`c2-${item.id}-${idx}`}
                    item={item}
                    hoveredWorkId={hoveredWorkId}
                    setHoveredWorkId={setHoveredWorkId}
                    onCardClick={() =>
                      openModal(filteredWorks.findIndex((w) => w.id === item.id))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Column 3 — scrolls UP SLOW */}
            <div
              className="hidden lg:block relative overflow-hidden h-full"
              onMouseEnter={pauseCol}
              onMouseLeave={resumeCol}
            >
              <div
                className="col-strip flex flex-col gap-3"
                style={{
                  animation: isMotionPaused ? "none" : "marqueeVerticalUp 60s linear infinite",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                {[...col3, ...col3].map((item, idx) => (
                  <GridCard
                    key={`c3-${item.id}-${idx}`}
                    item={item}
                    hoveredWorkId={hoveredWorkId}
                    setHoveredWorkId={setHoveredWorkId}
                    onCardClick={() =>
                      openModal(filteredWorks.findIndex((w) => w.id === item.id))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/35 border-t border-white/[0.06] pt-5 gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="animate-pulse text-white/50" />
            <span>Click any clip to open the focus player with audio & full controls</span>
          </div>
          <span>{ALL_WORKS.length} Production Clips · Continuous Loop</span>
        </div>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {activeModalIndex !== null && currentModalWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/96 flex flex-col justify-between p-4 md:p-8"
            style={{ backdropFilter: "blur(24px)" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest">
                  {currentModalWork.category}
                </span>
                <span className="text-white/40 text-xs">
                  {activeModalIndex + 1} / {filteredWorks.length}
                </span>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover-trigger border border-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video area */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={handlePrevWork}
                aria-label="Previous"
                className="absolute left-0 md:left-4 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/70 border border-white/15 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 hover-trigger"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.div
                key={currentModalWork.id}
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="relative max-w-5xl w-full flex items-center justify-center rounded-xl overflow-hidden border border-white/15 bg-neutral-950"
                style={{ maxHeight: "70vh" }}
              >
                <video
                  ref={modalVideoRef}
                  src={currentModalWork.url}
                  autoPlay
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleNextWork}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: "70vh" }}
                />
                <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{currentModalWork.title}</h3>
                  <p className="text-white/60 text-xs md:text-sm mt-1 max-w-lg">{currentModalWork.description}</p>
                </div>
              </motion.div>

              <button
                onClick={handleNextWork}
                aria-label="Next"
                className="absolute right-0 md:right-4 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/70 border border-white/15 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 hover-trigger"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Controls */}
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-3 bg-white/[0.04] p-4 rounded-xl border border-white/10">
              {/* Scrubber */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/40 font-mono w-9 text-right">{fmt(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 rounded-full appearance-none bg-white/20 accent-white cursor-pointer"
                />
                <span className="text-[11px] text-white/40 font-mono w-9">{fmt(duration)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover-trigger">
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button onClick={toggleMute} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover-trigger">
                    {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} />}
                  </button>
                  <span className="text-[10px] uppercase tracking-widest text-white/35 hidden sm:inline">
                    {isMuted ? "Muted" : "Audio On"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                  {currentModalWork.tag}
                </span>
              </div>

              {/* Thumbnail strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-2 no-scrollbar border-t border-white/[0.08]">
                {filteredWorks.map((item, idx) => (
                  <button
                    key={`thumb-${item.id}`}
                    onClick={() => openModal(idx)}
                    className={`relative shrink-0 w-14 h-9 rounded-md overflow-hidden border transition-all duration-200 hover-trigger ${
                      idx === activeModalIndex
                        ? "border-white scale-105 ring-2 ring-white/40"
                        : "border-white/10 opacity-40 hover:opacity-80"
                    }`}
                  >
                    <video
                      src={item.url}
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── GRID CARD ──
// Uses IntersectionObserver so video only plays when the card is visible in the viewport
interface GridCardProps {
  item: WorkItem;
  hoveredWorkId: string | null;
  setHoveredWorkId: (id: string | null) => void;
  onCardClick: () => void;
}

function GridCard({ item, hoveredWorkId, setHoveredWorkId, onCardClick }: GridCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredWorkId === item.id;
  const isOtherHovered = hoveredWorkId !== null && hoveredWorkId !== item.id;

  // Only play the video while it is actually visible in the viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      onClick={onCardClick}
      onMouseEnter={() => setHoveredWorkId(item.id)}
      onMouseLeave={() => setHoveredWorkId(null)}
      className={`relative w-full ${item.aspectClass} rounded-xl overflow-hidden cursor-pointer group border border-white/[0.07] bg-neutral-900`}
      style={{
        transition: "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
        opacity: isOtherHovered ? 0.35 : 1,
        transform: isHovered ? "scale(1.025)" : isOtherHovered ? "scale(0.985)" : "scale(1)",
        boxShadow: isHovered ? "0 0 32px rgba(255,255,255,0.15)" : "none",
        zIndex: isHovered ? 10 : "auto",
        willChange: "transform",
      }}
    >
      {/* Video — no backdrop-filter, no blur on the element itself */}
      <video
        ref={videoRef}
        src={item.url}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{
          transform: isHovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />

      {/* Simple gradient overlay — no backdrop-filter (GPU-friendly) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)" }}
      />

      {/* Top badge row */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
        <span className="px-2 py-0.5 rounded-full bg-black/65 text-[8px] uppercase tracking-widest font-bold text-white border border-white/[0.12]">
          {item.category}
        </span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/65 border border-white/[0.12]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] uppercase text-white/60 font-mono">Live</span>
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-4 z-10 pointer-events-none">
        <h3 className="text-sm md:text-base font-bold text-white line-clamp-1">{item.title}</h3>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[9px] font-mono text-white/35">{item.tag}</span>
          <div className="flex items-center gap-1 text-white/70 group-hover:text-white transition-colors duration-200">
            <span className="text-[9px] uppercase tracking-wider font-semibold">Play</span>
            <Maximize2 size={10} />
          </div>
        </div>
      </div>
    </div>
  );
}
