import { unstable_cache } from 'next/cache'
import { BlogFrontmatter, MarkdownBlog } from '../types'
import { promises as fs } from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

const blogPostsPath = path.join(process.cwd(), 'content/blog')
const assetsPath = '/assets/blog'

export const getMarkdownPosts = unstable_cache(async () => {
  const posts: Array<MarkdownBlog> = []
  console.log('getting posts...')

  const files = await fs.readdir(blogPostsPath, { recursive: true })

  const markdownFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === '.md'
  )

  for (const markdownFile of markdownFiles) {
    const markdownFilePath = path.join(blogPostsPath, markdownFile)

    const blogPostAssetsDirectory = path
      .dirname(markdownFilePath)
      .replace(blogPostsPath, assetsPath)

    const data = await fs.readFile(markdownFilePath, 'utf8')

    const markdown = await compileMDX<BlogFrontmatter>({
      source: data,
      options: {
        parseFrontmatter: true,
      },
    })

    posts.push({
      kind: 'markdown',
      content: data,
      image: {
        src: markdown.frontmatter.image?.src,
        base64: markdown.frontmatter.image?.base64Placeholder,
        width: markdown.frontmatter.image?.width,
        height: markdown.frontmatter.image?.height,
      },
      blogPostAssetsDirectory,
      title: markdown.frontmatter.title,
      description: markdown.frontmatter.description,
      meta: {
        title: markdown.frontmatter.title,
        description: markdown.frontmatter.description,
      },
      slug: markdown.frontmatter.slug,
      author: markdown.frontmatter.author,
      publishDate: markdown.frontmatter.date,
    } as const)
  }

  console.log('got all posts')

  return posts
}, ['markdown-full'])
