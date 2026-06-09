import { useState } from "react";
import { LuPlay as Play } from "react-icons/lu";
import ImageWithLoader from "./ImageWithLoader";
import type { ProjectMedia } from "../data/projectsCompleted";

type ProjectMediaGridProps = {
  media: ProjectMedia[];
  limit?: number;
};

function ProjectMediaGrid({ media, limit }: ProjectMediaGridProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const visibleMedia = limit ? media.slice(0, limit) : media;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleMedia.map((item) => (
        <div
          key={item.src}
          className="group relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-stone-100 shadow-[0_18px_44px_-32px_rgba(15,23,42,0.45)]"
        >
          {item.type === "video" && activeVideo === item.src ? (
            <video
              src={item.src}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : item.type === "video" ? (
            <button
              type="button"
              aria-label="Play project video"
              onClick={() => setActiveVideo(item.src)}
              className="relative block h-full w-full"
            >
              <video
                src={item.src}
                muted
                preload="metadata"
                playsInline
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/35 backdrop-blur-[3px] transition group-hover:bg-slate-950/45">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-xl transition group-hover:scale-105">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
                <span className="rounded-full bg-slate-950/45 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                  Play video
                </span>
              </span>
            </button>
          ) : (
            <ImageWithLoader
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              wrapperClassName="h-full"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectMediaGrid;
