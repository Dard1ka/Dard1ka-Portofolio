"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

type PdfDocLike = {
  numPages: number;
  getPage: (n: number) => Promise<PdfPageLike>;
};

type PdfPageLike = {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (opts: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }) => { promise: Promise<void> };
};

function PdfCanvas({
  pdf,
  pageNumber,
  active,
}: {
  pdf: PdfDocLike;
  pageNumber: number;
  active: boolean;
}) {
  const measureRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendered, setRendered] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    if (!active) return;
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (w > 0 && h > 0) {
        setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  useEffect(() => {
    if (!active || !size) return;
    let cancelled = false;

    (async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const aspect = baseViewport.width / baseViewport.height;
      const containerAspect = size.w / size.h;

      let displayW: number;
      let displayH: number;
      if (aspect > containerAspect) {
        displayW = size.w;
        displayH = size.w / aspect;
      } else {
        displayH = size.h;
        displayW = size.h * aspect;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const renderScale = (displayW * dpr) / baseViewport.width;
      const viewport = page.getViewport({ scale: renderScale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      await page.render({ canvasContext: ctx, viewport }).promise;
      if (!cancelled) setRendered(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [active, pdf, pageNumber, size]);

  return (
    <div className="relative w-full h-full p-3 md:p-5">
      <div
        ref={measureRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className={`rounded-lg shadow-xl bg-white transition-opacity duration-300 ${
            rendered ? "opacity-100" : "opacity-0"
          }`}
        />
        {!rendered && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export function PdfSlideViewer({
  open,
  onClose,
  src,
  title,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
}) {
  const [pdf, setPdf] = useState<PdfDocLike | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPdf(null);
    setNumPages(0);
    setCurrent(1);

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const loadingTask = pdfjs.getDocument(src);
        const doc = await loadingTask.promise;
        if (cancelled) return;
        setPdf(doc as unknown as PdfDocLike);
        setNumPages(doc.numPages);
        setLoading(false);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load PDF");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, src]);

  const goPrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const goNext = useCallback(() => swiperRef.current?.slideNext(), []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl h-[88vh] max-h-[860px] rounded-3xl2 bg-ink-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-b border-white/10">
            <div className="min-w-0 flex items-center gap-3">
              <div className="text-white/60 text-xs font-mono tracking-wide">
                Slide {current} of {numPages || "–"}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous slide"
                className="h-8 w-8 grid place-items-center rounded-md border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors disabled:opacity-40"
                disabled={current <= 1}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next slide"
                className="h-8 w-8 grid place-items-center rounded-md border border-white/15 bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-40"
                disabled={!!numPages && current >= numPages}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download"
                className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-white/80 hover:bg-white/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="h-8 w-8 grid place-items-center rounded-md border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Title strip */}
          <div className="px-4 md:px-5 pt-2 pb-1 text-white/90 font-display text-sm md:text-base truncate">
            {title}
          </div>

          {/* Slide stage */}
          <div className="relative flex-1 min-h-0">
            {loading && (
              <div className="absolute inset-0 grid place-items-center text-white/70">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  <div className="text-sm font-mono tracking-wide">Loading presentation…</div>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 grid place-items-center text-white/80">
                <div className="text-center max-w-md px-6">
                  <div className="font-display text-2xl mb-2">Couldn&apos;t load presentation</div>
                  <div className="text-sm text-white/60 mb-4">{error}</div>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm bg-white text-ink-900 rounded-lg px-4 py-2 hover:bg-white/90 transition-colors"
                  >
                    Open file in new tab
                  </a>
                </div>
              </div>
            )}

            {pdf && !loading && !error && (
              <Swiper
                modules={[Keyboard, Mousewheel]}
                keyboard={{ enabled: true }}
                spaceBetween={32}
                slidesPerView={1}
                speed={500}
                onSwiper={(s) => {
                  swiperRef.current = s;
                }}
                onSlideChange={(s) => setCurrent(s.activeIndex + 1)}
                className="h-full w-full"
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <SwiperSlide key={i}>
                    {({ isActive, isPrev, isNext }) => (
                      <PdfCanvas
                        pdf={pdf}
                        pageNumber={i + 1}
                        active={isActive || isPrev || isNext}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Mobile nav buttons */}
            {pdf && !loading && !error && (
              <div className="sm:hidden absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous slide"
                  disabled={current <= 1}
                  className="h-9 w-9 grid place-items-center rounded-full bg-white/10 backdrop-blur text-white border border-white/15 disabled:opacity-40"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <div className="text-white/80 text-xs font-mono px-2.5 py-1.5 rounded-full bg-white/10 border border-white/15">
                  {current} / {numPages}
                </div>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next slide"
                  disabled={!!numPages && current >= numPages}
                  className="h-9 w-9 grid place-items-center rounded-full bg-white/10 backdrop-blur text-white border border-white/15 disabled:opacity-40"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
