import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, "..");
const projectsDirectory = path.join(rootDirectory, "public", "projects-completed");
const outputFile = path.join(rootDirectory, "src", "data", "projectsCompleted.json");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const videoExtensions = new Set([".mp4", ".webm", ".mov"]);

function formatClientName(slug) {
  const preferredNames = {
    apple: "Apple",
    cbit: "CBIT",
    "dev-x-coworking": "DevX Coworking",
    "eb1a-experts": "EB1A Experts",
    "eka-one": "EKA One",
    "fitness-9-gym": "Fitness 9 Gym",
    inspiredge: "Inspire Edge",
    "invoice-cloud": "Invoice Cloud",
    "jito-hyderabad": "JITO Hyderabad",
    "kapil-business-center": "Kapil Business Center",
    "kothari-group": "Kothari Group",
    "manika-exports": "Manika Exports",
    oremus: "Oremus",
    "samasrti-internatinoal-school": "Samashti International School",
    "vinati-jewellers": "Vinati Jewellers",
  };

  return (
    preferredNames[slug] ??
    slug
      .split("-")
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(" ")
  );
}

const clientDirectories = (await readdir(projectsDirectory, {
  withFileTypes: true,
}))
  .filter((entry) => entry.isDirectory())
  .sort((left, right) => left.name.localeCompare(right.name));

const projects = [];

for (const directory of clientDirectories) {
  const media = (await readdir(path.join(projectsDirectory, directory.name), {
    withFileTypes: true,
  }))
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const extension = path.extname(entry.name).toLowerCase();
      const type = imageExtensions.has(extension)
        ? "image"
        : videoExtensions.has(extension)
          ? "video"
          : null;

      if (!type) {
        return null;
      }

      return {
        src: `/projects-completed/${directory.name}/${entry.name}`,
        type,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.src.localeCompare(right.src, undefined, {
      numeric: true,
    }));

  if (media.length > 0) {
    projects.push({
      slug: directory.name,
      name: formatClientName(directory.name),
      media,
    });
  }
}

await writeFile(outputFile, `${JSON.stringify(projects, null, 2)}\n`);
console.log(`Generated ${projects.length} projects in ${outputFile}`);
