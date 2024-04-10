import { SanityImageSource } from '@sanity/asset-utils'
import { PortableTextTextBlock } from 'sanity'

export interface Blog {
  title: string
  description: string
  slug: string
  author: string | Author
  publishDate: string
  tags?: string[]
  meta: { title: string; description: string }
}

export type Author = {
  personName: string
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
  breadcrumb?: string | undefined
  image: SanityImageWithAlt | undefined
}

export type CmsContent = PortableText | undefined

export type PortableText = Array<
  Omit<PortableTextTextBlock, '_key'> & {
    _key?: string | undefined
  }
>

export type SanityImageWithAlt = (SanityImageSource & { alt: string }) | null

export type Image = {
  width?: number | undefined
  height?: number | undefined
  orientation?: number | undefined
  type?: string | undefined
  base64?: string | undefined
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
  image?: {
    src: string
    width: number
    height: number
    base64Placeholder: string
  }
  description: string
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
  title: string
  layout?: string
  image: SanityImageWithAlt
  content?: CmsContent
}

export interface Glossary {
  _id: string
  title: string
  slug: string
  summary?: CmsContent
  modules?: Module[] | null
  tags?: string[]
}

export interface Person {
  personName: string
  slug: string
  role?: string
  education?: string
  claim?: string
  slogan?: string
  content: CmsContent
  contact?: {
    mail?: string
    phone?: string
    socialNetworks?: {
      title: string
      url?: string
    }[]
  }
  image: SanityImageWithAlt
  skills?: {
    title: string
    items?: {
      name?: string
      value?: number
    }[]
  }[]
}
