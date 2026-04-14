import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CalendarDays, Clock3, Search } from "lucide-react";
import Seo from "../components/Seo";
import {
  blogCategories,
  blogPosts,
  type BlogCategory,
} from "../data/blogPosts";

const postsPerPage = 6;

function getPostSummaryDate(datePublished: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(datePublished));
}

function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | BlogCategory>(
    "All",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const categoryMatches =
        activeCategory === "All" || post.category === activeCategory;

      const searchMatches =
        normalizedSearch.length === 0 ||
        [
          post.title,
          post.excerpt,
          post.category,
          post.keywords.join(" "),
          post.metaTitle,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return categoryMatches && searchMatches;
    });
  }, [activeCategory, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPosts = filteredPosts.slice(
    (safeCurrentPage - 1) * postsPerPage,
    safeCurrentPage * postsPerPage,
  );

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  return (
    <main className="bg-[#fafafa]">
      <Seo
        title="Posture India Blog | Furniture in Hyderabad, Office Furniture Suppliers India, Custom Furniture India"
        description="Read practical guides on furniture in Hyderabad, office furniture suppliers India, custom furniture India, and import furniture from China India."
        canonicalPath="/blog"
        image="/home-furniture-hero.jpg"
        imageAlt="Posture India blog and furniture guides"
        keywords={[
          "furniture in Hyderabad",
          "office furniture suppliers India",
          "custom furniture India",
          "import furniture from China India",
        ]}
      />

      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ef_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Blog
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Furniture guidance for homeowners, office teams, and sourcing
              projects.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Browse {blogPosts.length} practical guides on furnishing homes,
              setting up offices, comparing custom options, and sourcing from
              China. Written to help you compare options, plan the purchase,
              and move forward with confidence.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                In this journal
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-950">
                {blogPosts.length} in-depth guides for buyers, designers,
                offices, and sourcing-led projects.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                Categories
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-950">
                Residential, Office, China Sourcing, and Local SEO.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                What you will find
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-950">
                Budget ranges, practical examples, planning checklists, and
                sourcing guidance across India.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search posts</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search homes, offices, sourcing, or Hyderabad buying guides"
                className="w-full rounded-[1rem] border border-slate-200 bg-[#fafafa] py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {(["All", ...blogCategories] as const).map((category) => {
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveCategory(category);
                      setCurrentPage(1);
                    }}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                      isActive
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Showing {filteredPosts.length} article
            {filteredPosts.length === 1 ? "" : "s"}
          </p>
        </div>
      </section>

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-[0_24px_60px_-44px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-36px_rgba(15,23,42,0.3)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={post.featuredImage}
                        alt={post.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/10 to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-800">
                          {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {getPostSummaryDate(post.datePublished)}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl leading-tight text-slate-950">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {post.excerpt}
                      </p>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition duration-300 hover:text-amber-700"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 ? (
                <nav
                  aria-label="Blog pagination"
                  className="mt-10 flex flex-wrap items-center justify-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={safeCurrentPage === 1}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setCurrentPage(pageNumber)}
                      aria-current={
                        pageNumber === safeCurrentPage ? "page" : undefined
                      }
                      className={[
                        "h-10 min-w-10 rounded-full border px-3 text-sm font-semibold transition",
                        pageNumber === safeCurrentPage
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950",
                      ].join(" ")}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={safeCurrentPage === totalPages}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              ) : null}
            </>
          ) : (
            <div className="rounded-[2rem] border border-stone-200 bg-white p-10 text-center">
              <h2 className="text-2xl font-semibold text-slate-950">
                No articles match your search.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Try a different keyword or switch to another category.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default BlogListingPage;
