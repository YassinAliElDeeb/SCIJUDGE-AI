"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Help", href: "/help" },
  { label: "Privacy", href: "/privacy" },
  { label: "Changelog", href: "/changelog" }
];

const GITHUB_URL = "https://github.com/YassinAliElDeeb/SCIJUDGE-AI";

export default function Navbar() {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {

    setIsOpen(false);

  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };

  }, [isOpen]);

  const isActive = (href: string) => {

    if (href === "/") return pathname === "/";

    return pathname === href || pathname?.startsWith(`${href}/`);

  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6">

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg shadow-black/20"
      >

        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-4 shrink-0">

            <motion.div
              whileHover={{ rotate: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-[46px] h-[46px] shrink-0"
            >

              {/* Subtle cyan glow behind the logo */}
              <div className="absolute inset-0 rounded-xl bg-cyan-400/25 blur-xl scale-110" />

             <Image
  src="/logo.png"
  alt="Logo"
  width={60}
  height={60}
/>

            </motion.div>

            <div className="flex flex-col leading-tight">

              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
                SCIJUDGE AI
              </span>

              <span className="text-xs text-zinc-400 font-medium">
                AI-powered Research Evaluation
              </span>

            </div>

          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2 mx-6">

            {navLinks.map((link) => {

              const active = isActive(link.href);

              return (

                <Link key={link.href} href={link.href} className="relative px-4 py-2">

                  <motion.span
                    whileHover={{ y: -1 }}
                    className={`relative z-10 text-sm font-medium transition-colors duration-300 ${
                      active
                        ? "text-cyan-300"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </motion.span>

                  {active && (

                    <motion.div
                      layoutId="navbar-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                    />

                  )}

                </Link>

              );

            })}

          </div>

          {/* Right side: GitHub button + mobile toggle */}
          <div className="flex items-center gap-4">

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >

              <motion.div
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0px 0px 36px rgba(168,85,247,0.55)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 transition-colors duration-500 hover:bg-purple-500/20 hover:border-purple-400/40"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.4 0 12.06c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.62-4.04-1.62-.55-1.4-1.34-1.78-1.34-1.78-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.85 2.81 1.31 3.5 1 .11-.79.42-1.31.76-1.61-2.66-.31-5.47-1.35-5.47-6.02 0-1.33.46-2.42 1.23-3.27-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.25a11.2 11.2 0 0 1 6 0c2.28-1.58 3.29-1.25 3.29-1.25.65 1.69.24 2.94.12 3.25.77.85 1.23 1.94 1.23 3.27 0 4.68-2.81 5.7-5.49 6.01.43.38.81 1.13.81 2.28 0 1.64-.02 2.97-.02 3.37 0 .32.22.7.83.58A12.07 12.07 0 0 0 24 12.06C24 5.4 18.63 0 12 0Z" />
                </svg>
                GitHub
              </motion.div>

            </a>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden relative w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
            >

              <div className="flex flex-col items-center justify-center gap-1.5 w-5">

                <motion.span
                  animate={
                    isOpen
                      ? { rotate: 45, y: 6.5 }
                      : { rotate: 0, y: 0 }
                  }
                  className="block h-0.5 w-full bg-white rounded-full origin-center"
                />

                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 w-full bg-white rounded-full"
                />

                <motion.span
                  animate={
                    isOpen
                      ? { rotate: -45, y: -6.5 }
                      : { rotate: 0, y: 0 }
                  }
                  className="block h-0.5 w-full bg-white rounded-full origin-center"
                />

              </div>

            </motion.button>

          </div>

        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>

          {isOpen && (

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >

              <div className="flex flex-col gap-1 px-4 py-4">

                {navLinks.map((link) => {

                  const active = isActive(link.href);

                  return (

                    <Link key={link.href} href={link.href}>

                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                          active
                            ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </motion.div>

                    </Link>

                  );

                })}

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2"
                >

                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm font-medium text-purple-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.37 0 0 5.4 0 12.06c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.62-4.04-1.62-.55-1.4-1.34-1.78-1.34-1.78-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.85 2.81 1.31 3.5 1 .11-.79.42-1.31.76-1.61-2.66-.31-5.47-1.35-5.47-6.02 0-1.33.46-2.42 1.23-3.27-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.25a11.2 11.2 0 0 1 6 0c2.28-1.58 3.29-1.25 3.29-1.25.65 1.69.24 2.94.12 3.25.77.85 1.23 1.94 1.23 3.27 0 4.68-2.81 5.7-5.49 6.01.43.38.81 1.13.81 2.28 0 1.64-.02 2.97-.02 3.37 0 .32.22.7.83.58A12.07 12.07 0 0 0 24 12.06C24 5.4 18.63 0 12 0Z" />
                    </svg>
                    GitHub Repository
                  </motion.div>

                </a>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.nav>

    </header>
  );
}