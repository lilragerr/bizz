"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error maath does not have type declarations
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";

/* ─── Particle star field ─── */
function StarField({ isSurprise }: { isSurprise: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const arr = new Float32Array(3000);
    return random.inSphere(arr, { radius: 20 }) as Float32Array;
  });

  useFrame((_, delta) => {
    if (ref.current) {
      const speed = isSurprise ? 12 : 1;
      ref.current.rotation.x -= (delta / 60) * speed;
      ref.current.rotation.y -= (delta / 80) * speed;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isSurprise ? "#d946ef" : "#ffffff"}
        size={isSurprise ? 0.08 : 0.035}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={isSurprise ? 0.95 : 0.6}
      />
    </Points>
  );
}

/* ─── 3D Earth Globe ─── */
function EarthGlobe({ isHovered, isSurprise }: { isHovered: boolean; isSurprise: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Tilt axis like real Earth
      groupRef.current.rotation.x = 0.41; // ~23.5°
      // Speed up on hover, spin super fast on surprise!
      const baseRotationSpeed = isSurprise ? delta * 1.5 : (isHovered ? delta * 0.6 : delta * 0.12);
      groupRef.current.rotation.y += baseRotationSpeed;
      // Subtle vertical float
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    }
    if (cloudRef.current) {
      // Clouds rotate slightly faster than globe
      const cloudSpeed = isSurprise ? delta * 2.0 : delta * 0.18;
      cloudRef.current.rotation.y += cloudSpeed;
    }
    if (atmosphereRef.current) {
      // Pulse atmosphere on hover
      const pulse = isSurprise ? 1 + Math.sin(t * 6) * 0.02 : (isHovered ? 1 + Math.sin(t * 3) * 0.008 : 1);
      atmosphereRef.current.scale.setScalar(pulse);
    }
  });

  // Procedural Earth-like coloring using vertex colors
  const globeGeometry = new THREE.IcosahedronGeometry(1.5, 6);

  // --- Land / ocean procedural pattern via vertex color ---
  const posAttr = globeGeometry.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(posAttr.count * 3);
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    // Normalize to unit sphere
    const len = Math.sqrt(x * x + y * y + z * z);
    const nx = x / len, ny = y / len, nz = z / len;
    // Procedural pseudo-noise for land/ocean
    const lat = Math.asin(ny);
    const lon = Math.atan2(nz, nx);
    const noiseVal =
      Math.sin(lat * 8 + 0.3) * Math.cos(lon * 12 + 0.7) +
      Math.sin(lat * 5 - 0.5) * Math.cos(lon * 7 + 1.2) +
      Math.cos(lat * 14 + lon * 9) * 0.4;
    // Map to grayscale: lighter = land, darker = ocean
    const landness = noiseVal > 0.2 ? 0.85 : 0.18;
    colors[i * 3] = landness;
    colors[i * 3 + 1] = landness;
    colors[i * 3 + 2] = landness;
  }
  globeGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return (
    <group ref={groupRef}>
      {/* Main globe with vertex colors */}
      <mesh ref={globeRef} geometry={globeGeometry}>
        <meshStandardMaterial
          vertexColors
          roughness={0.75}
          metalness={0.1}
          flatShading={false}
          emissive={isSurprise ? new THREE.Color("#00ffff") : new THREE.Color("#000000")}
          emissiveIntensity={isSurprise ? 0.9 : 0}
        />
      </mesh>

      {/* Wireframe grid overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.505, 4]} />
        <meshBasicMaterial
          color={isSurprise ? "#d946ef" : "#ffffff"}
          wireframe
          transparent
          opacity={isSurprise ? 0.35 : (isHovered ? 0.12 : 0.06)}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudRef}>
        <icosahedronGeometry args={[1.56, 5]} />
        <meshStandardMaterial
          color={isSurprise ? "#00ffff" : "#ffffff"}
          transparent
          opacity={isSurprise ? 0.15 : 0.07}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow shell */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial
          color={isSurprise ? "#00ffff" : "#aaaaaa"}
          transparent
          opacity={isSurprise ? 0.2 : (isHovered ? 0.08 : 0.04)}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner atmosphere haze */}
      <mesh>
        <sphereGeometry args={[1.58, 32, 32]} />
        <meshBasicMaterial
          color={isSurprise ? "#d946ef" : "#666666"}
          transparent
          opacity={isSurprise ? 0.15 : 0.04}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.2, 0.004, 6, 120]} />
        <meshBasicMaterial
          color={isSurprise ? "#f43f5e" : "#ffffff"}
          transparent
          opacity={isSurprise ? 0.55 : (isHovered ? 0.35 : 0.12)}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
        <torusGeometry args={[2.5, 0.003, 6, 120]} />
        <meshBasicMaterial
          color={isSurprise ? "#00ffff" : "#ffffff"}
          transparent
          opacity={isSurprise ? 0.4 : (isHovered ? 0.2 : 0.06)}
        />
      </mesh>
    </group>
  );
}

