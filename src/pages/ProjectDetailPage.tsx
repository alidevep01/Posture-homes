import { LuArrowLeft as ArrowLeft } from "react-icons/lu";
import { Link, Navigate, useParams } from "react-router";
import ProjectMediaGrid from "../components/ProjectMediaGrid";
import Seo from "../components/Seo";
import { completedProjects } from "../data/projectsCompleted";

function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const project = completedProjects.find((item) => item.slug === projectSlug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const coverImage = project.media.find((item) => item.type === "image");

  return (
    <main className="bg-[#fafafa]">
      <Seo
        title={`${project.name} Project | Posture India`}
        description={`View furniture and interior installation photos from the ${project.name} project completed by Posture India.`}
        canonicalPath={`/projects/${project.slug}`}
        image={coverImage?.src}
        imageAlt={`${project.name} completed project by Posture India`}
      />

      <section className="border-b border-stone-200 bg-[#f5f0e8]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 transition hover:text-amber-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Completed project
          </p>
          <h1 className="mt-4 text-4xl leading-tight text-slate-950 sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            A closer look at the furniture, finishes, and layouts delivered for
            this space.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {project.media.length} site photos and videos
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <ProjectMediaGrid media={project.media} />
      </section>
    </main>
  );
}

export default ProjectDetailPage;
