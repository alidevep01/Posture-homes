import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Globe2,
  PackageSearch,
  Ship,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import SectionReveal from "../components/SectionReveal";
import Seo from "../components/Seo";

const sourcingSteps = [
  {
    title: "Industry experience",
    description:
      "Over 70 years of industry experience, including 30 years specifically focused on importing from China and navigating Chinese manufacturing.",
    icon: PackageSearch,
  },
  {
    title: "Sourcing expertise",
    description:
      "Practical guidance through the full sourcing process, helping teams navigate challenges and keep project execution smooth.",
    icon: Globe2,
  },
  {
    title: "Quality assurance",
    description:
      "Factory vetting, complete compliance documentation, regular status updates, and on-site quality checks before shipment.",
    icon: BadgeCheck,
  },
  {
    title: "Service delivery",
    description:
      "Last-mile delivery, installation, damage resolution, and project management support designed to exceed expectations.",
    icon: Ship,
  },
] as const;

const efficiencyPoints = [
  "Streamlined processes refined over decades of industry experience.",
  "Technically advanced systems that support smoother operations.",
  "Punctual delivery that helps keep projects on schedule.",
  "Proven methods that bring efficiency and reliability to every project.",
] as const;

const sourcingGalleryExtensions = ["jpg", "jpeg", "png", "webp"] as const;
const maxSourcingGalleryImages = 200;
const galleryItemsPerPage = 18;

