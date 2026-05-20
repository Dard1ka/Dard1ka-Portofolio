"use client";
import { Reveal } from "./Reveal";
import { ArrowUpRight, GithubIcon } from "./Icons";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl2 p-10 md:p-16 shadow-pop">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-800 via-accent-600 to-accent-400" />
            <div className="absolute -top-20 -right-10 h-[40vh] w-[40vh] rounded-full bg-lime/40 blur-[80px]" />
            <div className="absolute -bottom-20 -left-10 h-[40vh] w-[40vh] rounded-full bg-white/20 blur-[80px]" />

            <div className="relative">
              <h2 className="font-display font-semibold tracking-tightest text-[clamp(40px,8vw,108px)] leading-[0.95] text-white text-balance">
                Let&apos;s build something
                <br />
                <span className="italic text-lime">intelligent &amp; polished.</span>
              </h2>
              <p className="mt-6 text-white/85 text-lg max-w-xl">
                Interested in collaborating, freelance, or full-time? I&apos;m open to building things that ship and bring real value.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="mailto:darrellandika2509@gmail.com"
                  className="group btn bg-white text-ink-900 hover:bg-lime hover:text-ink-900 shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  darrellandika2509@gmail.com <ArrowUpRight className="h-4 w-4 icon-pop" />
                </a>
                <a
                  href="https://github.com/Dard1ka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/40 text-white hover:bg-white/10"
                >
                  <GithubIcon className="h-4 w-4" /> github.com/Dard1ka
                </a>
                <a
                  href="https://www.linkedin.com/in/darrell-andika-285486290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/40 text-white hover:bg-white/10"
                >
                  LinkedIn <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
