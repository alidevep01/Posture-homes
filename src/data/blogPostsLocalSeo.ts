import { createBlogPost, type BlogPost, type BlogPostInput } from './blogSchema'
import rawPosts from './json/blogPostsLocalSeo.json'

export const localSeoBlogPosts: BlogPost[] = (rawPosts as BlogPostInput[]).map(createBlogPost)
