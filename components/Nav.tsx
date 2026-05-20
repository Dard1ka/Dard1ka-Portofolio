"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const items = [
  { href: "#work", label: "Work" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 pt-4">
        <div
          className={`flex items-center justify-between h-14 px-4 md:px-5 rounded-full transition-all duration-500 ${
            scrolled || open ? "glass shadow-soft" : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-xl font-semibold tracking-tightest text-ink-900 z-10"
          >
            Dard<span className="text-accent-600">1</span>ka
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm text-ink-700">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="underline-link hover:text-ink-900 transition-colors">
                {it.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-4 !text-xs">
            Let&apos;s talk →
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative h-10 w-10 grid place-items-center rounded-full border hairline bg-white/70 text-ink-900 transition-colors hover:bg-white focus:outline-none focus:ring-4 focus:ring-accent-300/40"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-4 w-5">
              <motion.span
                className="absolute left-0 right-0 h-[2px] bg-ink-900 rounded-full"
                animate={open ? { top: 7, rotate: 45 } : { top: 2, rotate: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ top: 2 }}
              />
              <motion.span
                className="absolute left-0 right-0 top-[7px] h-[2px] bg-ink-900 rounded-full"
                animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute left-0 right-0 h-[2px] bg-ink-900 rounded-full"
                animate={open ? { top: 7, rotate: -45 } : { top: 12, rotate: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ top: 12 }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-0 z-40"
          >
            {/* Backdrop */}
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-4 mt-24 rounded-3xl2 glass shadow-pop overflow-hidden"
            >
              <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-accent-300/40 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-lime/30 blur-3xl pointer-events-none" />

              <nav aria-label="Mobile" className="relative p-2">
                <ul>
                  {items.map((it, i) => (
                    <motion.li
                      key={it.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.06 * i + 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={it.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-white/80 transition-colors"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-600">
                            0{i + 1}
                          </span>
                          <span className="font-display text-2xl text-ink-900">{it.label}</span>
                        </span>
                        <span className="arrow-marker">↗</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 * items.length + 0.1 }}
                  className="p-3"
                >
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Let&apos;s talk →
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="px-5 pb-5 pt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
                >
                  <span>Dard1ka · 2026</span>
                  <a
                    href="https://github.com/Dard1ka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink-900 transition-colors"
                  >
                    Github ↗
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
