"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { certificates, Certificate } from "@/data/certificates";
import { ArrowUpRight } from "./Icons";
import { PdfThumbnail } from "./PdfThumbnail";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const PdfSlideViewer = dynamic(
  () => import("./PdfSlideViewer").then((m) => m.PdfSlideViewer),
  { ssr: false }
);

const palettes = [
  "from-accent-700 via-accent-500 to-lime",
  "from-accent-800 via-accent-600 to-accent-300",
  "from-lime via-accent-300 to-accent-600",
];

function PdfTag() {
  return (
    <span className="chip !bg-ink-900 !text-white !border-ink-900">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
      </svg>
      PDF
    </span>
  );
}

function CertificateCard({ cert, idx }: { cert: Certificate; idx: number }) {
  const [open, setOpen] = useState(false);
  const palette = palettes[idx % palettes.length];

  return (
    <Reveal>
      <article
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="group flex h-full flex-col rounded-3xl2 border hairline bg-white shadow-soft transition-all duration-500 overflow-hidden hover-lift gradient-border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
      >
        {/* Media area */}
        <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${palette} shine`}>
          <div className="absolute inset-0 grid place-items-center text-white/85">
            <svg viewBox="0 0 24 24" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="9" r="6" />
              <path d="M9 14.5 7 22l5-3 5 3-2-7.5" />
              <path d="m9.5 9 1.8 1.8L15 7" />
            </svg>
          </div>

          <PdfThumbnail src={cert.pdf} alt={`${cert.title} certificate preview`} />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="chip !bg-white/90">{cert.index}</span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <PdfTag />
            <span className="chip !bg-ink-900 !text-white !border-ink-900">{cert.year}</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="chip !bg-white/90">{cert.type}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display font-semibold text-2xl md:text-3xl text-ink-900 tracking-tightest leading-tight transition-colors duration-300 group-hover:text-accent-700">
            {cert.title}
          </h3>
          <p className="mt-1 text-accent-700 font-medium">{cert.issuer}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {cert.skills.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>

          {cert.credentialId && (
            <p className="mt-4 font-mono text-xs text-muted">
              Credential ID · {cert.credentialId}
            </p>
          )}

          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className="inline-flex items-center gap-2 text-sm text-white bg-ink-900 border border-ink-900 rounded-full px-4 py-2 hover:bg-accent-700 hover:border-accent-700 transition-colors shadow-soft"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              <span>View Certificate</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80 icon-pop" />
            </button>
          </div>
        </div>
      </article>

      <PdfSlideViewer
        open={open}
        onClose={() => setOpen(false)}
        src={cert.pdf}
        title={cert.title}
      />
    </Reveal>
  );
}

export function Certificates() {
  return (
    <section id="certificates" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          title="Certificates."
          caption="Courses and bootcamps completed — open any card to view the full document."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((c, i) => (
            <CertificateCard key={c.id} cert={c} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
