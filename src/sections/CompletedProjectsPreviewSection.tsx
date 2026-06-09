import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  LuArrowRight as ArrowRight,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuPlay as Play,
} from "react-icons/lu";
import { Link } from "react-router";
import { completedProjects } from "../data/projectsCompleted";
import ImageWithLoader from "../components/ImageWithLoader";
import type {
  CompletedProject,
  ProjectMedia,
} from "../data/projectsCompleted";

const projectsPerSlide = 3;
const carouselIntervalMs = 5000;

type ProjectPreviewCardProps = {
  project: CompletedProject;
  media: ProjectMedia;
  isPlaying: boolean;
  onPlay: () => void;
};

function ProjectPreviewCard({
  project,
  media,
  isPlaying,
  onPlay,
}: ProjectPreviewCardProps) {
  return (
    <article className="group relative h-64 min-w-0 overflow-hidden rounded-[1.35rem] bg-slate-900 shadow-[0_20px_46px_-30px_rgba(15,23,42,0.55)] sm:h-72 lg:h-[22rem]">
      {media.type === "video" && isPlaying ? (
        <video
          src={media.src}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      ) : media.type === "video" ? (
        <>
          <video
            src={media.src}
            muted
            preload="metadata"
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px]" />
          <button
            type="button"
            aria-label={`Play ${project.name} project video`}
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-xl transition group-hover:scale-105">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
          </button>
        </>
      ) : (
        <ImageWithLoader
          src={media.src}
          alt={`${project.name} completed project`}
          loading="lazy"
          decoding="async"
          wrapperClassName="h-full"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      )}

      {!isPlaying ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-transparent" />
          <Link
            to={`/projects/${project.slug}`}
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"
          >
            <div>
              <h3 className="text-xl leading-tight">{project.name}</h3>
              <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                View project
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </>
      ) : null}
    </article>
  );
}

function CompletedProjectsPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const previewProjects = useMemo(
    () =>
      completedProjects.map((project) => ({
        project,
        media: project.media[0],
      })),
    [],
  );
  const slides = useMemo(() => {
    const projectSlides = [];

    for (let index = 0; index < previewProjects.length; index += projectsPerSlide) {
      projectSlides.push(previewProjects.slice(index, index + projectsPerSlide));
    }

    return projectSlides;
  }, [previewProjects]);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused || playingVideo) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
      );
    }, carouselIntervalMs);

    return () => window.clearInterval(timer);
  }, [isPaused, playingVideo, slides.length]);

  const showPreviousProject = () => {
    setPlayingVideo(null);
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );
  };

  const showNextProject = () => {
    setPlayingVideo(null);
    setActiveIndex((currentIndex) =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section className="border-b border-stone-200 bg-[#f5f0e8]">
      <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Completed projects
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Spaces delivered for clients across industries.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              A preview of completed installations, from collaborative
              workplaces to tailored commercial interiors.
            </p>
          </header>

          <Link
            to="/projects"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 sm:self-auto"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div
          className="mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid items-center gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] lg:grid-cols-[4rem_minmax(0,1fr)_4rem]">
            <button
              type="button"
              aria-label="Show previous project"
              onClick={showPreviousProject}
              className="order-2 flex h-11 w-11 items-center justify-center justify-self-start rounded-full border border-stone-200 bg-white text-slate-900 shadow-md transition hover:border-amber-600 hover:text-amber-700 md:order-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -36 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="order-1 grid min-w-0 gap-5 sm:grid-cols-3 lg:gap-6 md:order-none"
              >
                {activeSlide.map(({ project, media }) => (
                  <ProjectPreviewCard
                    key={project.slug}
                    project={project}
                    media={media}
                    isPlaying={playingVideo === media.src}
                    onPlay={() => {
                      setPlayingVideo(media.src);
                      setIsPaused(true);
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              aria-label="Show next project"
              onClick={showNextProject}
              className="order-3 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-stone-200 bg-white text-slate-900 shadow-md transition hover:border-amber-600 hover:text-amber-700 md:order-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            aria-label="Choose featured project"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show project slide ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => {
                  setPlayingVideo(null);
                  setActiveIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-amber-700"
                    : "w-2.5 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompletedProjectsPreviewSection;
