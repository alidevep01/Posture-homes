# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Posture Homes / Posture India** — a furniture sourcing business website based in Hyderabad, India. The site showcases home and office furniture, a China-sourcing service, a blog, and contact capabilities. It is a pure client-side SPA with no backend.

## Commands

```bash
npm run dev        # Start Vite dev server (HMR)
npm run build      # TypeScript check + Vite production build → dist/
npm run lint       # ESLint across the whole project
npm run preview    # Serve the production build locally
```

There are no tests in this project.

## Tech Stack

- **React 19** + **Vite 8** (not Next.js)
- **React Router 7** — client-side routing via `BrowserRouter`
- **TypeScript 5.9** — strict mode, `noUnusedLocals`, `noUnusedParameters` enforced
- **Tailwind CSS 4** — utility-first via `@tailwindcss/vite` plugin
- **Framer Motion 12** — animations and page transitions
- **React Hook Form 7** — contact form state and validation
- **EmailJS** — client-side email delivery (no backend required)
- **Lucide React** + **React Icons** — icons
- **Vercel** — deployment target (`vercel.json` has a catch-all SPA rewrite rule)

## Architecture

### Routing

All routes are defined in [src/App.tsx](src/App.tsx). Every page is **lazy-loaded** with `React.lazy` + `Suspense`. Routes:

| Path | Component |
|---|---|
| `/` | `HomePage` |
| `/about` | `AboutPage` |
| `/sourcing` | `SourcingPage` |
| `/products/:categorySlug` | `ProductCategoryPage` |
| `/blog` | `BlogListingPage` |
| `/blog/:slug` | `BlogDetailPage` |
| `/legal` | `LegalPage` |

`categorySlug` is either `home-furniture` or `office-furniture`.

### Folder Conventions

- `src/pages/` — full route-level page components
- `src/sections/` — large reusable page sections (Hero, CategoryGrid, Contact, etc.) composed inside pages
- `src/components/` — smaller reusable UI components (Navbar, Footer, ContactForm, Seo, etc.)
- `src/data/` — static blog post content as TypeScript objects
- `src/utils/` — shared constants and helpers (product categories, contact info, email/WhatsApp utils)
- `src/hooks/` — custom React hooks
- `public/` — all static images, served directly as `/filename.jpg`

### Data Layer

There is **no CMS and no API**. All content is hardcoded TypeScript:

- **Blog posts**: defined in `src/data/blogPosts*.ts` files, each using the `createBlogPost()` factory from [src/data/blogSchema.ts](src/data/blogSchema.ts). The master list in [src/data/blogPosts.ts](src/data/blogPosts.ts) aggregates them. Always use `createBlogPost()` — it injects the shared `author` and `callToAction` fields automatically.
- **Product categories**: defined in [src/utils/productCategories.ts](src/utils/productCategories.ts) as a `const` array. Adding a new category requires adding a slug here and ensuring matching images exist in `public/`.
- **Contact info**: phone numbers live in [src/utils/contact.ts](src/utils/contact.ts). WhatsApp URL generation is in [src/utils/whatsapp.ts](src/utils/whatsapp.ts).

### State Management

No global state library. All state is local `useState` inside components. There is no React Context used for data.

### Images

All images live in `/public` and are referenced as plain string paths (e.g., `/home-furniture-hero.jpg`, `/blog-images/residential1-blog.jpg`). There is no image optimization layer — reference them directly.

### Animations

Use the `<SectionReveal>` wrapper ([src/components/SectionReveal.tsx](src/components/SectionReveal.tsx)) to add fade-in-on-scroll behavior to any section. Direct Framer Motion usage (`motion.div`, `AnimatePresence`) is used for interactive elements like the Navbar mobile menu and buttons.

### SEO

The `<Seo>` component ([src/components/Seo.tsx](src/components/Seo.tsx)) handles client-side meta tags (`title`, `og:*`, `twitter:*`, `canonical`, JSON-LD structured data). Every page and blog post should render a `<Seo>` instance with appropriate props.

### EmailJS

Contact form emails are sent client-side via EmailJS. Credentials are read from environment variables. A `.env` file (not committed) is required locally:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Coding Conventions

- **TypeScript strict** — no `any`, no unused variables or parameters. The build (`tsc -b`) will fail otherwise.
- **Tailwind only** — no inline `style` props or CSS modules. Use Tailwind utility classes exclusively.
- **Color palette** — base background is `bg-[#fafafa]`, accent colors use `slate`, `stone`, and `amber` scales. Warm tones (`#f7f2ea`, stone-100, amber-100) are used for section backgrounds.
- **No global state** — keep state local to the component that owns it.
- **Blog schema** — always use `createBlogPost()` from `blogSchema.ts` when adding blog posts; never construct the object manually.
- **Content changes** — updating phone numbers, WhatsApp numbers, or email targets means editing `src/utils/contact.ts` or `src/utils/whatsapp.ts`, not hunting through JSX.
- **Ngrok dev tunneling** — already configured in `vite.config.ts`; no changes needed.