function checkImageExists(src: string) {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

async function discoverSourcingGalleryImages() {
  const files: string[] = [];

  for (let index = 1; index <= maxSourcingGalleryImages; index += 1) {
    const fileNumber = String(index).padStart(3, "0");
    let matchedFile: string | null = null;

    for (const extension of sourcingGalleryExtensions) {
      const candidate = `/sourcing-gallery/${fileNumber}.${extension}`;

      if (await checkImageExists(candidate)) {
        matchedFile = candidate;
        break;
      }
    }

    if (!matchedFile) {
      break;
    }

    files.push(matchedFile);
  }

  return files;
}

function SourcingPage() {
  const [sourcingGalleryFiles, setSourcingGalleryFiles] = useState<string[]>(
    [],
  );
  const [currentGalleryPage, setCurrentGalleryPage] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadGallery = async () => {
      const files = await discoverSourcingGalleryImages();

      if (!cancelled) {
        setSourcingGalleryFiles(files);
      }
    };

    void loadGallery();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(sourcingGalleryFiles.length / galleryItemsPerPage),
    );

    if (currentGalleryPage > totalPages) {
      setCurrentGalleryPage(totalPages);
    }
  }, [currentGalleryPage, sourcingGalleryFiles.length]);

  useEffect(() => {
    if (activeImageIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((currentIndex) => {
          if (currentIndex === null || sourcingGalleryFiles.length === 0) {
            return currentIndex;
          }

          return (
            (currentIndex - 1 + sourcingGalleryFiles.length) %
            sourcingGalleryFiles.length
          );
        });
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((currentIndex) => {
          if (currentIndex === null || sourcingGalleryFiles.length === 0) {
            return currentIndex;
          }

          return (currentIndex + 1) % sourcingGalleryFiles.length;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, sourcingGalleryFiles.length]);

  const totalGalleryPages = Math.max(
    1,
    Math.ceil(sourcingGalleryFiles.length / galleryItemsPerPage),
  );
  const galleryStartIndex = (currentGalleryPage - 1) * galleryItemsPerPage;
  const currentGalleryFiles = sourcingGalleryFiles.slice(
    galleryStartIndex,
    galleryStartIndex + galleryItemsPerPage,
  );
  const activeImageSrc =
    activeImageIndex === null ? null : sourcingGalleryFiles[activeImageIndex];

  return (
    <main className="bg-[#fafafa]">
      <Seo
        title="Sourcing from China | Posture India"
        description="Posture India offers furniture sourcing from China with factory vetting, quality checks, compliance support, shipment tracking, installation, and last-mile delivery."
        canonicalPath="/sourcing"
        image="/china-background.jpg"
        imageAlt="Furniture sourcing from China"
        keywords={[
          "import furniture from China India",
          "furniture sourcing China",
          "factory vetting",
          "shipment tracking",
        ]}
      />
      <section
        className="relative overflow-hidden border-b border-slate-200 bg-slate-950"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.56) 42%, rgba(15, 23, 42, 0.34) 100%), url('/china-background.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-200/90">
            Sourcing
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Premier Furniture sourcing solutions from China.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
            Complete sourcing for every interior need, from aluminum windows and
            bath fittings to furniture, kitchens, and wardrobes. Built for
            design teams that need clarity, reliability, and execution support.
          </p>
        </div>
      </section>

      <SectionReveal
        id="process"
        className="border-b border-slate-200 bg-[#fafafa]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Why partner with us
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Experience, sourcing depth, and quality control at every stage.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              The sourcing model combines long-standing industry knowledge with
              structured project support for Chinese imports and manufacturing.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sourcingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.25)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6efe4] text-slate-950">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl text-slate-950">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="support"
        className="border-b border-slate-200 bg-slate-50/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                Complete sourcing
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                One-stop Furniture sourcing for products, execution, and
                support.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                The sourcing scope extends across furniture, kitchens,
                wardrobes, aluminum windows, bath fittings, and other
                interior-led requirements that need centralized coordination.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Service delivery includes project management from selection to
                installation, budget-conscious solutions, last-mile delivery,
                installation support, and damage resolution.
              </p>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.25)]">
              <div className="flex items-center gap-3 text-slate-900">
                <Truck className="h-5 w-5" />
                <h3 className="text-xl font-semibold">
                  Bringing efficiency to every project
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {efficiencyPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="tel:+917815819394"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </SectionReveal>

      <section
        id="gallery"
        className="scroll-mt-28 border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ef_100%)]"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Gallery
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Browse the sourcing collection.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              A single curated gallery keeps the page cleaner while still
              showing the breadth of sourcing references available for client
              projects.
            </p>
          </header>

          <div className="mt-12 border-b border-stone-200 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                {sourcingGalleryFiles.length} images
              </p>
              <p className="text-sm text-slate-500">
                Page {currentGalleryPage} of {totalGalleryPages}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {currentGalleryFiles.map((file, pageIndex) => {
              const actualIndex = galleryStartIndex + pageIndex;

              return (
              <button
                key={file}
                type="button"
                onClick={() => setActiveImageIndex(actualIndex)}
                className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_24px_60px_-44px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-36px_rgba(15,23,42,0.3)]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#f7f4ee]">
                  <img
                    src={file}
                    alt="Furniture sourcing reference"
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              </button>
            )})}
          </div>

          {totalGalleryPages > 1 ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentGalleryPage((page) => Math.max(1, page - 1))
                }
                disabled={currentGalleryPage === 1}
                className="rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Previous
              </button>

              {Array.from({ length: totalGalleryPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentGalleryPage;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentGalleryPage(pageNumber)}
                    aria-current={isActive ? "page" : undefined}
                    className={`h-11 min-w-11 rounded-full px-4 text-sm font-semibold transition duration-300 ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "border border-stone-200 bg-white text-slate-700 hover:bg-stone-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  setCurrentGalleryPage((page) =>
                    Math.min(totalGalleryPages, page + 1),
                  )
                }
                disabled={currentGalleryPage === totalGalleryPages}
                className="rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Next
              </button>
            </div>
          ) : null}

          {activeImageSrc ? (
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/88 px-4 py-6"
              role="dialog"
              aria-modal="true"
              aria-label="Gallery image viewer"
              onClick={() => setActiveImageIndex(null)}
            >
              <button
                type="button"
                aria-label="Close image viewer"
                onClick={() => setActiveImageIndex(null)}
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition duration-300 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImageIndex((currentIndex) => {
                    if (currentIndex === null || sourcingGalleryFiles.length === 0) {
                      return currentIndex;
                    }

                    return (
                      (currentIndex - 1 + sourcingGalleryFiles.length) %
                      sourcingGalleryFiles.length
                    );
                  });
                }}
                className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition duration-300 hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div
                className="relative w-full max-w-6xl"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={activeImageSrc}
                  alt="Furniture sourcing reference"
                  className="max-h-[84vh] w-full rounded-[1.5rem] object-contain"
                />
                <p className="mt-4 text-center text-sm text-white/72">
                  Image {(activeImageIndex ?? 0) + 1} of {sourcingGalleryFiles.length}
                </p>
              </div>

              <button
                type="button"
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveImageIndex((currentIndex) => {
                    if (currentIndex === null || sourcingGalleryFiles.length === 0) {
                      return currentIndex;
                    }

                    return (currentIndex + 1) % sourcingGalleryFiles.length;
                  });
                }}
                className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition duration-300 hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <SectionReveal id="contact" className="bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Contact us
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
              Transform your designs into reality with confidence.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Share your sourcing requirement with our team and move forward
              with the reliability of seasoned industry experts focused on
              delivering exceptional results.
            </p>
          </header>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </SectionReveal>
    </main>
  );
}

export default SourcingPage;
