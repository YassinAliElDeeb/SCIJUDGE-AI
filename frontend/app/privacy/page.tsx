"use client";

import { motion } from "framer-motion";

const GITHUB_URL = "https://github.com/YassinAliElDeeb/SCIJUDGE-AI";
const LINKEDIN_URL = "https://www.linkedin.com/in/yassinali30/";
const EMAIL = "yassin.ali.official@gmail.com"; 

const dataCards = [
  {
    icon: "📄",
    title: "Uploaded Research Papers",
    description:
      "The PDF you upload is read to extract its text so it can be evaluated. It is processed for the purpose of generating your report and is not published or shared."
  },
  {
    icon: "🕘",
    title: "Evaluation History",
    description:
      "Your past reports (scores, feedback, and filenames) are saved in your own browser's local storage on your device, not on a central database tied to your identity."
  },
  {
    icon: "⚙️",
    title: "Technical Information",
    description:
      "Standard technical data such as request metadata may be processed briefly to serve the evaluation request and keep the service running reliably."
  }
];

const notDoList = [
  "We do not sell your data.",
  "We do not publish your research.",
  "We do not use uploaded papers to train AI models.",
  "We do not share files with third parties."
];

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 rounded-full text-cyan-300 text-sm backdrop-blur-md shadow-lg shadow-cyan-500/10 inline-block">
      {children}
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
  index
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Privacy() {
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
          <SectionBadge>Your Data</SectionBadge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
            Learn how SCIJUDGE AI handles uploaded research papers and
            evaluation data.
          </p>
        </motion.div>

        {/* ---------------- Information We Process ---------------- */}
        <section className="w-full max-w-6xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>What We Process</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Information We Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCards.map((card, index) => (
              <InfoCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* ---------------- What We Do NOT Do ---------------- */}
        <section className="w-full max-w-4xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>Our Commitment</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              What We Do NOT Do
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {notDoList.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex items-start gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-5 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-500"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-sm">
                  ✓
                </div>
                <p className="text-zinc-200 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- User Responsibilities ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl mt-28"
        >
          <div className="text-center mb-10">
            <SectionBadge>Please Read</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              User Responsibilities
            </h2>
          </div>

          <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-8 md:p-10 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500">
            <p className="text-zinc-300 text-lg leading-relaxed mb-4">
              You should only upload research papers that you own or have
              explicit permission to share and evaluate. By uploading a
              paper, you confirm that you have the right to submit it for
              AI-assisted review.
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              Please avoid uploading confidential, sensitive, or
              unpublished proprietary documents that you are not authorized
              to share. Use good judgment, and treat SCIJUDGE AI the way
              you would treat any third-party tool handling your work.
            </p>
          </div>
        </motion.section>

        {/* ---------------- Disclaimer ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-4xl mt-16"
        >
          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-8 md:p-10 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(250,204,21,0.15)] transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-300 mb-3">
                  Disclaimer
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  SCIJUDGE AI provides AI-assisted evaluations intended to
                  help you prepare and improve your research paper. It does
                  not replace qualified human reviewers, official
                  competition judges, or academic advisors, and its scores
                  and feedback should be treated as guidance rather than a
                  final or authoritative verdict.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ---------------- Contact ---------------- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mt-28 mb-10"
        >
          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-xl text-center hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">
            <SectionBadge>Questions?</SectionBadge>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Contact
            </h2>

            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Have a question about this policy or how your data is
              handled? Reach out directly.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3 rounded-2xl bg-zinc-500/10 border border-zinc-500/20 text-zinc-300 font-medium hover:bg-zinc-500/20 transition-all duration-300"
                >
                  GitHub
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

              <a href={`mailto:${EMAIL}`}>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium hover:bg-cyan-500/20 transition-all duration-300"
                >
                  Email
                </motion.div>
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}