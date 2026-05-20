"use client";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader eyebrow="01 · About" title="About me." />

        <Reveal>
          <div className="rounded-3xl2 border hairline bg-white shadow-soft p-8 md:p-12">
            <h3 className="font-display font-semibold tracking-tightest leading-[1.05] text-balance text-[clamp(32px,5vw,56px)] text-ink-900">
              Hi, I&apos;m <span className="text-gradient">Dardika</span> —<br />
              I build <span className="text-iridescent">intelligent</span> things.
            </h3>

            <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink-700 leading-relaxed">
              <span className="text-ink-900 font-medium">AI Engineer · Full-Stack Developer · Creative Technologist.</span>{" "}
              I work across LLMs, computer vision, IoT, and product-grade web apps — turning ideas into systems that ship.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
