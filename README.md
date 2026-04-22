# Posture India — Website

Marketing and portfolio website for Posture India, a furniture sourcing company based in Hyderabad. Showcases home furniture, office furniture, China sourcing services, and a blog.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Forms | React Hook Form + EmailJS |
| Deployment | Vercel |

## Project Structure

```
src/
├── components/     # Shared UI (Navbar, Footer, ErrorBoundary, Seo, …)
├── pages/          # Route-level components (lazy-loaded)
├── sections/       # Reusable page sections (Hero, About, Contact, …)
├── data/           # Content and configuration
│   ├── json/       # Blog post content as JSON (edit here to update posts)
│   ├── clientele.ts        # Office client logos + display config
│   ├── blogPosts.ts        # Aggregator + filter/sort logic
│   └── blogSchema.ts       # TypeScript types for blog content
├── utils/          # Constants (productCategories, navigation, contact, …)
└── hooks/          # Custom hooks (useCurrentYear)
public/
├── clientele/      # Client logo images
├── blog-images/    # Blog hero images
└── products/       # Product category images
```

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_WHATSAPP_PHONE=
VITE_WHATSAPP_MESSAGE=
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/products/home-furniture` | Home Furniture |
| `/products/office-furniture` | Office Furniture |
| `/sourcing` | China Sourcing |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog post |
| `/about` | About us |
| `/legal` | Terms & Privacy |

## Updating Blog Content

Blog posts live in `src/data/json/`. Each file is a JSON array of post objects. To add or edit a post:

1. Open the relevant JSON file (`blogPostsResidential.json`, `blogPostsOffice.json`, `blogPostsChinaSourcing.json`, or `blogPostsLocalSeo.json`)
2. Add or edit a post object — the required fields are defined in `src/data/blogSchema.ts`
3. To make a post appear on the site, add its `slug` to the `selectedBlogSlugs` set in `src/data/blogPosts.ts`

## Updating the Clientele Grid

The office clientele logos and their display config live in `src/data/clientele.ts`. To add a new client:

1. Drop the logo image into `public/clientele/`
2. Add the filename to the `officeClienteleLogos` array
3. Optionally add display overrides (label, card style, image size) to `clienteleLogoDisplay`

## Build & Deploy

```bash
npm run build   # outputs to dist/
```

Deployed automatically to Vercel on push to `main`. The `vercel.json` handles SPA routing rewrites.
