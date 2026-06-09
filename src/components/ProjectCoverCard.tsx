import { LuArrowUpRight as ArrowUpRight } from "react-icons/lu";
import { Link } from "react-router";
import type { CompletedProject } from "../data/projectsCompleted";
import ImageWithLoader from "./ImageWithLoader";

type ProjectCoverCardProps = {
  project: CompletedProject;
  className?: string;
  imageWrapperClassName?: string;
};

function ProjectCoverCard({
  project,
  className,
  imageWrapperClassName = "aspect-[4/3]",
}: ProjectCoverCardProps) {
  const coverImage = project.media.find((item) => item.type === "image");

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={[
        "group relative block overflow-hidden rounded-[1.35rem] bg-slate-900 shadow-[0_20px_46px_-30px_rgba(15,23,42,0.55)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {coverImage ? (
        <ImageWithLoader
          src={coverImage.src}
          alt={`${project.name} completed project`}
          loading="lazy"
          decoding="async"
          wrapperClassName={imageWrapperClassName}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <div>
          <h2 className="text-xl leading-tight">{project.name}</h2>
          <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            {project.media.length} site captures
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-amber-600">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default ProjectCoverCard;
