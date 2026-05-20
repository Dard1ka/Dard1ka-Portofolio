import { projects } from "@/data/projects";
import { ProjectShowcase } from "./ProjectShowcase";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader title="Featured projects." />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectShowcase key={p.id} project={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
