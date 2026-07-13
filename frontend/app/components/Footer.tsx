"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Update these if the repo or a hosted demo URL ever change
const GITHUB_URL = "https://github.com/YassinAliElDeeb/SCIJUDGE-AI";
const LIVE_DEMO_URL = "https://scijudge-ai.vercel.app";
const LINKEDIN_URL = "https://www.linkedin.com/in/yassinali30/";
const LINKTREE_URL = "https://linktr.ee/yassin.ali";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Help", href: "/help" },
  { label: "Privacy", href: "/privacy" },
  { label: "Changelog", href: "/changelog" }
];

const resourceLinks = [
  { label: "GitHub Repository", href: GITHUB_URL },
  { label: "Live Demo", href: LIVE_DEMO_URL }
];

const developerLinks = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Linktree", href: LINKTREE_URL }
];

function InternalLink({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  return (
    <li>
      <Link href={href}>
        <motion.span
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-block text-sm text-zinc-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
        >
          {label}
        </motion.span>
      </Link>
    </li>
  );
}

function ExternalLink({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <motion.span
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-block text-sm text-zinc-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer"
        >
          {label}
        </motion.span>
      </a>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full px-4 sm:px-6 pb-6 pt-16">

      {/* Ambient glow to echo the Navbar / page background */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg shadow-black/20"
      >

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-6 sm:px-10 py-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">

            <Link href="/" className="inline-flex items-center gap-3 mb-4">

              <motion.div
                whileHover={{ rotate: -6, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-10 h-10 shrink-0"
              >
                <div className="absolute inset-0 rounded-xl bg-cyan-400/40 blur-lg" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-black text-black">
                  SJ
                </div>
              </motion.div>

              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
                SCIJUDGE AI
              </span>

            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              AI-powered scientific research evaluation platform.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <InternalLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <ExternalLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-4">
              Developer
            </h3>

            <p className="text-sm text-zinc-400 mb-4">
              Developed by{" "}
              <span className="font-semibold text-white">Yassin Ali</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {developerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    whileHover={{
                      scale: 1.06,
                      boxShadow: "0px 0px 20px rgba(34,211,238,0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="inline-block rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors duration-300"
                  >
                    {link.label}
                  </motion.span>
                </a>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 px-6 sm:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">

            <p className="text-xs text-zinc-500">
              © 2026 SCIJUDGE AI. All rights reserved.
            </p>

            <p className="text-xs text-zinc-500">
              Made with{" "}
              <span className="text-red-400">❤️</span>{" "}
              for students, researchers, and science fair judges.
            </p>

          </div>
        </div>

      </motion.div>

    </footer>
  );
}