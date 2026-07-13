"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GITHUB_URL = "https://github.com/YassinAliElDeeb/SCIJUDGE-AI";
const LINKEDIN_URL = "https://www.linkedin.com/in/yassinali30/";
const EMAIL = "yassin.ali.official@gmail.com"; 

const quickStartSteps = [
  {
    number: "01",
    title: "Upload PDF",
    description:
      "Drop in your research paper as a PDF. SCIJUDGE AI reads and extracts its content automatically."
  },
  {
    number: "02",
    title: "Select Judge Persona",
    description:
      "Pick the reviewer style you want: ISEF Judge, MIT Professor, Harsh Reviewer, or Supportive Mentor."
  },
  {
    number: "03",
    title: "Choose AI Feedback Language",
    description:
      "Choose the language your evaluation comes back in, independently of your paper's original language."
  },
  {
    number: "04",
    title: "Generate Evaluation",
    description:
      "The AI judge reads your full paper and scores it across innovation, methodology, impact, and clarity."
  },
  {
    number: "05",
    title: "Review & Download Report",
    description:
      "Explore your scores and feedback on screen, then download a complete PDF report to keep or share."
  }
];

const faqs = [
  {
    question: "Which file types are supported?",
    answer:
      "SCIJUDGE AI currently accepts research papers in PDF format only. Make sure your paper is a real, text-based PDF rather than a scanned image for the most accurate evaluation."
  },
  {
    question: "Is there a maximum file size?",
    answer:
      "Very large files may take longer to process, and only the first portion of extremely long papers is analyzed. For best results, keep your PDF focused on the core paper content."
  },
  {
    question: "How are scores generated?",
    answer:
      "An AI model reads the extracted text of your paper and evaluates it across innovation, methodology, impact, and clarity, guided by the judge persona you selected, then returns numeric scores and written feedback."
  },
  {
    question: "Can AI replace human judges?",
    answer:
      "No. SCIJUDGE AI is designed to help you prepare and improve before you face real judges, not to replace them. Treat its feedback as practice and guidance, not a final verdict."
  },
  {
    question: "What are Judge Personas?",
    answer:
      "Judge Personas change the lens the AI evaluates through: an ISEF Judge focuses on competition standards, an MIT Professor is deeply technical, a Harsh Reviewer is intentionally critical, and a Supportive Mentor balances encouragement with honest feedback."
  },
  {
    question: "Is my research paper stored permanently?",
    answer:
      "Your evaluation history is saved in your browser's local storage on your own device, so you can revisit past reports. It is not stored on a central server beyond what's needed to generate your evaluation."
  },
  {
    question: "Can I download reports?",
    answer:
      "Yes. Every completed evaluation can be downloaded as a clean PDF report, including your scores, strengths, weaknesses, judge questions, and final verdict."
  },
  {
    question: "Can I receive AI feedback in another language?",
    answer:
      "Yes. You can choose your feedback language independently of your paper's original language, so a paper written in English can be evaluated with feedback in Arabic or French, for example."
  }
];

const tips = [
  {
    icon: "🎯",
    title: "Be specific in your abstract",
    description:
      "A clear, specific abstract helps the AI judge understand your paper's core contribution from the very first paragraph."
  },
  {
    icon: "🧪",
    title: "Show your methodology clearly",
    description:
      "Explicitly describe your experimental setup and data collection process. Vague methods sections lower scientific rigor scores."
  },
  {
    icon: "🎭",
    title: "Try more than one persona",
    description:
      "Run your paper through both a Supportive Mentor and a Harsh Reviewer to see the full range of feedback you might face."
  },
  {
    icon: "📈",
    title: "Iterate between reports",
    description:
      "Re-upload your paper after revisions and compare your new scores against your saved history to track real improvement."
  },
  {
    icon: "🗣️",
    title: "Prepare for judge questions",
    description:
      "Treat the generated judge questions as a rehearsal. Practice clear, confident answers before your actual presentation."
  }
];

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 rounded-full text-cyan-300 text-sm backdrop-blur-md shadow-lg shadow-cyan-500/10 inline-block">
      {children}
    </div>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-cyan-500/20 transition-colors duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
      >
        <span className="text-base sm:text-lg font-semibold text-white">
          {question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 text-lg"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
          <SectionBadge>Support</SectionBadge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
            Help Center
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
            Everything you need to know about using SCIJUDGE AI.
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
                <span className="relative z-10">Start Evaluating</span>
              </motion.div>
            </Link>

            <a href="#contact">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-zinc-200 backdrop-blur-md hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                Contact Developer
              </motion.div>
            </a>
          </div>
        </motion.div>

        {/* ---------------- Quick Start ---------------- */}
        <section className="w-full max-w-6xl mt-28">
          <div className="text-center mb-14">
            <SectionBadge>Get Started</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Quick Start
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {quickStartSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-lg font-black text-black mb-5 shadow-lg shadow-cyan-500/20">
                    {step.number}
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl w-full hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500">
                    <h3 className="text-white font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="w-full max-w-3xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() =>
                  setOpenFaq((prev) => (prev === index ? null : index))
                }
              />
            ))}
          </div>
        </section>

        {/* ---------------- Tips ---------------- */}
        <section className="w-full max-w-6xl mt-28">
          <div className="text-center mb-12">
            <SectionBadge>Pro Tips</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Tips for Better Results
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="rounded-3xl border border-purple-500/20 bg-white/5 p-6 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl mb-5">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------- Need More Help ---------------- */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl mt-28 mb-10 scroll-mt-24"
        >
          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-xl text-center hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500">
            <SectionBadge>Still Stuck?</SectionBadge>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Need More Help
            </h2>

            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Couldn&apos;t find what you were looking for? Reach out
              directly and get a real answer from the developer.
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