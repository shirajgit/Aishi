import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* =======================
   Global Styles (injected)
======================= */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --bg: #02050f;
    --surface: #080e1f;
    --surface2: #0c1428;
    --border: rgba(255,255,255,0.07);
    --border-glow: rgba(100,220,255,0.15);
    --cyan: #38d9f5;
    --cyan-dim: rgba(56,217,245,0.12);
    --indigo: #7b8cde;
    --text: #f0f4ff;
    --text-dim: rgba(200,210,240,0.55);
    --text-muted: rgba(160,170,200,0.38);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: 'Syne', sans-serif;
    letter-spacing: -0.03em;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(56,217,245,0.3); border-radius: 2px; }

  /* Cursor glow */
  .cursor-glow {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,217,245,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  }

  /* Noise texture overlay */
  .noise::before {
    content: '';
    position: fixed;
    inset: 0;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 160px 160px;
    pointer-events: none;
    z-index: 9998;
  }

  /* Fade-in animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-border {
    0%, 100% { border-color: rgba(56,217,245,0.12); }
    50% { border-color: rgba(56,217,245,0.3); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes scan {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(600%); opacity: 0; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .anim-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fade-up-d1 { animation: fadeUp 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fade-up-d2 { animation: fadeUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fade-up-d3 { animation: fadeUp 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fade-up-d4 { animation: fadeUp 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fade-up-d5 { animation: fadeUp 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) both; }

  .glow-text {
    background: linear-gradient(135deg, #38d9f5 0%, #a5b4fc 50%, #38d9f5 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .card-glass {
    background: rgba(8,14,31,0.7);
    border: 1px solid var(--border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .card-glass:hover {
    border-color: var(--border-glow);
    transform: translateY(-4px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(56,217,245,0.06);
  }

  .btn-primary {
    background: linear-gradient(135deg, #38d9f5, #7b8cde);
    color: #000;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 14px 28px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 32px rgba(56,217,245,0.22);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #fff2, transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(56,217,245,0.35); }
  .btn-primary:hover::before { opacity: 1; }

  .btn-ghost {
    background: rgba(255,255,255,0.04);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.04em;
    padding: 13px 26px;
    border-radius: 100px;
    border: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); transform: translateY(-1px); }

  .tag {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--cyan);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .tag::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 1px;
    background: var(--cyan);
  }

  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 24s linear infinite;
  }
  .marquee-track:hover { animation-play-state: paused; }

  .scan-line {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(56,217,245,0.4), transparent);
    animation: scan 6s ease-in-out infinite;
  }

  .number-accent {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: rgba(56,217,245,0.5);
  }

  .nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dim);
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 100px;
    transition: color 0.2s, background 0.2s;
    position: relative;
  }
  .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
  }

  /* Grid bg pattern */
  .grid-bg {
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  /* Dot pattern */
  .dot-bg {
    background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 28px 28px;
  }
`;

/* =======================
   Types
======================= */
type Service = { title: string; desc: string; tag: string; icon: string; };
type StatProps = { label: string; value: string; };

/* =======================
   Data
======================= */
const services: Service[] = [
  {
    title: "Custom Web Apps",
    desc: "Dashboards, portals, ERP & CRM systems built to eliminate manual work and scale with your business.",
    tag: "Web / SaaS",
    icon: "◈",
  },
  {
    title: "AI Features & Automation",
    desc: "Chat assistants, smart search, intelligent workflows, and data insights that save hours every week.",
    tag: "AI",
    icon: "◎",
  },
  {
    title: "School Management Systems",
    desc: "Attendance, fees, staff management, student portals, admin panel, scheduling & analytics.",
    tag: "Education",
    icon: "◇",
  },
  {
    title: "IoT & Hardware Prototyping",
    desc: "Home automation, sensors, embedded systems, and smart device controls with live dashboards.",
    tag: "IoT",
    icon: "⬡",
  },
];

const industries = [
  "Businesses & Startups",
  "Schools & Colleges",
  "Clinics & Hospitals",
  "Restaurants & Retail",
  "Home Automation",
  "Logistics & Ops",
];

const clients = [
  {
    name: "Akeel Lights",
    type: "Business Website",
    year: "2024",
    desc: "Lighting & decoration business website with modern UI and inquiry-focused design.",
    link: "https://akeel-lights.vercel.app",
    stack: ["Next.js", "Tailwind", "UI/UX"],
    color: "#38d9f5",
  },
  {
    name: "Clickonadzz",
    type: "Marketing Website",
    year: "2024",
    desc: "Digital marketing agency website with clean design and strong service showcase.",
    link: "https://clickonadzz.com",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    color: "#a5b4fc",
  },
  {
    name: "Nehra Cars",
    type: "Car Rental Website",
    year: "2024",
    desc: "Self-drive car rental website with clean layout and simple enquiry flow.",
    link: "https://nehra-cars.vercel.app",
    stack: ["Next.js", "Tailwind", "Forms"],
    color: "#38d9f5",
  },
  {
    name: "VizionExl",
    type: "IT Services Website",
    year: "2024",
    desc: "IT services company website with modern UI and polished service showcase.",
    link: "https://vizionexl.vercel.app",
    stack: ["Next.js", "Tailwind", "Forms"],
    color: "#a5b4fc",
  },
];

const navItems = [
  { id: "services", label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "clients", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

const marqueeItems = [
  "Web Apps", "AI Automation", "IoT Systems", "UI/UX Design",
  "Node.js", "React", "MongoDB", "Next.js", "TypeScript",
  "Web Apps", "AI Automation", "IoT Systems", "UI/UX Design",
  "Node.js", "React", "MongoDB", "Next.js", "TypeScript",
];

/* =======================
   Three.js Scene
======================= */
function Orb({ position, color, emissive, scale }: {
  position: [number, number, number];
  color: string; emissive: string; scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.06;
    ref.current.rotation.y = state.clock.elapsedTime * 0.11;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color} emissive={emissive} emissiveIntensity={0.5}
          distort={0.28} speed={1.8} roughness={0.1} metalness={0.6}
          transparent opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 160;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.06;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.038} color="#38d9f5" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * 0.07;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[3.5, 0.012, 2, 120]} />
      <meshBasicMaterial color="#38d9f5" transparent opacity={0.18} />
    </mesh>
  );
}

function CameraMotion() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.15) * 0.4;
    state.camera.position.y = Math.cos(t * 0.15) * 0.25;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function ThreeBackground() {
  return (
    <div style={{ pointerEvents: "none", position: "absolute", inset: 0, zIndex: 0, opacity: 0.88, mixBlendMode: "screen" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, #02050f)" }} />
      <Canvas camera={{ position: [0, 0, 8], fov: 44 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={2.8} color="#38d9f5" />
          <pointLight position={[-5, -3, 3]} intensity={2.2} color="#7b8cde" />
          <fog attach="fog" args={["#02050f", 7, 20]} />
          <Particles />
          <Ring />
          <Orb position={[-4.8, 2.4, -2]} color="#22d3ee" emissive="#0f766e" scale={1.5} />
          <Orb position={[4.8, -2.2, -2]} color="#6366f1" emissive="#312e81" scale={2.1} />
          <Orb position={[0.5, 3.5, -5]} color="#60a5fa" emissive="#1d4ed8" scale={0.9} />
          <CameraMotion />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* =======================
   App
======================= */
const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    // inject styles
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);

    const onScroll = () => setScrolled(window.scrollY > 20);
    const onMouse = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <main className="noise" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflow: "hidden", position: "relative" }}>
      {/* Cursor glow */}
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* NAV */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "16px 20px" }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 20px 10px 16px", borderRadius: 100,
          border: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)"}`,
          background: scrolled ? "rgba(2,5,15,0.88)" : "rgba(2,5,15,0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: scrolled ? "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,217,245,0.04)" : "none",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {/* Logo */}
          <a href="#home" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 14,
              border: "1px solid rgba(56,217,245,0.2)",
              background: "rgba(56,217,245,0.08)",
              display: "grid", placeItems: "center",
              boxShadow: "0 0 20px rgba(56,217,245,0.1)",
            }}>
              <img src="/Aishi.png" alt="Aishi" style={{ borderRadius: 10, width: 28, height: 28, objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "0.08em", color: "var(--text)" }}>AISHI</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>Technologies</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden-mobile">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="nav-link">{item.label}</a>
            ))}
          </nav>

          <a href="#contact" className="btn-primary hidden-mobile" style={{ fontSize: 12 }}>
            Free Consultation <span style={{ opacity: 0.7 }}>→</span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(p => !p)}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 12, width: 42, height: 42, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}
            className="show-mobile"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: 20, height: 1.5, background: "var(--text)", borderRadius: 2,
                transition: "transform 0.3s, opacity 0.3s",
                transform: open ? (i === 0 ? "translateY(6.5px) rotate(45deg)" : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none") : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            maxWidth: 1280, margin: "10px auto 0",
            borderRadius: 24, border: "1px solid var(--border)",
            background: "rgba(2,5,15,0.96)", padding: 16,
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          }}>
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 14, textDecoration: "none", color: "var(--text-dim)", fontSize: 14, transition: "background 0.2s", marginBottom: 4 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span>{item.label}</span>
                <span style={{ opacity: 0.4, fontSize: 12 }}>→</span>
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: 12, width: "100%", justifyContent: "center" }}>
              Get Free Consultation
            </a>
          </div>
        )}
      </header>

      {/* ══════ HERO ══════ */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <ThreeBackground />

        {/* Grid bg */}
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />

        {/* Radial glows */}
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,217,245,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,140,222,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "140px 24px 100px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">

            {/* Left */}
            <div>
              <div className="anim-fade-up" style={{ marginBottom: 24 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(56,217,245,0.06)", border: "1px solid rgba(56,217,245,0.15)",
                  borderRadius: 100, padding: "8px 16px",
                  fontSize: 11, fontFamily: "Syne, sans-serif", fontWeight: 700,
                  letterSpacing: "0.12em", color: "var(--cyan)", textTransform: "uppercase",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)", display: "inline-block", animation: "pulse-border 2s ease infinite" }} />
                  Available for New Projects
                </span>
              </div>

              <h1 className="section-title anim-fade-up-d1" style={{ fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1.03, marginBottom: 24 }}>
                We build{" "}
                <span className="glow-text">scalable web apps,</span>
                {" "}AI automation & IoT systems.
              </h1>

              <p className="anim-fade-up-d2" style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-dim)", maxWidth: 520, marginBottom: 40 }}>
                Aishi Technologies helps businesses and institutes move faster with custom web apps, AI-powered automation, and IoT systems — built clean, secure, and ready for real-world use.
              </p>

              <div className="anim-fade-up-d3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <a href="#contact" className="btn-primary">Start a Project →</a>
                <a href="#clients" className="btn-ghost">See Our Work</a>
              </div>

              <div className="anim-fade-up-d4" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 460 }}>
                <StatCard label="Delivery" value="7–21 days" />
                <StatCard label="Projects" value="10+" />
                <StatCard label="Response" value="< 24 hrs" />
              </div>

              <p className="anim-fade-up-d5" style={{ marginTop: 20, fontSize: 12, color: "var(--text-muted)" }}>
                ⚡ Free initial consultation · Based in Karnataka, India
              </p>
            </div>

            {/* Right - Feature card */}
            <div className="anim-fade-up-d2 hero-card-hide">
              <div style={{
                borderRadius: 28, border: "1px solid var(--border)",
                background: "rgba(8,14,31,0.8)", padding: 28,
                backdropFilter: "blur(24px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(56,217,245,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                {/* Scan line effect */}
                <div className="scan-line" />

                {/* Top header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>AISHI Solutions</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Popular client requests</div>
                  </div>
                  <div style={{ background: "rgba(56,217,245,0.1)", border: "1px solid rgba(56,217,245,0.2)", borderRadius: 100, padding: "4px 12px", fontSize: 11, color: "var(--cyan)", fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>
                    CUSTOM
                  </div>
                </div>

                {/* Items */}
                {[
                  { title: "Business Management System", desc: "CRM, billing, staff roles, reports, dashboards.", icon: "◈" },
                  { title: "School / College Portal", desc: "Attendance, fees, timetable, student profiles, admin.", icon: "◇" },
                  { title: "Home Automation (IoT)", desc: "Smart lights, sensors, dashboards & mobile control.", icon: "⬡" },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: "16px", borderRadius: 16,
                    border: "1px solid var(--border)", marginBottom: 10,
                    background: "rgba(255,255,255,0.02)",
                    transition: "border-color 0.2s, background 0.2s",
                    cursor: "default",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(56,217,245,0.2)"; e.currentTarget.style.background = "rgba(56,217,245,0.04)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{ fontSize: 20, color: "var(--cyan)", opacity: 0.7, lineHeight: 1, marginTop: 2 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Tech stack */}
                <div style={{ marginTop: 16, padding: 16, borderRadius: 16, background: "rgba(2,5,15,0.8)", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "Syne, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Tech Stack</div>
                  <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.7 }}>
                    React · TypeScript · Next.js · Tailwind · Node · MongoDB · IoT
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--cyan), transparent)", animation: "float 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 10, fontFamily: "Syne, sans-serif", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <div style={{ overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0", background: "rgba(8,14,31,0.5)" }}>
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24, paddingRight: 48, whiteSpace: "nowrap", fontSize: 12, fontFamily: "Syne, sans-serif", fontWeight: 600, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase" }}>
              {item}
              <span style={{ color: "var(--cyan)", opacity: 0.5, fontSize: 8 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════ SERVICES ══════ */}
      <section id="services" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="tag" style={{ marginBottom: 16 }}>Services</div>
            <h2 className="section-title" style={{ fontSize: "clamp(32px, 4vw, 52px)", maxWidth: 520 }}>
              Solutions built for{" "}
              <span className="glow-text">real growth</span>
            </h2>
            <p style={{ marginTop: 16, fontSize: 15, color: "var(--text-dim)", maxWidth: 500, lineHeight: 1.75 }}>
              From idea → UI → dev → deployment. Clear plan, clean execution, and post-launch support.
            </p>
          </div>
          <a href="#contact" className="btn-ghost">Ask Pricing →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {services.map((s, i) => (
            <div key={s.title} className="card-glass" style={{ borderRadius: 24, padding: 28, position: "relative", overflow: "hidden" }}>
              {/* Index */}
              <div style={{ position: "absolute", top: 20, right: 20, fontFamily: "Syne, sans-serif", fontSize: 11, fontWeight: 800, color: "rgba(56,217,245,0.25)", letterSpacing: "0.1em" }}>
                0{i + 1}
              </div>

              {/* Icon */}
              <div style={{ fontSize: 28, color: "var(--cyan)", opacity: 0.6, marginBottom: 20, lineHeight: 1 }}>{s.icon}</div>

              <div style={{ display: "inline-block", background: "rgba(56,217,245,0.08)", border: "1px solid rgba(56,217,245,0.15)", borderRadius: 100, padding: "3px 10px", fontSize: 10, fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: "0.1em", color: "var(--cyan)", textTransform: "uppercase", marginBottom: 14 }}>
                {s.tag}
              </div>

              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 12, lineHeight: 1.35 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.75 }}>{s.desc}</p>

              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Clean UI", "Secure", "Scalable"].map(tag => (
                  <span key={tag} style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ color: "var(--cyan)", fontSize: 8 }}>✓</span> {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <div style={{ maxWidth: 1280, margin: "0 auto 0", padding: "0 24px 80px" }}>
        <div style={{
          borderRadius: 28, border: "1px solid var(--border)",
          background: "linear-gradient(135deg, rgba(56,217,245,0.06) 0%, rgba(8,14,31,0.9) 50%, rgba(123,140,222,0.06) 100%)",
          padding: "40px 48px",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.5 }} className="dot-bg" />
          {[
            { value: "10+", label: "Projects Delivered" },
            { value: "5+", label: "Happy Clients" },
            { value: "7–21d", label: "Typical Delivery" },
            { value: "< 24h", label: "Response Time" },
          ].map((s, i) => (
            <div key={i} style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #f0f4ff, rgba(240,244,255,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, letterSpacing: "0.02em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ INDUSTRIES ══════ */}
      <section id="industries" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 100px" }}>
        <div className="tag" style={{ marginBottom: 16 }}>Industries</div>
        <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", marginBottom: 12 }}>Who we help</h2>
        <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 520, lineHeight: 1.75, marginBottom: 36 }}>
          We work with businesses and institutes that want faster operations, better tracking, and modern digital systems.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {industries.map((industry) => (
            <span key={industry} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)",
              borderRadius: 100, padding: "10px 20px", fontSize: 13, color: "var(--text-dim)",
              transition: "border-color 0.2s, color 0.2s, background 0.2s", cursor: "default",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(56,217,245,0.25)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "rgba(56,217,245,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-dim)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <span style={{ color: "var(--cyan)", fontSize: 8 }}>◆</span>
              {industry}
            </span>
          ))}
        </div>
      </section>

      {/* ══════ WORK ══════ */}
      <section id="clients" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="tag" style={{ justifyContent: "center", marginBottom: 16 }}>Recent Work</div>
          <h2 className="section-title" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
            Client <span className="glow-text">Work</span>
          </h2>
          <p style={{ marginTop: 16, fontSize: 15, color: "var(--text-dim)", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.75 }}>
            A few projects that show our focus on clean UI, performance, and business-ready solutions.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {clients.map((c) => (
            <div key={c.name} className="card-glass" style={{ borderRadius: 28, padding: 32, position: "relative", overflow: "hidden" }}>
              {/* Accent top border */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${c.color}40, transparent)` }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 8 }}>
                    <span>{c.type}</span>
                    <span>·</span>
                    <span>{c.year}</span>
                  </div>
                </div>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: `${c.color}14`, border: `1px solid ${c.color}30`,
                    borderRadius: 100, padding: "6px 14px",
                    fontSize: 12, fontFamily: "Syne, sans-serif", fontWeight: 700,
                    color: c.color, textDecoration: "none",
                    transition: "background 0.2s",
                  }}>
                    Live →
                  </a>
                )}
              </div>

              <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.75, marginBottom: 20 }}>{c.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {c.stack.map(t => (
                  <span key={t} style={{ fontSize: 11, border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "4px 10px", color: "var(--text-muted)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section id="process" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{
          borderRadius: 32, border: "1px solid var(--border)",
          background: "var(--surface)", padding: "56px 48px",
          position: "relative", overflow: "hidden",
        }}>
          <div className="dot-bg" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="tag" style={{ marginBottom: 16 }}>How We Work</div>
            <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", marginBottom: 12 }}>
              The Process
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 500, lineHeight: 1.75, marginBottom: 48 }}>
              No confusion. You'll get updates at every step — timeline, milestones, and deliverables.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { n: "01", title: "Discovery", desc: "Understanding your goals, users & budget in detail.", icon: "◎" },
                { n: "02", title: "UI Design", desc: "Wireframe → polished UI → your approval before dev.", icon: "◇" },
                { n: "03", title: "Development", desc: "Secure, tested, performant code on modern stack.", icon: "◈" },
                { n: "04", title: "Launch", desc: "Deploy, monitor, iterate — and support after.", icon: "⬡" },
              ].map((step, i) => (
                <div key={i} style={{
                  padding: 24, borderRadius: 20, border: "1px solid var(--border)",
                  background: "rgba(255,255,255,0.02)", position: "relative",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(56,217,245,0.2)"; e.currentTarget.style.background = "rgba(56,217,245,0.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                >
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: "0.16em", color: "rgba(56,217,245,0.4)", marginBottom: 12, textTransform: "uppercase" }}>Step {step.n}</div>
                  <div style={{ fontSize: 24, color: "var(--cyan)", opacity: 0.5, marginBottom: 14 }}>{step.icon}</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{step.desc}</div>

                  {/* Connector line */}
                  {i < 3 && (
                    <div style={{
                      position: "absolute", right: -8, top: "50%", transform: "translateY(-50%)",
                      width: 16, height: 1, background: "var(--border)", zIndex: 2,
                      display: "none",
                    }} className="connector" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CONTACT CTA ══════ */}
      <section id="contact" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{
          borderRadius: 32,
          background: "linear-gradient(135deg, rgba(56,217,245,0.08) 0%, rgba(8,14,31,0.95) 40%, rgba(123,140,222,0.08) 100%)",
          border: "1px solid var(--border)",
          padding: "72px 56px",
          position: "relative", overflow: "hidden",
          textAlign: "center",
        }}>
          {/* Background effects */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,217,245,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="tag" style={{ justifyContent: "center", marginBottom: 20 }}>Get in Touch</div>
            <h2 className="section-title" style={{ fontSize: "clamp(32px, 4vw, 56px)", marginBottom: 20, maxWidth: 680, margin: "0 auto 20px" }}>
              Tell us what you want —<br />
              <span className="glow-text">we'll send a clear plan & quote.</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-dim)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.75 }}>
              Share your requirement, deadline, and budget range. We'll reply within 24 hours with scope, timeline, and the best approach.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              <a href="mailto:shirajmujawar03@gmail.com" className="btn-primary">
                Send Requirement →
              </a>
              <a href="https://wa.me/918105369922" className="btn-ghost">
                WhatsApp Chat
              </a>
              <a href="#services" className="btn-ghost">
                View Services
              </a>
            </div>

            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              ⚡ Reply time: within 24 hours · 📌 Free initial consultation · Pricing starts from ₹8,999
            </p>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.25 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(56,217,245,0.3), transparent)" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 32px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 0.8fr", gap: 56, marginBottom: 56 }} className="footer-grid">
            {/* Brand */}
            <div>
              <a href="#home" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, border: "1px solid rgba(56,217,245,0.2)", background: "rgba(56,217,245,0.08)", display: "grid", placeItems: "center" }}>
                  <img src="/Aishi.png" alt="Aishi" style={{ borderRadius: 10, width: 30, height: 30, objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 16 }}>AISHI Technologies</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Web · AI · IoT · Automation</div>
                </div>
              </a>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 360 }}>
                We help businesses, startups, schools, and service companies grow with custom web apps, smart automation, and modern digital systems built for real-world use.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                {["Custom Web Apps", "AI Automation", "IoT Solutions", "Modern UI/UX"].map(item => (
                  <span key={item} style={{ fontSize: 11, border: "1px solid var(--border)", borderRadius: 8, padding: "4px 10px", color: "var(--text-muted)" }}>{item}</span>
                ))}
              </div>
            </div>

            {/* Nav */}
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 20 }}>Navigation</div>
              {navItems.map(item => (
                <a key={item.id} href={`#${item.id}`} style={{ display: "block", fontSize: 14, color: "var(--text-muted)", textDecoration: "none", marginBottom: 12, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Connect */}
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: 20 }}>Connect</div>
              <a href="mailto:shirajmujawar03@gmail.com" style={{ display: "block", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 12, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                shirajmujawar03@gmail.com
              </a>
              <a href="https://wa.me/918105369922" style={{ display: "block", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 20, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                WhatsApp →
              </a>
              <div style={{ borderRadius: 16, border: "1px solid var(--border)", background: "rgba(2,5,15,0.6)", padding: 16 }}>
                <div style={{ fontSize: 10, fontFamily: "Syne, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>Reply Time</div>
                <div style={{ fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block", animation: "blink 2s ease infinite" }} />
                  Within 24 hours
                </div>
              </div>
            </div>
          </div>

          <div className="divider" style={{ marginBottom: 24 }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>© {new Date().getFullYear()} Aishi Technologies. All rights reserved.</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              Designed & Developed by{" "}
              <a href="https://aishi-technologies.vercel.app" target="_blank" rel="noreferrer"
                style={{ background: "linear-gradient(135deg, var(--cyan), var(--indigo))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 700, textDecoration: "none" }}>
                Aishi Tech
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-card-hide { display: none !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </main>
  );
};

export default App;

/* =======================
   Sub-components
======================= */
const StatCard: React.FC<StatProps> = ({ label, value }) => (
  <div style={{
    borderRadius: 16, border: "1px solid var(--border)",
    background: "rgba(255,255,255,0.03)", padding: "14px 16px",
    backdropFilter: "blur(12px)",
  }}>
    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14 }}>{value}</div>
  </div>
);