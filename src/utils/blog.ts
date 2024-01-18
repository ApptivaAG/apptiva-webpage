import MdxImage from '@/components/image'
import { queryPostFromCms } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { SanityImageAsset, SanityImageSource } from '@sanity/asset-utils'
import { Code } from 'bright'
import { promises as fs } from 'fs'
import { InferType } from 'groqd'
import { imageSize } from 'image-size'
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { cache } from 'react'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { PortableTextBlock } from 'sanity'

const blogPostsPath = 'content/blog'
const assetsPath = '/assets/blog'

const posts = new Map<string, MarkdownBlog | CmsBlog>()

interface Blog {
  title: string
  description: string
  slug: string
  authors: string[]
  publishDate: string
}
interface MarkdownBlog extends Blog {
  kind: 'markdown'
  content: CompileMDXResult['content']
  image: Image | NoImage
}
type CmsImage = InferType<typeof queryPostFromCms>[number]['header']

interface CmsBlog extends Blog {
  kind: 'cms'
  content: PortableTextBlock[] | undefined
  image: SanityImageSource
}

type Image = {
  width?: number | undefined
  height?: number | undefined
  orientation?: number | undefined
  type?: string | undefined
  src: string
}
type NoImage = {
  src: undefined
}
type BlogFrontmatter = {
  title: string
  slug: string
  author: string
  date: string
  image?: string
  description: string
}

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
      //@ts-ignore
      content: post.content,
      image: post.image,
      title: post.header.title ?? '',
      description: post.header.description ?? '',
      slug: post.slug,
      authors: post.authors?.map(
        (author) => author?.name ?? 'heiri hugentobler'
      ) ?? ['some name'],
      publishDate: post._createdAt,
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
      authors: [markdown.frontmatter.author],
      publishDate: markdown.frontmatter.date,
    })
  }

  console.log('got all posts')

  return posts
})

export function getImageInfo(imageSrc: string) {
  return imageSize(path.join('./public', imageSrc))
}
