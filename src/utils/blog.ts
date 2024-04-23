import MdxImage from '@/components/mdx-image'
import { queryPostFromCmsBySlug, queryPostsFromCms } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { Code } from 'bright'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import { unstable_cache } from 'next/cache'
import path from 'path'
import { cache } from 'react'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import portableTextToString from './portable-text-to-string'
import { mapTags } from './tags'
import { BlogFrontmatter, CmsBlog, CmsContent, MarkdownBlog } from './types'

const blogPostsPath = 'content/blog'
const assetsPath = '/assets/blog'

export function hasTag(kind: 'blog' | 'apptiva-lernt') {
  return ([, post]: [string, { tags?: string[] }]) =>
    kind === 'apptiva-lernt'
      ? post.tags?.includes('Apptiva lernt')
      : !post.tags?.includes('Apptiva lernt')
}

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

const getCmsPostBySlug = cache(async (slug: string) => {
  const { published: post } = await load(
    queryPostFromCmsBySlug,
    false,
    {
      slug,
    },
    ['blog']
  )

  if (!post || !post.slug) {
    return undefined
  }

  const description = post.header?.lead ?? 'Ohne Einleitung'
  const title = post.header?.title
    ? portableTextToString(post.header.title)
    : 'Ohne Titel'
  return {
    kind: 'cms',
    content: post.content as CmsContent,
    image: post.header?.image,
    title,
    description,
    meta: {
      title: post.header?.meta?.title ?? title,
      description: post.header?.meta?.description ?? description,
    },
    slug: post.slug,
    author: post.author ?? 'Anonymous',
    publishDate: post.publishedAt ?? post._createdAt,
    modifiedDate: post._updatedAt,
    breadcrumb: post.breadcrumb,
    tags:
      post.tags?.filter((tag): tag is string => typeof tag === 'string') ??
      undefined,
  } satisfies CmsBlog
})

const getCmsPosts = cache(async () => {
  const { published: postsFromCMS } = await load(
    queryPostsFromCms,
    false,
    undefined,
    ['blog']
  )

  return postsFromCMS.map((post) => {
    const title = post.header?.title
      ? typeof post.header.title === 'string'
        ? post.header.title
        : portableTextToString(post.header.title)
      : 'Ohne Titel'
    const description = post.header?.lead ?? 'Ohne Einleitung'
    return {
      kind: 'cms',
      content: post.content as CmsContent,
      image: post.header?.image,
      title,
      description,
      meta: {
        title: post.header?.meta?.title ?? title,
        description: post.header?.meta?.description ?? description,
      },
      slug: post.slug,
      author: post.author ?? 'Anonymous',
      publishDate: post.publishedAt ?? post._createdAt,
      modifiedDate: post._updatedAt,
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
