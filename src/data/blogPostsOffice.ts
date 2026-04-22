import { createBlogPost, type BlogPost, type BlogPostInput } from './blogSchema'
import rawPosts from './json/blogPostsOffice.json'

export const officeBlogPosts: BlogPost[] = (rawPosts as BlogPostInput[]).map(createBlogPost)
