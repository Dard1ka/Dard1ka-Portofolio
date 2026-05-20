"use client";
import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { ArrowUpRight, GithubIcon, YouTubeIcon, GlobeIcon } from "./Icons";

const iconFor = (kind: string) =>
  kind === "github" ? GithubIcon : kind === "youtube" ? YouTubeIcon : GlobeIcon;

export function Archive() {
  return (
    <section id="archive" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader eyebrow="03 · Archive" title="More work, indexed." caption="A simple table of everything I've shipped." />
        <Reveal>
          <div className="rounded-3xl2 border hairline bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-cloud">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    <th className="py-4 px-6 font-normal">Year</th>
                    <th className="py-4 px-6 font-normal">Project</th>
                    <th className="py-4 px-6 font-normal hidden md:table-cell">Built with</th>
                    <th className="py-4 px-6 font-normal">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} className="border-t hairline group hover:bg-accent-50/60 transition-colors">
                      <td className="py-5 px-6 font-mono text-sm text-accent-700 align-top">{p.year}</td>
                      <td className="py-5 px-6 align-top">
                        <div className="row-shift">
                          <div className="text-ink-900 font-medium group-hover:text-accent-700 transition-colors">{p.name}</div>
                          <div className="text-muted text-sm hidden md:block mt-1">{p.tagline}</div>
                        </div>
                      </td>
                      <td className="py-5 px-6 align-top hidden md:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {p.stack.map((s) => (
                            <span key={s} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-5 px-6 align-top">
                        <div className="flex items-center gap-3 text-ink-700">
                          {p.links.map((l) => {
                            const Icon = iconFor(l.kind);
                            return (
                              <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${p.name} ${l.label}`}
                                className="hover:text-accent-700 transition-colors inline-flex items-center gap-1"
                              >
                                <Icon className="h-4 w-4" />
                                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
