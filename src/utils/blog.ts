import MdxImage from '@/components/image'
import { queryPostFromCms } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import remarkEmbedder from '@remark-embedder/core'
import { Code } from 'bright'
import { promises as fs } from 'fs'
import { imageSize } from 'image-size'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { cache } from 'react'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { BlogFrontmatter, CmsBlog, CmsContent, MarkdownBlog } from './types'
import { unstable_cache } from 'next/cache'

const blogPostsPath = 'content/blog'
const assetsPath = '/assets/blog'

export const getPosts = cache(async () => {
  const cmsPosts = await getCmsPosts()
  const markdownPosts = await getMarkdownPosts()

  const posts = new Map<string, CmsBlog | MarkdownBlog>()
  const mergedBlogposts = [...cmsPosts, ...markdownPosts]
  mergedBlogposts.forEach((post) => {
    const { slug } = post
    if (slug) {
      posts.set(slug, { ...post, slug })
    }
  })
  return posts
})

const getCmsPosts = cache(async () => {
  const postsFromCMS = await runQuery(queryPostFromCms)

  return postsFromCMS.map((post) => {
    return {
      kind: 'cms',
      content: post.content as CmsContent,
      image: post.image,
      title: post.header.title ?? 'Ohne Title',
      description: post.header.description ?? 'Ohne Beschreibung',
      slug: post.slug,
      author: post.author ?? 'Anonymous',
      publishDate: post._createdAt,
      tags:
        post.tags?.filter((tag): tag is string => typeof tag === 'string') ??
        undefined,
    } as const
  })
})

const getMarkdownPosts = unstable_cache(async () => {
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
      components: {
        img: MdxImage(blogPostAssetsDirectory),
        pre: Code,
      },
      options: {
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkUnwrapImages,
            [
              remarkEmbedder,
              {
                transformers: [oembedTransformer],
              },
            ],
          ],
        },
        parseFrontmatter: true,
      },
    })

    const imageSrc = markdown.frontmatter.image
      ? path
          .join(path.dirname(markdownFilePath), markdown.frontmatter.image)
          .replace(blogPostsPath, assetsPath)
      : undefined

    const imageInfo = imageSrc ? getImageInfo(imageSrc) : undefined

    posts.push({
      kind: 'markdown',
      content: data,
      blogPostAssetsDirectory,
      image: {
        src: imageSrc,
        ...imageInfo,
      },
      title: markdown.frontmatter.title,
      description: markdown.frontmatter.description,
      slug: markdown.frontmatter.slug,
      author: markdown.frontmatter.author,
      publishDate: markdown.frontmatter.date,
    } as const)
  }

  console.log('got all posts')

  return posts
}, ['markdown'])

export function getImageInfo(imageSrc: string) {
  return imageSize(path.join('./public', imageSrc))
}
