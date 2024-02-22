import MdxImage from '@/components/mdx-image'
import { queryPostFromCmsBySlug, queryPostsFromCms } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { Code } from 'bright'
import { promises as fs } from 'fs'
import { imageSize } from 'image-size'
import { compileMDX } from 'next-mdx-remote/rsc'
import { unstable_cache } from 'next/cache'
import path from 'path'
import { cache } from 'react'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { mapTags } from './tags'
import {
  BlogFrontmatter,
  CmsBlog,
  CmsContent,
  MarkdownBlog,
  MarkdownBlogPreview,
} from './types'

const blogPostsPath = 'content/blog'
const assetsPath = '/assets/blog'

export const getPostBySlug = cache(async (slug: string) => {
  const cmsPost = await getCmsPostBySlug(slug)
  if (cmsPost) {
    return cmsPost
  }
  const markdownPosts = await getMarkdownPosts()
  return markdownPosts.find((_) => _.slug === slug)
})

export const getPosts = cache(async () => {
  const cmsPosts = await getCmsPosts()
  const markdownPosts = await getMarkdownPostsPreviews()

  const posts = new Map<string, CmsBlog | MarkdownBlogPreview>()
  const mergedBlogposts = [...cmsPosts, ...markdownPosts]
  mergedBlogposts.forEach((post) => {
    const { slug } = post
    if (slug) {
      posts.set(slug, { ...post, slug })
    }
  })
  return posts
})

const getCmsPostBySlug = cache(async (slug: string) => {
  const post = await runQuery(
    queryPostFromCmsBySlug,
    {
      slug,
    },
    ['blog']
  )

  if (!post || !post.slug) {
    return undefined
  }

  return {
    kind: 'cms',
    content: post.content as CmsContent,
    image: post.header?.image,
    title: post.header?.title ?? 'Ohne Title',
    description: post.header?.lead ?? 'Ohne Einleitung',
    slug: post.slug,
    author: post.author ?? 'Anonymous',
    publishDate: post._createdAt,
    tags:
      post.tags?.filter((tag): tag is string => typeof tag === 'string') ??
      undefined,
  } satisfies CmsBlog
})

const getCmsPosts = cache(async () => {
  const postsFromCMS = await runQuery(queryPostsFromCms, undefined, ['blog'])

  return postsFromCMS.map((post) => {
    return {
      kind: 'cms',
      content: post.content as CmsContent,
      image: post.header?.image,
      title: post.header?.title ?? 'Ohne Title',
      description: post.header?.lead ?? 'Ohne Einleitung',
      slug: post.slug,
      author: post.author ?? 'Anonymous',
      publishDate: post._createdAt,
      tags: mapTags(post.tags),
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
      image: { src: imageSrc, ...imageInfo },
      blogPostAssetsDirectory,
      title: markdown.frontmatter.title,
      description: markdown.frontmatter.description,
      slug: markdown.frontmatter.slug,
      author: markdown.frontmatter.author,
      publishDate: markdown.frontmatter.date,
    } as const)
  }

  console.log('got all posts')

  return posts
}, ['markdown-full'])

const getMarkdownPostsPreviews = unstable_cache(async () => {
  const posts: Array<MarkdownBlogPreview> = []
  console.log('getting post previews...')

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

    posts.push({
      kind: 'markdown',
      title: markdown.frontmatter.title,
      description: markdown.frontmatter.description,
      slug: markdown.frontmatter.slug,
      author: markdown.frontmatter.author,
      publishDate: markdown.frontmatter.date,
    } as const)
  }

  console.log('got all post previews')

  return posts
}, ['markdown-preview'])

export function getImageInfo(imageSrc: string) {
  return imageSize(path.join('./public', imageSrc))
}
