import { useMemo } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Quote,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  type BlogPost,
} from "../data/blogPosts";

const siteUrl = "https://postureindia.in";

function formatPublishedDate(datePublished: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(datePublished));
}

function renderParagraphs(paragraphs: string[]) {
  return paragraphs.map((paragraph, index) => (
    <p
      key={`${index}-${paragraph}`}
      className="text-base leading-8 text-slate-600"
    >
      {paragraph}
    </p>
  ));
}

function BlogDetailPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const relatedPosts = useMemo(() => {
    if (!post) {
      return [];
    }

    return getRelatedBlogPosts(post.slug, 3);
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const tocItems = [
    { id: "introduction", label: "Introduction" },
    ...post.sections.map((section) => ({
      id: section.id,
      label: section.heading,
    })),
    { id: "internal-links", label: "Related pages" },
    { id: "blog-cta", label: "Contact Posture India" },
    { id: "blog-quote-form", label: "Request a quote" },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      image: [`${siteUrl}${post.heroImage}`],
      datePublished: post.datePublished,
      dateModified: post.datePublished,
      author: {
        "@type": "Organization",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Posture India",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },
      mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `${siteUrl}/blog/${post.slug}`,
        },
      ],
    },
  ];

  return (
    <main className="bg-[#fafafa]">
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
        image={post.heroImage}
        imageAlt={post.imageAlt}
        type="article"
        author={post.author}
        keywords={post.keywords}
        publishedTime={post.datePublished}
        modifiedTime={post.datePublished}
        jsonLd={jsonLd}
      />

      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ef_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
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
                  {formatPublishedDate(post.datePublished)}
                </span>
              </div>

              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="tel:+917815819394"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:border-slate-300 hover:text-slate-950"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.22)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  At a glance
                </p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <p>Category: {post.category}</p>
                  <p>Read time: {post.readTime}</p>
                  <p>Author: {post.author}</p>
                </div>
                <a
                  href="#blog-quote-form"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
                >
                  Request a quote
                  <Quote className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_60px_-44px_rgba(15,23,42,0.24)]">
            <img
              src={post.heroImage}
              alt={post.imageAlt}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="min-w-0">
              <section id="introduction" className="scroll-mt-28">
                <h2 className="text-2xl font-semibold text-slate-950">
                  Introduction
                </h2>
                <div className="mt-5 space-y-4 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
                  {renderParagraphs(post.introduction)}
                </div>
              </section>

              <div className="mt-10 space-y-10">
                {post.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="text-2xl font-semibold leading-tight text-slate-950">
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-4">
                      {renderParagraphs(section.paragraphs)}
                    </div>

                    {section.bullets ? (
                      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.subsections ? (
                      <div className="mt-6 space-y-6">
                        {section.subsections.map((subsection) => (
                          <div
                            key={subsection.id}
                            className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm"
                          >
                            <h3 className="text-xl font-semibold text-slate-950">
                              {subsection.heading}
                            </h3>
                            <div className="mt-4 space-y-4">
                              {renderParagraphs(subsection.paragraphs)}
                            </div>
                            {subsection.bullets ? (
                              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                                {subsection.bullets.map((bullet) => (
                                  <li key={bullet} className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>

              <section
                id="internal-links"
                className="mt-12 scroll-mt-28 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Quote className="h-5 w-5 text-amber-700" />
                  <h2 className="text-2xl font-semibold text-slate-950">
                    Related pages
                  </h2>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {post.internalLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="rounded-[1.5rem] border border-stone-200 bg-[#fafafa] p-5 transition duration-300 hover:border-slate-300 hover:bg-white"
                    >
                      <h3 className="text-lg font-semibold text-slate-950">
                        {link.label}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>

              <section
                id="blog-cta"
                className="mt-12 scroll-mt-28 rounded-[2rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.32)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
                  {post.callToAction.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight">
                  {post.callToAction.heading}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
                  {post.callToAction.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#blog-quote-form"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-amber-50"
                  >
                    Request a quote
                    <Quote className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:+917815819394"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/10"
                  >
                    Call Posture
                  </a>
                </div>
              </section>

              <section id="blog-quote-form" className="mt-12 scroll-mt-28">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                    Request a quote
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
                    Request pricing or project support.
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Use the form below if you want a quote for home furniture,
                    office furniture, or a sourcing requirement that needs
                    better coordination.
                  </p>
                </div>

                <div className="mt-8">
                  <ContactForm
                    title="Request a quote from Posture India"
                    description="Share the product list, quantity, timeline, and city so we can respond with the right next step."
                    submitLabel="Get Quote"
                    defaultMessage={`I want help with the ideas from "${post.title}".`}
                  />
                </div>
              </section>

              {relatedPosts.length > 0 ? (
                <section className="mt-12 border-t border-slate-200 pt-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                    More articles
                  </p>
                  <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {relatedPosts.map((relatedPost: BlogPost) => (
                      <Link
                        key={relatedPost.slug}
                        to={`/blog/${relatedPost.slug}`}
                        className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-40px_rgba(15,23,42,0.24)]"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                          <img
                            src={relatedPost.featuredImage}
                            alt={relatedPost.imageAlt}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {relatedPost.category}
                          </p>
                          <h3 className="mt-3 text-xl leading-tight text-slate-950">
                            {relatedPost.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </article>

            <aside className="h-fit space-y-6 lg:sticky lg:top-24">
              <nav className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.22)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Table of contents
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="transition duration-300 hover:text-slate-950"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogDetailPage;
