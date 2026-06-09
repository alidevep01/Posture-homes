import projectsCompleted from "./projectsCompleted.json";

export type ProjectMedia = {
  src: string;
  type: "image" | "video";
};

export type CompletedProject = {
  slug: string;
  name: string;
  media: ProjectMedia[];
};

export const completedProjects = projectsCompleted as CompletedProject[];
