import MdxImage from '@/components/image'
import { queryPostFromCms } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { Code } from 'bright'
import { promises as fs } from 'fs'
import { imageSize } from 'image-size'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { cache } from 'react'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { BlogFrontmatter, CmsBlog, CmsContent, MarkdownBlog } from './types'

const blogPostsPath = 'content/blog'
const assetsPath = '/assets/blog'

const posts = new Map<string, MarkdownBlog | CmsBlog>()

export const getPosts = cache(async () => {
  await getCmsPosts()
  await getMarkdownPosts()
  return posts
})

const getCmsPosts = cache(async () => {
  const postsFromCMS = await runQuery(queryPostFromCms)

  postsFromCMS.forEach((post) => {
    posts.set(post.slug, {
      kind: 'cms',
      content: post.content as CmsContent,
      image: post.image,
      title: post.header.title ?? 'Ohne Titel',
      description: post.header.description ?? 'Ohne Beschreibung',
      slug: post.slug,
      imageAlt: post.header.imageAlt,
      author: post.author ?? 'Anonymous',
      //authors: post.authors ?? ['Anonymus 123'],
      publishDate: post._createdAt,
      tags: post.tags,
    })
  })
})

const getMarkdownPosts = cache(async () => {
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

    posts.set(markdown.frontmatter.slug, {
      kind: 'markdown',
      content: markdown.content,
      image: {
        src: imageSrc,
        ...imageInfo,
      },
      title: markdown.frontmatter.title,
      description: markdown.frontmatter.description,
      slug: markdown.frontmatter.slug,
      author: markdown.frontmatter.author,
      publishDate: markdown.frontmatter.date,
    })
  }

  console.log('got all posts')

  return posts
})

export function getImageInfo(imageSrc: string) {
  return imageSize(path.join('./public', imageSrc))
}
