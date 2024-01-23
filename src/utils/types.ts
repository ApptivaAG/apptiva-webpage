import { SanityImageSource } from '@sanity/asset-utils'
import { CompileMDXResult } from 'next-mdx-remote/rsc'
import { PortableTextBlock } from 'sanity'

export interface Blog {
  title: string
  description: string
  slug: string
  author: string | Author
  publishDate: string
  tags?: string[]
}
export interface MarkdownBlog extends Blog {
  kind: 'markdown'
  content: CompileMDXResult['content']
  image: Image | NoImage
}

export interface CmsBlog extends Blog {
  kind: 'cms'
  content: CmsContent
  image: SanityImageSource
  imageAlt: string
}

export type CmsContent = Array<PortableTextBlock> | undefined

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

export interface ServicePage {
  title: string
  image?: SanityImageSource | null
  imageAlt?: string
  description: string
  content?: CmsContent
  slug: string
  modules?: Module[] | null
}

export type Module = {
  title?: string
  layout?: string
  image?: SanityImageSource | null
  imageAlt?: string
  content?: CmsContent
}

export interface Glossary {
  title: string
  slug: string
  summary?: CmsContent
  modules?: Module[] | null
  tags?: string[]
}
