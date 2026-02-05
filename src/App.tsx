import React from "react";

/* =======================
   Types
======================= */
type Service = {
  title: string;
  desc: string;
  tag: string;
};

type Project = {
  title: string;
  desc: string;
  badge: string;
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
    title: "Software Solutions",
    desc: "Web apps, dashboards, portals, ERP/CRM, and custom systems for businesses and institutes.",
    tag: "Web / SaaS",
  },
  {
    title: "AI Integrations",
    desc: "AI features like chat assistants, automation, smart search, and insights.",
    tag: "AI",
  },
  {
    title: "School / College Systems",
    desc: "Attendance, fees, timetable, staff management, student portals, and admin panels.",
    tag: "Education",
  },
  {
    title: "Hardware Designing",
    desc: "Home automation, IoT controls, smart devices, sensors, and embedded prototyping.",
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

const projects: Project[] = [
  {
    title: "Staff Management System",
    desc: "Role-based login, attendance, admin dashboards, reports.",
    badge: "React • API",
  },
  {
    title: "AI Resume Analyzer",
    desc: "Extracts skills + matches with JD and gives score & suggestions.",
    badge: "React • AI",
  },
  {
    title: "Client Websites",
    desc: "Fast landing pages with modern UI and responsive design.",
    badge: "React • Tailwind",
  },
];

/* =======================
   App
======================= */
const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070a12]/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#home" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
               <img src="/Aishi.png" alt="" className="rounded-2xl" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">AISHI</p>
              <p className="text-xs text-white/60">AI with Shiraj</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {["services", "industries", "work", "process", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm text-white/70 hover:text-white"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Get Quote
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 md:py-24 grid gap-10 md:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              🚀 Software + AI + Hardware Designing
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
              Build smart{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                software solutions
              </span>{" "}
              for business, schools & automation.
            </h1>

            <p className="mt-4 max-w-xl text-white/70">
              AISHI delivers modern web apps, AI-powered features, and IoT/home automation
              systems — fast, scalable, and clean.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#services"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-3 text-sm font-semibold hover:opacity-95"
              >
                Explore Services
              </a>
              <a
                href="#work"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
              >
                View Work
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <Stat label="Fast Delivery" value="7–21 days" />
              <Stat label="Modern UI" value="Tailwind" />
              <Stat label="Support" value="Post launch" />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/90">AISHI Solutions</p>
                <p className="mt-1 text-xs text-white/60">What we build for you (examples)</p>
              </div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200">
                Custom
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <MiniItem
                title="Business Management System"
                desc="Users, billing, reports, CRM, dashboards."
              />
              <MiniItem
                title="School / College Portal"
                desc="Attendance, student info, staff & admin panel."
              />
              <MiniItem
                title="Home Automation (IoT)"
                desc="Smart lights, sensors, remote control."
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
      <section id="services" className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold">Services</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              End-to-end solutions: design → development → deployment → support.
            </p>
          </div>

          <a
            href="#contact"
            className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 md:inline-flex"
          >
            Ask Pricing
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:border-white/15"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{s.title}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                  {s.tag}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/70">{s.desc}</p>
              <div className="mt-5 h-px bg-white/10" />
              <p className="mt-4 text-xs text-white/60">✅ Clean UI • ✅ Secure • ✅ Scalable</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 p-6 md:p-8">
          <h3 className="text-xl font-extrabold">Who we help</h3>
          <p className="mt-2 text-sm text-white/70">
            We build solutions for these domains (and more).
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-extrabold">Recent Work</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          A few examples of what AISHI can deliver (customized to your needs).
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/15"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-base font-semibold">{p.title}</p>
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200">
                  {p.badge}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/70">{p.desc}</p>

              <div className="mt-6 flex gap-3">
                <a
                  href="#contact"
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
                >
                  Build similar
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
                >
                  Discuss
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220] p-6 md:p-8">
          <h2 className="text-3xl font-extrabold">Process</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Simple and clear flow so you always know what’s happening.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Step n="01" title="Requirement" desc="Understanding goals & budget." />
            <Step n="02" title="UI Design" desc="Clean, responsive UI." />
            <Step n="03" title="Development" desc="Scalable & secure code." />
            <Step n="04" title="Deploy" desc="Launch & post-support." />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/15 via-white/5 to-indigo-500/15 p-6 md:p-10">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Let’s build your project with AISHI
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Send your requirement: what you want, deadline, and budget range — we’ll respond
            with a plan.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:shirajmujawar03@gmail.com"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/918105369922"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
            >
              WhatsApp
            </a>
            <a
              href="#services"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
            >
              See Services
            </a>
          </div>

          <p className="mt-4 text-xs text-white/60">
            *Replace email/WhatsApp links with your real details.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-white/60">
        © {new Date().getFullYear()} AISHI — AI with Shiraj
      </footer>
    </main>
  );
};

export default App;

/* =======================
   Components
======================= */
const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
    <p className="text-xs text-white/60">{label}</p>
    <p className="mt-1 font-semibold">{value}</p>
  </div>
);

const MiniItem: React.FC<MiniItemProps> = ({ title, desc }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="font-semibold">{title}</p>
    <p className="mt-1 text-sm text-white/70">{desc}</p>
  </div>
);

const Step: React.FC<StepProps> = ({ n, title, desc }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
    <p className="text-xs font-bold text-cyan-200">{n}</p>
    <p className="mt-2 font-semibold">{title}</p>
    <p className="mt-2 text-sm text-white/70">{desc}</p>
  </div>
);
