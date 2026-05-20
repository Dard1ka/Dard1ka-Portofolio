"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
};

export function MagneticButton({ children, href, onClick, className = "", external }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.25);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span style={{ x, y }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const baseClass =
    "group inline-flex items-center gap-2 px-5 py-3 rounded-full border hairline text-sm tracking-wide transition-colors hover:bg-accent-700/10 hover:border-accent-500/40 focus:outline-none focus:ring-2 focus:ring-accent-500/50 " +
    className;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={baseClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={baseClass}
    >
      {inner}
    </button>
  );
}
