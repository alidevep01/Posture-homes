import { createBlogPost, type BlogPost, type BlogPostInput } from './blogSchema'
import rawPosts from './json/blogPostsResidential.json'

export const residentialBlogPosts: BlogPost[] = (rawPosts as BlogPostInput[]).map(createBlogPost)
