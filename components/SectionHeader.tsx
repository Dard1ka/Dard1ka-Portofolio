import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  caption,
}: {
  eyebrow?: string;
  title: string;
  caption?: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-16">
        {eyebrow && <div className="chip !bg-white mb-5">{eyebrow}</div>}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tightest text-ink-900 leading-[1] text-balance max-w-3xl">
            {title}
          </h2>
          {caption && <p className="text-muted max-w-sm">{caption}</p>}
        </div>
      </div>
    </Reveal>
  );
}
