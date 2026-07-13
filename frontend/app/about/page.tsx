"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: "📄",
    title: "PDF Upload",
    description:
      "Drop in any research paper as a PDF and let SCIJUDGE AI read, parse, and understand it in seconds.",
    color: "cyan"
  },
  {
    icon: "🤖",
    title: "AI Evaluation",
    description:
      "A large language model reads your paper the way a competition judge would, line by line, section by section.",
    color: "purple"
  },
  {
    icon: "📊",
    title: "Research Scoring",
    description:
      "Get objective scores across innovation, methodology, impact, and clarity, visualized on radar and trend charts.",
    color: "cyan"
  },
  {
    icon: "🎭",
    title: "Judge Personas",
    description:
      "Choose how you get judged: an ISEF judge, an MIT professor, a harsh reviewer, or a supportive mentor.",
    color: "yellow"
  },
  {
    icon: "🌐",
    title: "Multi-language",
    description:
      "Submit your paper and receive feedback in English, Arabic, or French, independently of each other.",
    color: "purple"
  },
  {
    icon: "🕘",
    title: "Evaluation History",
    description:
      "Every report is saved locally, searchable, sortable, and ready to revisit or re-download at any time.",
    color: "cyan"
  }
];

const techStack = [
  { name: "Next.js", icon: "▲", role: "React framework" },
  { name: "React", icon: "⚛️", role: "UI library" },
  { name: "TypeScript", icon: "🔷", role: "Type safety" },
  { name: "Tailwind CSS", icon: "🎨", role: "Styling" },
  { name: "FastAPI", icon: "⚡", role: "Backend API" },
  { name: "Python", icon: "🐍", role: "Backend language" },
  { name: "Framer Motion", icon: "🌀", role: "Animation" },
  { name: "OpenAI API", icon: "🧠", role: "AI evaluation engine" }
];

const roadmap = [
  { title: "PDF Upload & Parsing", status: "done" },
  { title: "AI-Powered Evaluation Engine", status: "done" },
  { title: "Multi-Persona Judging", status: "done" },
  { title: "Multi-language Support", status: "done" },
  { title: "Evaluation History Dashboard", status: "done" },
  { title: "Custom Scoring Rubrics", status: "upcoming" },
  { title: "Team Collaboration Mode", status: "upcoming" },
  { title: "Export to Word & Slides", status: "upcoming" },
  { title: "Native Mobile App", status: "upcoming" }
];

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 rounded-full text-cyan-300 text-sm backdrop-blur-md shadow-lg shadow-cyan-500/10 inline-block">
      {children}
    </div>
  );
}

const colorMap: Record<
  string,
  { border: string; bg: string; text: string; shadow: string }
> = {
  cyan: {
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    shadow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
  },
  purple: {
    border: "border-purple-500/20",
    bg: "bg-purple-500/10",
    text: "text-purple-300",
    shadow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
  },
  yellow: {
    border: "border-yellow-500/20",
    bg: "bg-yellow-500/10",
    text: "text-yellow-300",
    shadow: "hover:shadow-[0_0_40px_rgba(250,204,21,0.2)]"
  }
};