/* ─── Scene lights ─── */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} />
      {/* Key light — strong side light for dramatic globe shadow */}
      <directionalLight position={[8, 4, 6]} intensity={2.0} color="#ffffff" />
      {/* Fill — subtle warm edge from opposite side */}
      <pointLight position={[-6, -2, -4]} intensity={0.4} color="#888888" />
      {/* Rim light from top */}
      <pointLight position={[0, 8, -2]} intensity={0.3} color="#cccccc" />
    </>
  );
}

/* ─── Ticker ─── */
const TICKERS = [
  "Business Strategy",
  "Systems Design",
  "Brand Architecture",
  "Growth Execution",
  "Operational Excellence",
  "HR & Culture",
  "Strategic Clarity",
];

function Ticker() {
  const items = [...TICKERS, ...TICKERS, ...TICKERS];
  return (
    <div className="overflow-hidden flex whitespace-nowrap py-4">
      <div className="flex gap-10 shrink-0 animate-[marquee_30s_linear_infinite]">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-white/40">
            <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
            {t}
          </span>
        ))}
      </div>
      <div aria-hidden className="flex gap-10 shrink-0 animate-[marquee_30s_linear_infinite]">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-white/40">
            <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Hero ─── */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [globeHovered, setGlobeHovered] = useState(false);
  const [isSurpriseActive, setIsSurpriseActive] = useState(false);

  const handleSurpriseToggle = () => {
    const nextState = !isSurpriseActive;
    setIsSurpriseActive(nextState);
    if (nextState) {
      document.documentElement.classList.add("surprise-mode");
    } else {
      document.documentElement.classList.remove("surprise-mode");
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#000000] overflow-hidden flex flex-col"
    >
      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Full-screen 3D Canvas ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
          <Lights />
          <StarField isSurprise={isSurpriseActive} />
          {/* Globe rendered but pointer events via HTML overlay */}
          <EarthGlobe isHovered={globeHovered} isSurprise={isSurpriseActive} />
        </Canvas>
      </div>

      {/* Globe hover area (right half on desktop) — captures pointer events for 3D interaction */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full z-[3] hidden lg:block cursor-none"
        onMouseEnter={() => setGlobeHovered(true)}
        onMouseLeave={() => setGlobeHovered(false)}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

            {/* ── LEFT: Text ── */}
            <div className="flex flex-col justify-center gap-7 py-32 lg:py-0">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/50 text-xs uppercase tracking-widest font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                Business Consulting &amp; Growth
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-5xl sm:text-6xl xl:text-7xl font-black text-white leading-[1.0] tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Building<br />
                Businesses<br />
                <span className="italic text-white/50">with clarity.</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/45 text-lg leading-relaxed max-w-md font-light"
              >
                Where strategic wisdom meets modern operational design. We build clean systems that empower founders to scale with absolute clarity.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
              >
                <a
                  href="#services"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-colors duration-300"
                >
                  Explore Services
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                >
                  Let&apos;s Connect
                </a>
                <button
                  onClick={handleSurpriseToggle}
                  className={`group inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-500 hover-trigger ${isSurpriseActive
                      ? "surprise-button-animate"
                      : "border border-white/20 text-white hover:border-white/50 hover:bg-white/5"
                    }`}
                >
                  {isSurpriseActive ? "✨ Cyber Active ✨" : "Surprise Me"}
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-6 pt-2"
              >
                {[
                  { val: "50+", label: "Businesses" },
                  { val: "10+", label: "Years" },
                  { val: "98%", label: "Satisfaction" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span
                      className="text-2xl font-black text-white leading-none"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {s.val}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 mt-1">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Globe hint label (actual globe rendered in Canvas) ── */}
            <div className="hidden lg:flex items-center justify-center relative">
              {/* Hover tip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: globeHovered ? 0 : 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/25 font-medium pointer-events-none"
              >
                hover to interact
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ── Ticker strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 border-t border-white/[0.06] bg-white/[0.02]"
      >
        <Ticker />
      </motion.div>
    </section>
  );
}
