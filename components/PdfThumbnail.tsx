"use client";
import { useEffect, useRef, useState } from "react";

export function PdfThumbnail({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 400 && r.bottom > -400) {
        setInView(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    setStatus("loading");

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument(src).promise;
        if (cancelled) return;

        const page = await doc.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const base = page.getViewport({ scale: 1 });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const scale = (820 * dpr) / base.width;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView, src]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className={`h-full w-full object-contain p-3 md:p-4 drop-shadow-xl transition-opacity duration-500 ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
      {status === "loading" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        </div>
      )}
    </div>
  );
}
