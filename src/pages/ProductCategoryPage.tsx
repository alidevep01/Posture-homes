import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router";
import {
  BadgeCheck,
  PackageCheck,
  Sofa,
  Truck,
} from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import ProcessSection from "../sections/ProcessSection";
import ProjectsSection from "../sections/ProjectsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import { productCategories } from "../utils/productCategories";
import { officeClienteleLogos, clienteleLogoDisplay } from "../data/clientele";
import { getCategories } from "../data/productsData";

type ProductCategory = (typeof productCategories)[number];
type ProductCategorySlug = ProductCategory["slug"];

const categoryHeroImages: Record<ProductCategorySlug, string> = {
  "home-furniture": "/home-background-1.jpg",
  "office-furniture": "/office-background-1.jpg",
};


function CategoryProductsSection({
  title = "Products",
  description,
  category,
}: {
  title?: string;
  description?: string;
  category: (typeof productCategories)[number];
}) {
  return (
    <SectionReveal
      id="products"
      className="border-b border-slate-200 bg-[#fafafa]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            {title}
          </p>
          {description ? (
            <p className="mt-4 text-base leading-8 text-slate-600">
              {description}
            </p>
          ) : null}
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {category.highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div
                role="img"
                aria-label={`${highlight.title} preview placeholder`}
                className={`aspect-[4/3] rounded-[1.25rem] bg-gradient-to-br ${highlight.palette}`}
              />
              <h2 className="mt-6 text-xl font-semibold text-slate-900">
                {highlight.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {highlight.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function encodeImagePath(path: string): string {
  return encodeURI(path);
}

function CategoryGrid({
  section,
  basePath,
  title,
  subtitle,
}: {
  section: "home" | "office";
  basePath: string;
  title: string;
  subtitle: string;
}) {
  const categories = getCategories(section);
  return (
    <SectionReveal id="products" className="border-b border-slate-200 bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Products
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{subtitle}</p>
        </header>

        <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`${basePath}/${cat.slug}`}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white">
                {cat.coverImage ? (
                  <img
                    src={encodeImagePath(cat.coverImage)}
                    alt={cat.label}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300 text-sm">
                    {cat.label}
                  </div>
                )}
              </div>
              <div className="border-t border-stone-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-900 truncate">{cat.label}</h3>
                <p className="mt-0.5 text-xs text-slate-500">{cat.items.length} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function OfficeProductsSection() {
  return (
    <CategoryGrid
      section="office"
      basePath="/products/office-furniture"
      title="Office furniture categories for productive and modern workspaces."
      subtitle="From executive rooms to collaborative work areas, browse all the office furniture categories we carry."
    />
  );
}

function HomeProductsSection() {
  return (
    <CategoryGrid
      section="home"
      basePath="/products/home-furniture"
      title="Home furniture categories for every room and style."
      subtitle="From living rooms to dining spaces, browse all the home furniture categories we carry."
    />
  );
}

function ClienteleSection() {
  return (
    <SectionReveal
      id="clientele"
      className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf7_100%)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Clientele
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
            Brands and institutions that reflect the scale of office projects we
            support.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            A snapshot of the companies and organizations represented in our
            office furniture clientele.
          </p>
        </header>

        <div className="mt-12 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.22)] sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {officeClienteleLogos.map((logo) =>
              (() => {
                const logoDisplay = clienteleLogoDisplay[logo];
                const cardClassName = [
                  "flex min-h-28 items-center justify-center rounded-[1.5rem] border p-5 shadow-sm transition duration-300 hover:-translate-y-0.5",
                  logoDisplay?.cardClassName ?? "border-stone-200 bg-[#fcfbf8]",
                ].join(" ");
                const imageClassName = [
                  "h-auto w-auto max-w-full object-contain drop-shadow-[0_2px_6px_rgba(15,23,42,0.08)]",
                  logoDisplay?.imageClassName ?? "max-h-14",
                ].join(" ");
                const alt =
                  logoDisplay?.label ??
                  logo.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");

                return (
                  <div key={logo} className={cardClassName}>
                    <img
                      src={`/clientele/${logo}`}
                      alt={alt}
                      loading="lazy"
                      className={imageClassName}
                    />
                  </div>
                );
              })(),
            )}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function CategoryCoverageSection({
  category,
}: {
  category: (typeof productCategories)[number];
}) {
  return (
    <SectionReveal className="border-b border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          What we cover in this category
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {category.coverage.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-medium text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function DeliverySection({
  category,
}: {
  category: (typeof productCategories)[number];
}) {
  return (
    <SectionReveal className="border-b border-slate-200 bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          How we deliver
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <Sofa className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Category expertise
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We shortlist pieces and suppliers specific to{" "}
              {category.label.toLowerCase()} requirements.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <BadgeCheck className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Verified factories
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We work only with factories that match your quality and finishing
              expectations.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <PackageCheck className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Quality checks
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Every order is reviewed before dispatch to reduce quality
              surprises.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <Truck className="h-6 w-6 text-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Delivery support
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              We coordinate sourcing, shipping, and delivery updates through to
              completion.
            </p>
          </article>
        </div>
      </div>
    </SectionReveal>
  );
}

function ContactFormSection({ categoryLabel }: { categoryLabel: string }) {
  return (
    <SectionReveal id="contact" className="bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Contact us
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-slate-950 sm:text-4xl">
            Send us your {categoryLabel.toLowerCase()} requirement.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Share your quantity, project scope, and preferred product
            categories. Our team will get back to you with the next steps.
          </p>
        </header>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </SectionReveal>
  );
}

function CategoryHeroSection({ category }: { category: ProductCategory }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-900 bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${categoryHeroImages[category.slug]})` }}
      />
      <div className="absolute inset-0 bg-slate-950/35" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.88)_0%,rgba(15,23,42,0.58)_45%,rgba(15,23,42,0.2)_100%)]" />

      <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-center px-6 py-16 sm:min-h-[460px] lg:py-20">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-200">
          {category.label}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {category.pageTitle}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
          {category.pageDescription}
        </p>
      </div>
    </section>
  );
}

function ProductCategoryPage() {
  const { categorySlug } = useParams();

  const category = useMemo(
    () => productCategories.find((entry) => entry.slug === categorySlug),
    [categorySlug],
  );

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const isHomeFurniturePage = category.slug === "home-furniture";
  const isOfficeFurniturePage = category.slug === "office-furniture";

  return (
    <main className="bg-[#fafafa]">
      <Seo
        title={`${category.pageTitle} | Posture India`}
        description={category.pageDescription}
        canonicalPath={`/products/${category.slug}`}
        image={category.slug === "office-furniture" ? "/office-furniture.jpg" : "/home-furniture-hero.jpg"}
        imageAlt={category.label}
        keywords={[
          category.label,
          "furniture in Hyderabad",
          "custom furniture India",
          "Posture India",
        ]}
      />
      <CategoryHeroSection category={category} />

      {isHomeFurniturePage ? (
        <>
          <HomeProductsSection />
          <ProjectsSection />
          <ProcessSection />
          <TestimonialsSection reviewMode="home" />
          <ContactFormSection categoryLabel={category.label} />
        </>
      ) : isOfficeFurniturePage ? (
        <>
          <OfficeProductsSection />
          <ProcessSection />
          <ClienteleSection />
          <TestimonialsSection reviewMode="office" />
          <ContactFormSection categoryLabel={category.label} />
        </>
      ) : (
        <>
          <CategoryProductsSection category={category} />
          <CategoryCoverageSection category={category} />
          <DeliverySection category={category} />
        </>
      )}
    </main>
  );
}

export default ProductCategoryPage;
