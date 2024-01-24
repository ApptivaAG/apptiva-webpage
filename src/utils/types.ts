import { SanityImageSource } from '@sanity/asset-utils'
import { CompileMDXResult } from 'next-mdx-remote/rsc'
import { PortableTextBlock, PortableTextTextBlock } from 'sanity'

export type SanityImageWithAlt = (SanityImageSource & { alt: string }) | null

export interface Blog {
  title: string
  description: string
  slug: string
  author: string | Author
  publishDate: string
  tags?: string[]
}
export interface MarkdownBlogPreview extends Blog {
  kind: 'markdown'
}
export interface MarkdownBlog extends Blog {
  kind: 'markdown'
  content: string
  blogPostAssetsDirectory: string
  image: Image | NoImage
}

export interface CmsBlog extends Blog {
  kind: 'cms'
  content: CmsContent
  image: SanityImageWithAlt
}

type PortableText = Array<
  Omit<PortableTextTextBlock, '_key'> & {
    _key?: string | undefined
  }
>

export type CmsContent = PortableText | undefined

export type Image = {
  width?: number | undefined
  height?: number | undefined
  orientation?: number | undefined
  type?: string | undefined
  src: string
}
export type NoImage = {
  src: undefined
}
export type BlogFrontmatter = {
  title: string
  slug: string
  author: string
  date: string
  image?: string
  description: string
}

export type Author = {
  personName: string
}

export type Tag = {
  name: string
}

export interface Service {
  title: string
  image: SanityImageWithAlt
  description: string
  content?: CmsContent
  slug: string
  modules?: Module[] | null
}

export type Module = {
  title?: string
  layout?: string
  image: SanityImageWithAlt
  content?: CmsContent
}

export interface Glossary {
  title: string
  slug: string
  summary?: CmsContent
  modules?: Module[] | null
  tags?: string[]
}
