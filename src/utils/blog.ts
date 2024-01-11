import { cache } from 'react'
import path from 'path'
import { promises as fs } from 'fs'
import { Code } from 'bright'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc'
import { imageSize } from 'image-size'
import MdxImage from '@/components/image'

const blogPostsPath = 'content/blog'
const assetsPath = '/assets/blog'

const posts = new Map<
  string,
  CompileMDXResult<BlogFrontmatter> & {
    image: Image | NoImage
  }
>()

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
  if (posts.size > 0) {
    return posts
  }

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
      ...markdown,
      image: {
        src: imageSrc,
        ...imageInfo,
      },
    })
  }

  console.log('got all posts')

  return posts
})

export function getImageInfo(imageSrc: string) {
  return imageSize(path.join('./public', imageSrc))
}
