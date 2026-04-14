export type BlogCategory =
  | 'Residential'
  | 'Office'
  | 'China Sourcing'
  | 'Local SEO'

export type BlogSubsection = {
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type BlogSection = {
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
  subsections?: BlogSubsection[]
}

export type BlogLink = {
  label: string
  href: string
  description: string
}

export type BlogCallToAction = {
  eyebrow: string
  heading: string
  body: string
}

export type BlogPost = {
  title: string
  slug: string
  category: BlogCategory
  keywords: string[]
  metaTitle: string
  metaDescription: string
  excerpt: string
  heroImage: string
  featuredImage: string
  imageAlt: string
  readTime: string
  datePublished: string
  author: string
  introduction: string[]
  sections: BlogSection[]
  internalLinks: BlogLink[]
  callToAction: BlogCallToAction
}

export type BlogPostInput = Omit<BlogPost, 'author' | 'callToAction'>

export const blogCategories: BlogCategory[] = [
  'Residential',
  'Office',
  'China Sourcing',
  'Local SEO',
]

export const sharedBlogCallToAction: BlogCallToAction = {
  eyebrow: 'Posture India',
  heading: 'Looking for high-quality furniture in Hyderabad or across India?',
  body:
    'Posture India offers custom solutions, competitive pricing, and end-to-end support including China sourcing. Contact us today.',
}

export function createBlogPost(input: BlogPostInput): BlogPost {
  return {
    author: 'Posture India',
    callToAction: sharedBlogCallToAction,
    ...input,
  }
}
