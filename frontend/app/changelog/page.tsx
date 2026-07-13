"use client";

import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/YassinAliElDeeb/SCIJUDGE-AI";
const LIVE_DEMO_URL = "https://scijudge-ai.vercel.app"; // update with the real deployed URL
const LINKEDIN_URL = "https://www.linkedin.com/in/yassinali30/";

const releases = [
  {
    version: "v1.2.0 Beta",
    label: "Latest",
    color: "cyan",
    features: [
      "Added About page",
      "Added Help Center",
      "Added Privacy Policy",
      "Added Changelog page",
      "Added responsive Navbar",
      "Added reusable Footer",
      "Added project logo",
      "Improved README",
      "Added Live Demo section",
      "Improved mobile navigation",
      "Improved branding"
    ]
  },
  {
    version: "v1.1.0",
    label: null,
    color: "purple",
    features: [
      "Added Evaluation History",
      "Added History Search",
      "Added Statistics Cards",
      "Improved Evaluation Report Cards",
      "Improved UI & UX"
    ]
  },
  {
    version: "v1.0.0",
    label: "Initial Release",
    color: "cyan",
    features: [
      "AI-assisted Research Evaluation",
      "PDF Upload",
      "Judge Personas",
      "Multi-language Support",
      "AI Feedback",
      "Downloadable Reports",
      "Responsive Interface"
    ]
  }
];

const upcomingFeatures = [
  { icon: "☁️", title: "Backend Cloud Deployment" },
  { icon: "💬", title: "AI Chat Assistant" },
  { icon: "⚖️", title: "Research Comparison" },
  { icon: "🔐", title: "User Authentication" },
  { icon: "🔄", title: "Cloud History Sync" },
  { icon: "📊", title: "Advanced Analytics Dashboard" },
  { icon: "📤", title: "Better PDF Export" },
  { icon: "🤝", title: "Team Collaboration" },
  { icon: "📐", title: "Custom Evaluation Templates" }
];

const colorMap: Record<
  string,
  { border: string; bg: string; text: string; dot: string; shadow: string }
> = {
  cyan: {
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    dot: "bg-cyan-400 border-cyan-300",
    shadow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
  },
  purple: {
    border: "border-purple-500/20",
    bg: "bg-purple-500/10",
    text: "text-purple-300",
    dot: "bg-purple-400 border-purple-300",
    shadow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
  }
};

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 rounded-full text-cyan-300 text-sm backdrop-blur-md shadow-lg shadow-cyan-500/10 inline-block">
      {children}
    </div>
  );
}

export default function Changelog() {
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
          className="text-center max-w-3xl"
        >
          <SectionBadge>Release Notes</SectionBadge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
            Changelog
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
            Track the evolution of SCIJUDGE AI and discover the latest
            improvements.
          </p>
        </motion.div>

        {/* ---------------- Current Version Card ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -8 }}
          className="relative w-full max-w-2xl mt-16"
        >
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-cyan-500/40 blur-md opacity-60" />

          <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-cyan-500/10">

            <div className="grid sm:grid-cols-3 gap-6 text-center">

              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                  Current Version
                </p>
                <p className="text-2xl font-black bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  v1.2.0 Beta
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                  Status
                </p>
                <p className="text-lg font-semibold text-green-400 flex items-center justify-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  Active Development
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
                  Last Updated
                </p>
                <p className="text-lg font-semibold text-white">
                  July 2026
                </p>
              </div>

            </div>

          </div>
        </motion.div>

        {/* ---------------- Timeline ---------------- */}
        <section className="w-full max-w-3xl mt-28">
          <div className="text-center mb-14">
            <SectionBadge>Version History</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Timeline
            </h2>
          </div>

          <div className="relative pl-10 sm:pl-12">

            <div className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/40 to-transparent" />

            <div className="space-y-12">
              {releases.map((release, index) => {
                const c = colorMap[release.color];

                return (
                  <motion.div
                    key={release.version}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >

                    <div
                      className={`absolute -left-10 sm:-left-12 top-1 w-8 h-8 rounded-full border-2 ${c.dot} flex items-center justify-center shadow-lg`}
                    >
                      <span className="w-2 h-2 rounded-full bg-black/70" />
                    </div>

                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      className={`rounded-3xl border ${c.border} bg-white/5 p-6 md:p-8 backdrop-blur-xl transition-all duration-500 ${c.shadow}`}
                    >

                      <div className="flex items-center gap-3 flex-wrap mb-5">
                        <h3 className="text-2xl font-black text-white">
                          {release.version}
                        </h3>

                        {release.label && (
                          <span
                            className={`text-xs px-3 py-1 rounded-full border ${c.border} ${c.bg} ${c.text} font-medium`}
                          >
                            {release.label}
                          </span>
                        )}
                      </div>

                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                        {release.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-zinc-300"
                          >
                            <span className={`mt-1 ${c.text}`}>●</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                    </motion.div>

                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- Upcoming Features ---------------- */}
        <section className="w-full max-w-6xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>What&apos;s Coming</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Upcoming Features
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative rounded-3xl border border-purple-500/20 bg-white/5 p-6 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500"
              >

                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 font-medium whitespace-nowrap">
                    Coming Soon
                  </span>
                </div>

                <h3 className="text-white font-bold">{feature.title}</h3>

              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- Footer Section ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mt-28 mb-10"
        >
          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-xl text-center hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">

            <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
              Built with{" "}
              <span className="text-red-400">❤️</span>{" "}
              by{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Yassin Ali
              </span>
            </h2>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3 rounded-2xl bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 font-medium hover:bg-zinc-500/20 transition-all duration-300"
                >
                  GitHub Repository
                </motion.div>
              </a>

              <a href={LIVE_DEMO_URL} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium hover:bg-cyan-500/20 transition-all duration-300"
                >
                  Live Demo
                </motion.div>
              </a>

              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium hover:bg-purple-500/20 transition-all duration-300"
                >
                  LinkedIn
                </motion.div>
              </a>
            </div>

          </div>
        </motion.section>

      </div>
    </main>
  );
}