"use client";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Project } from "@/data/projects";
import { ArrowUpRight, GithubIcon, YouTubeIcon, GlobeIcon } from "./Icons";
import { Reveal } from "./Reveal";

const PdfSlideViewer = dynamic(
  () => import("./PdfSlideViewer").then((m) => m.PdfSlideViewer),
  { ssr: false }
);

const palettes = [
  "from-accent-700 via-accent-500 to-lime",
  "from-accent-800 via-accent-600 to-accent-300",
  "from-lime via-accent-300 to-accent-600",
  "from-accent-500 via-accent-300 to-white",
  "from-accent-700 via-accent-400 to-lime",
  "from-accent-600 via-accent-400 to-accent-200",
];

function LinkPill({ kind, href, label }: { kind: string; href: string; label: string }) {
  const Icon = kind === "github" ? GithubIcon : kind === "youtube" ? YouTubeIcon : GlobeIcon;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="group inline-flex items-center gap-2 text-sm text-ink-800 border hairline bg-white rounded-full px-4 py-2 hover:bg-accent-50 hover:border-accent-300 transition-colors shadow-soft"
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 icon-pop" />
    </a>
  );
}

export function ProjectShowcase({ project, idx }: { project: Project; idx: number }) {
  const hasVideo = !!project.video;
  const primaryImg = project.images[0];
  const palette = palettes[idx % palettes.length];
  const hasPdf = !!project.pdf;
  const [pdfOpen, setPdfOpen] = useState(false);

  const openPdf = () => {
    if (hasPdf) setPdfOpen(true);
  };

  return (
    <Reveal>
      <article
        onClick={openPdf}
        role={hasPdf ? "button" : undefined}
        tabIndex={hasPdf ? 0 : undefined}
        onKeyDown={
          hasPdf
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPdf();
                }
              }
            : undefined
        }
        className={`group rounded-3xl2 border hairline bg-white shadow-soft transition-all duration-500 overflow-hidden hover-lift gradient-border ${
          hasPdf ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500" : ""
        }`}
      >
        {/* Media area */}
        <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${palette} zoom-img shine`}>
          {hasVideo ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : primaryImg ? (
            <Image
              src={primaryImg.src}
              alt={primaryImg.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/80 font-display text-3xl">
              {project.name}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="chip !bg-white/90">{project.index}</span>
            <span className="chip !bg-white/90">{project.category}</span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {hasPdf && (
              <span className="chip !bg-ink-900 !text-white !border-ink-900">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                PDF
              </span>
            )}
            <span className="chip !bg-ink-900 !text-white !border-ink-900">{project.year}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <h3 className="font-display font-semibold text-3xl md:text-4xl text-ink-900 tracking-tightest leading-tight transition-colors duration-300 group-hover:text-accent-700">
            {project.name}
          </h3>
          <p className="mt-1 text-accent-700 font-medium">{project.tagline}</p>
          <p className="mt-4 text-ink-700 leading-relaxed">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.map((l) => (
              <LinkPill key={l.href} kind={l.kind} href={l.href} label={l.label} />
            ))}
            {hasPdf && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPdf();
                }}
                className="group inline-flex items-center gap-2 text-sm text-white bg-ink-900 border border-ink-900 rounded-full px-4 py-2 hover:bg-accent-700 hover:border-accent-700 transition-colors shadow-soft"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
                <span>View Presentation</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-80 icon-pop" />
              </button>
            )}
          </div>

          {/* Thumbnail strip */}
          {project.images.length > 1 && (
            <div className="mt-6 grid grid-cols-4 gap-2">
              {project.images.slice(1, 5).map((img) => (
                <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-lg border hairline bg-cloud zoom-img transition-shadow hover:shadow-soft">
                  <Image src={img.src} alt={img.alt} fill sizes="15vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </article>

      {hasPdf && (
        <PdfSlideViewer
          open={pdfOpen}
          onClose={() => setPdfOpen(false)}
          src={project.pdf!}
          title={project.name}
        />
      )}
    </Reveal>
  );
}
