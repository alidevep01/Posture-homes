import { chinaSourcingBlogPosts } from './blogPostsChinaSourcing'
import { localSeoBlogPosts } from './blogPostsLocalSeo'
import { officeBlogPosts } from './blogPostsOffice'
import { residentialBlogPosts } from './blogPostsResidential'
import {
  blogCategories,
  createBlogPost,
  sharedBlogCallToAction,
  type BlogCallToAction,
  type BlogCategory,
  type BlogLink,
  type BlogPost,
  type BlogPostInput,
  type BlogSection,
  type BlogSubsection,
} from './blogSchema'

export {
  blogCategories,
  createBlogPost,
  sharedBlogCallToAction,
  type BlogCallToAction,
  type BlogCategory,
  type BlogLink,
  type BlogPost,
  type BlogPostInput,
  type BlogSection,
  type BlogSubsection,
}

const selectedBlogSlugs = new Set([
  'best-furniture-for-2bhk-in-hyderabad',
  'cost-of-furnishing-a-home-in-hyderabad',
  'custom-furniture-vs-ready-made',
  'office-furniture-cost-in-india',
  'import-furniture-from-china-to-india-guide',
  'best-furniture-store-in-hyderabad',
])

export const blogPosts: BlogPost[] = [
  ...residentialBlogPosts,
  ...officeBlogPosts,
  ...chinaSourcingBlogPosts,
  ...localSeoBlogPosts,
]
  .filter((post) => selectedBlogSlugs.has(post.slug))
  .sort(
  (left, right) =>
    new Date(right.datePublished).getTime() - new Date(left.datePublished).getTime(),
  )

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const currentPost = getBlogPostBySlug(slug)

  if (!currentPost) {
    return blogPosts.slice(0, limit)
  }

  const sameCategory = blogPosts.filter(
    (post) =>
      post.slug !== slug && post.category === currentPost.category,
  )

  const fallback = blogPosts.filter(
    (post) =>
      post.slug !== slug && post.category !== currentPost.category,
  )

  return [...sameCategory, ...fallback].slice(0, limit)
}
