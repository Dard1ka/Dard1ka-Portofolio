"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, GithubIcon } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      {/* Colorful blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-20 h-[55vh] w-[55vh] rounded-full bg-accent-300/40 blur-[100px]" />
        <div className="absolute top-40 -left-32 h-[40vh] w-[40vh] rounded-full bg-lime/30 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[35vh] w-[35vh] rounded-full bg-accent-500/25 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="md:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display font-semibold tracking-tightest leading-[0.95] text-balance text-[clamp(44px,7.5vw,110px)] text-ink-900"
            >
              Hi, I&apos;m <span className="text-gradient">Dardika</span> —<br />
              I build <span className="text-iridescent">intelligent</span> things.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 max-w-2xl"
            >
              <p className="text-lg md:text-xl text-ink-700 leading-relaxed">
                AI Engineer · Full-Stack Developer · Creative Technologist. I work across LLMs, computer vision, IoT, and product-grade web apps — turning ideas into systems that ship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a href="#work" className="btn-primary">
                View Projects <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/Dard1ka" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
              <a href="#contact" className="btn-ghost">Contact</a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 flex justify-center md:justify-end"
          >
            <div className="group relative">
              {/* Decorative gradient ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-accent-700 via-accent-500 to-lime blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />

              <div className="relative h-56 w-56 md:h-72 md:w-72 lg:h-80 lg:w-80 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-cloud ring-1 ring-accent-300/30 zoom-img">
                <Image
                  src="/me/dardika.jpg"
                  alt="Portrait of Dardika"
                  fill
                  priority
                  sizes="(max-width: 768px) 224px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