export default function About() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a22,transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#7c3aed22,transparent_40%)]" />

      {/* Animated Glow Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 left-20 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: "10%", top: "15%" },
          { left: "25%", top: "65%" },
          { left: "40%", top: "30%" },
          { left: "60%", top: "75%" },
          { left: "75%", top: "20%" },
          { left: "85%", top: "55%" }
        ].map((particle, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -100], opacity: [0, 1, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{ left: particle.left, top: particle.top }}
          />
        ))}
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex flex-col items-center px-6 py-20">

        {/* ---------------- Hero ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl"
        >
          <SectionBadge>About the Project</SectionBadge>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
            SCIJUDGE AI
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
            AI-powered scientific research evaluation platform. Built to give
            students the honest, rigorous, judge-level feedback they deserve
            before they ever step in front of a real panel.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -1,
                  boxShadow: "0px 0px 40px rgba(34,211,238,0.5)"
                }}
                whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-8 py-4 font-medium transition-all duration-300 hover:bg-cyan-500/20 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">Try SCIJUDGE AI</span>
              </motion.div>
            </Link>

            <a
              href="https://github.com/YassinAliElDeeb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-zinc-200 backdrop-blur-md hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                GitHub Repository
              </motion.div>
            </a>
          </div>
        </motion.div>

        {/* ---------------- Why SCIJUDGE AI ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mt-28"
        >
          <div className="text-center mb-10">
            <SectionBadge>The Motivation</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Why SCIJUDGE AI
            </h2>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 md:p-10 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-500">
            <p className="text-zinc-300 text-lg leading-relaxed mb-4">
              Science fair judges are scarce, feedback comes late, and most
              students only find out what a real judge thinks minutes before
              they present. SCIJUDGE AI closes that gap by putting a
              judge-level review in a student&apos;s hands weeks in advance,
              not minutes.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              It was built around competitions like ISEF, where innovation,
              methodology, and clarity all matter, and where the difference
              between a good project and a winning one is often a handful of
              questions nobody asked in time. SCIJUDGE AI asks them early.
            </p>
          </div>
        </motion.section>

        {/* ---------------- Features ---------------- */}
        <section className="w-full max-w-6xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>What It Does</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Features
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const c = colorMap[feature.color];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`rounded-3xl border ${c.border} bg-white/5 p-6 backdrop-blur-xl text-left transition-all duration-500 ${c.shadow}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center text-2xl mb-5`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ---------------- Tech Stack ---------------- */}
        <section className="w-full max-w-6xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>Under the Hood</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.04 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl text-center hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <p className="text-white font-semibold text-sm mb-1">
                  {tech.name}
                </p>
                <p className="text-zinc-500 text-xs">{tech.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- Roadmap ---------------- */}
        <section className="w-full max-w-3xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>What&apos;s Next</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Roadmap
            </h2>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" />

            <div className="space-y-6">
              {roadmap.map((item, index) => {
                const done = item.status === "done";
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="relative flex items-center gap-4"
                  >
                    <div
                      className={`absolute -left-8 w-6 h-6 rounded-full border flex items-center justify-center text-xs
                        ${
                          done
                            ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-300"
                            : "bg-white/5 border-white/20 text-zinc-500"
                        }`}
                    >
                      {done ? "✓" : "•"}
                    </div>

                    <div
                      className={`flex-1 rounded-2xl border p-4 backdrop-blur-xl transition-all duration-500
                        ${
                          done
                            ? "border-cyan-500/20 bg-cyan-500/5"
                            : "border-white/10 bg-white/5"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <p
                          className={`font-medium ${
                            done ? "text-white" : "text-zinc-300"
                          }`}
                        >
                          {item.title}
                        </p>
                        <span
                          className={`text-xs px-3 py-1 rounded-full border ${
                            done
                              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
                              : "bg-purple-500/10 border-purple-500/20 text-purple-300"
                          }`}
                        >
                          {done ? "Completed" : "Upcoming"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- About the Developer ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mt-28 mb-10"
        >
          <div className="text-center mb-10">
            <SectionBadge>The Developer</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              About the Developer
            </h2>
          </div>

          <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-8 md:p-10 backdrop-blur-xl text-center hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-3xl font-black mb-5">
              YA
            </div>

            <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-2">
              Yassin Ali
            </h3>

            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Builder of SCIJUDGE AI. Focused on shipping AI-powered tools
              that give students a real edge, one project at a time.
            </p>

            <div className="flex items-center justify-center gap-6 flex-wrap">
              <a
                href="https://linktr.ee/yassin.ali"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:scale-105 transition"
              >
                Linktree
              </a>
              <a
                href="https://github.com/YassinAliElDeeb"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-2xl bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 hover:bg-zinc-500/20 hover:scale-105 transition-all duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yassinali30/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:scale-105 transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}