import { createBlogPost, type BlogPost, type BlogPostInput } from './blogSchema'
import rawPosts from './json/blogPostsChinaSourcing.json'

export const chinaSourcingBlogPosts: BlogPost[] = (rawPosts as BlogPostInput[]).map(createBlogPost)
