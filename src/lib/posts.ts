import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { Post } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fallbackPath = path.join(postsDirectory, `${realSlug}.md`)
  
  let filePath = ''
  if (fs.existsSync(fullPath)) {
    filePath = fullPath
  } else if (fs.existsSync(fallbackPath)) {
    filePath = fallbackPath
  } else {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  const readingTime = Math.ceil(content.split(' ').length / 200) + ' min read'

  return {
    slug: realSlug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    content: contentHtml,
    tags: data.tags || [],
    author: data.author || 'Gilbert Garcia',
    readingTime,
    coverImage: data.coverImage,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  )
  
  return posts
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}