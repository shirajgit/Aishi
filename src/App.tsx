 
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
 
/* =======================
   Types
======================= */
type Service = {
  title: string;
  desc: string;
  tag: string;
};

type StatProps = {
  label: string;
  value: string;
};

type MiniItemProps = {
  title: string;
  desc: string;
};

type StepProps = {
  n: string;
  title: string;
  desc: string;
};

/* =======================
   Data
======================= */
const services: Service[] = [
  {
    title: "Custom Web Apps That Automate Work",
    desc: "Dashboards, portals, ERP/CRM systems built to reduce manual work and improve efficiency.",
    tag: "Web / SaaS",
  },
  {
    title: "AI Features & Automation",
    desc: "Chat assistants, smart search, workflows, and insights that save hours every week.",
    tag: "AI",
  },
  {
    title: "School / College Management Systems",
    desc: "Attendance, fees, staff management, student portals, admin panel & reporting.",
    tag: "Education",
  },
  {
    title: "IoT & Hardware Prototyping",
    desc: "Home automation, sensors, embedded prototyping, and smart device controls.",
    tag: "IoT",
  },
];

const industries: string[] = [
  "Businesses & Startups",
  "Schools & Colleges",
  "Clinics & Hospitals",
  "Restaurants & Retail",
  "Home Automation Projects",
];

const clients = [
  {
    name: "Akeel Lights",
    type: "Business Website",
    desc: "Lighting & decoration business website with modern UI and inquiry-focused design.",
    link: "https://akeel-lights.vercel.app",
    stack: ["Next.js", "Tailwind", "UI/UX"],
    highlights: ["Modern homepage", "Service sections", "Lead-friendly CTA"],
  },
  {
    name: "Clickonadzz",
    type: "Marketing Website",
    desc: "Digital marketing agency website with clean design and strong service showcase.",
    link: "https://clickonadzz.com",
    stack: ["Next.js", "Tailwind", "Framer Motion", "Forms"],
    highlights: ["Responsive", "Fast UI", "Professional design"],
  },
  {
    name: "Nehra Cars",
    type: "Car Rental Website",
    desc: "Self-drive car rental website with clean layout and simple enquiry flow.",
    link: "https://nehra-cars.vercel.app",
    stack: ["Next.js", "Tailwind", "Forms"],
    highlights: ["Responsive", "Fast UI", "Professional design"],
  },
  {
    name: "VizionExl",
    type: "IT Services Website",
    desc: "IT services company website with modern UI and polished service showcase.",
    link: "https://vizionexl.vercel.app",
    stack: ["Next.js", "Tailwind", "Forms"],
    highlights: ["Responsive", "Fast UI", "Professional design"],
  },
];

const navItems = [
  { id: "services", label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "clients", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];





function Orb({
  position,
  color,
  emissive,
  scale,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.08;
    ref.current.rotation.y = state.clock.elapsedTime * 0.14;
  });

  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.6}
          distort={0.35}
          speed={2}
          roughness={0.15}
          metalness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);

  const count = 120;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.03;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#67e8f9"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 3, 4]} intensity={2.2} color="#22d3ee" />
      <pointLight position={[-4, -2, 2]} intensity={1.8} color="#6366f1" />
      <directionalLight position={[0, 3, 2]} intensity={1.2} color="#ffffff" />
    </>
  );
}

function ThreeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <SceneLights />
          <Particles />
          <Orb
            position={[-3.8, 1.8, -1]}
            color="#22d3ee"
            emissive="#0f766e"
            scale={1.5}
          />
          <Orb
            position={[4.2, -1.6, -1.5]}
            color="#6366f1"
            emissive="#312e81"
            scale={2}
          />
          <Orb
            position={[0.4, 2.8, -3]}
            color="#60a5fa"
            emissive="#1d4ed8"
            scale={0.9}
          />
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <main className="relative min-h-screen scroll-smooth overflow-hidden bg-[#050814] text-white">
  <ThreeBackground />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 md:px-6 ${
            scrolled
              ? "border-white/10 bg-[#081120]/85 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              : "border-white/10 bg-white/5 backdrop-blur-xl"
          }`}
        >
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10">
              <img src="/Aishi.png" alt="Aishi logo" className="rounded-xl" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide">AISHI</p>
              <p className="text-xs text-white/60">AI with Shiraj</p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(34,211,238,0.2)] transition hover:-translate-y-0.5"
            >
              Get Free Consultation
            </a>
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {open && (
          <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-white/10 bg-[#081120]/95 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <span>{item.label}</span>
                  <span>→</span>
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-black"
            >
              Get Free Consultation
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-8 md:pt-2">
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur-xl">
              🚀 Web Apps • AI Automation • IoT Solutions
            </p>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
              We build{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                scalable web apps, AI automation & IoT
              </span>{" "}
              that grow your business.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              Aishi Technologies helps businesses and institutes move faster with
              custom web apps, AI-powered automation, and IoT systems — built
              clean, secure, scalable, and ready for real-world use.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(34,211,238,0.22)] transition hover:-translate-y-0.5"
              >
                Get Started
              </a>
              <a
                href="#clients"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-xl transition hover:bg-white/10"
              >
                See Recent Work
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <Stat label="Delivery" value="7–21 days" />
              <Stat label="UI + UX" value="Modern & clean" />
              <Stat label="Support" value="After launch" />
            </div>

            <p className="mt-4 text-xs text-white/60">
              ⚡ Reply time: within 24 hours • 📌 Free initial consultation
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/90">
                  AISHI Solutions
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Popular solutions clients ask for
                </p>
              </div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200">
                Custom
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <MiniItem
                title="Business Management System"
                desc="CRM, billing, staff roles, reports, dashboards — everything in one place."
              />
              <MiniItem
                title="School / College Portal"
                desc="Attendance, fees, timetable, student profiles, staff panel & admin controls."
              />
              <MiniItem
                title="Home Automation (IoT)"
                desc="Smart lights, sensors, remote control, dashboards & mobile-friendly control."
              />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b1220] p-4">
              <p className="text-xs text-white/60">Tech stack (typical)</p>
              <p className="mt-2 text-sm text-white/85">
                React • TypeScript • Tailwind • Node • MongoDB • IoT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
  <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] md:text-5xl">
              Solutions built for growth
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
              From idea → UI → development → deployment. You get a clear plan,
              clean execution, and support after launch.
            </p>
          </div>

          <a
            href="#contact"
            className="hidden rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/10 md:inline-flex"
          >
            Ask Pricing
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/20"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{s.title}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  {s.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/70">{s.desc}</p>
              <div className="mt-5 h-px bg-white/10" />
              <p className="mt-4 text-xs text-white/60">
                ✅ Clean UI • ✅ Secure • ✅ Scalable
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="relative z-10 mx-auto max-w-7xl px-5 pb-12">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-8">
          <h3 className="text-2xl font-extrabold">Who we help</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
            We work with businesses and institutes that want faster operations,
            better tracking, and modern digital systems.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold">Built to deliver</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Clear scope, clean build, and reliable support — so you can ship
                with confidence.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-2 inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/10 md:mt-0"
            >
              Get a quick estimate
            </a>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <Stat label="Projects delivered" value="10+" />
            <Stat label="Happy clients" value="5+" />
            <Stat label="Typical delivery" value="7–21 days" />
            <Stat label="Response time" value="< 24 hrs" />
          </div>

          <p className="mt-4 text-xs text-white/60">
            Pricing: business websites start from ₹8,999 • Custom systems based
            on scope
          </p>
        </div>
      </section>

      {/* PROCESS */}
    <section id="process" className="relative z-10 mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-8">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em]">
            Process
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
            No confusion. You’ll get updates at every step — timeline,
            milestones, and deliverables.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Step n="01" title="Requirement" desc="Understanding goals, users & budget." />
            <Step n="02" title="UI Design" desc="Wireframe → modern UI → approval." />
            <Step n="03" title="Development" desc="Secure code, testing, performance." />
            <Step n="04" title="Deploy" desc="Launch, monitoring & support." />
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="clients" className="relative z-10 mx-auto max-w-7xl px-5 py-20 text-gray-200">
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
            Recent Work
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">
            Client <span className="text-indigo-400">Work</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            A few projects that show our focus on clean UI, performance, and
            business-ready digital solutions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {clients.map((c) => (
            <div
              key={c.name}
              className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0b1220]/90 to-[#050814]/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:border-cyan-400/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-bold">{c.name}</p>
                  <p className="mt-1 text-gray-400">{c.type}</p>
                </div>

                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
                  >
                    Live →
                  </a>
                )}
              </div>

              <p className="mt-4 leading-7 text-gray-300">{c.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {c.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="mt-5 space-y-2 text-gray-400">
                {c.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
   <section id="contact" className="relative z-10 mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/15 via-white/5 to-indigo-500/15 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:p-10">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] md:text-4xl">
            Tell us what you want — we’ll send a clear plan & quote.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Share your requirement, deadline, and budget range. We’ll reply with
            scope, timeline, and the best approach.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:shirajmujawar03@gmail.com"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Send Requirement
            </a>
            <a
              href="https://wa.me/918105369922"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              WhatsApp
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/10"
            >
              View Services
            </a>
          </div>

          <p className="mt-4 text-xs text-white/60">
            ⚡ Reply time: within 24 hours • 📌 Free initial consultation
          </p>
        </div>
      </section>

      {/* FOOTER */}
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-[#050814] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.14),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-white/5 to-indigo-500/10 px-6 py-8 md:px-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
                    Let’s build
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] md:text-3xl">
                    Ready to turn your idea into a modern digital product?
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                    From business websites to AI automation and IoT systems, Aishi Technologies
                    helps you build clean, scalable, and growth-focused digital solutions.
                  </p>
                </div>

                <a
                  href="#contact"
                  className="inline-flex w-fit rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(34,211,238,0.22)] transition duration-300 hover:-translate-y-0.5"
                >
                  Start a Project
                </a>
              </div>
            </div>

            <div className="grid gap-10 px-6 py-10 md:px-8 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
              <div>
                <a href="#home" className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10">
                    <img src="/Aishi.png" alt="Aishi logo" className="rounded-xl" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">AISHI Technologies</p>
                    <p className="text-sm text-white/60">Web • AI • IoT • Automation</p>
                  </div>
                </a>

                <p className="mt-5 max-w-xl leading-7 text-white/70">
                  We help businesses, startups, schools, and service companies grow with
                  custom web apps, premium UI, smart automation, and modern digital systems
                  built for real-world use.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {["Custom Web Apps", "AI Automation", "IoT Solutions", "Modern UI/UX"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-[#0d1728]/80 px-4 py-2 text-sm text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Navigation
                </p>
                <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
                  <a href="#services" className="transition hover:text-white">Services</a>
                  <a href="#industries" className="transition hover:text-white">Industries</a>
                  <a href="#clients" className="transition hover:text-white">Work</a>
                  <a href="#process" className="transition hover:text-white">Process</a>
                  <a href="#contact" className="transition hover:text-white">Contact</a>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Connect
                </p>
                <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
                  <a
                    href="mailto:shirajmujawar03@gmail.com"
                    className="transition hover:text-white"
                  >
                    shirajmujawar03@gmail.com
                  </a>
                  <a
                    href="https://wa.me/918105369922"
                    className="transition hover:text-white"
                  >
                    WhatsApp
                  </a>
                  <a href="#contact" className="transition hover:text-white">
                    Get Free Consultation
                  </a>
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[#0d1728]/80 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                    Reply Time
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 text-sm text-white/60 md:px-8 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Aishi Technologies. All rights reserved.</p>

              <p>
                Designed &amp; Developed by{" "}
                <a
                  href="https://aishi-technologies.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text font-semibold text-transparent"
                >
                  Aishi Tech
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;

/* =======================
   Components
======================= */
const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
    <p className="text-xs text-white/60">{label}</p>
    <p className="mt-1 font-semibold">{value}</p>
  </div>
);

const MiniItem: React.FC<MiniItemProps> = ({ title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
    <p className="font-semibold">{title}</p>
    <p className="mt-1 text-sm leading-7 text-white/70">{desc}</p>
  </div>
);

const Step: React.FC<StepProps> = ({ n, title, desc }) => (
  <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <p className="text-xs font-bold text-cyan-200">{n}</p>
    <p className="mt-2 font-semibold">{title}</p>
    <p className="mt-2 text-sm leading-7 text-white/70">{desc}</p>
  </div>
);