import ProjectCoverCard from "../components/ProjectCoverCard";
import Seo from "../components/Seo";
import { completedProjects } from "../data/projectsCompleted";

function ProjectsPage() {
  return (
    <main className="bg-[#fafafa]">
      <Seo
        title="Completed Projects | Posture India"
        description="Explore completed Posture India furniture and interior projects for offices, institutions, retail spaces, and commercial clients."
        canonicalPath="/projects"
        image={completedProjects[0]?.media[0]?.src}
        imageAlt="Completed projects by Posture India"
        keywords={[
          "completed furniture projects Hyderabad",
          "office furniture installations Hyderabad",
          "commercial interior projects Hyderabad",
        ]}
      />

      <section className="border-b border-stone-200 bg-[#f5f0e8]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Our work
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-tight text-slate-950 sm:text-6xl">
            Completed projects, built around every space.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {completedProjects.map((project) => (
            <ProjectCoverCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectsPage;
