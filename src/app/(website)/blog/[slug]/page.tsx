import { getPosts } from '@/utils/blog'
import { kebabCaseToTitleCase } from '@/utils/format'
import { PortableText } from '@portabletext/react'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()

  return Array.from(posts.keys()).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const posts = await getPosts()

  const post = posts.get(props.params.slug)
  if (!post) {
    notFound()
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((a) => ({
      name: a,
    })),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      images: [
        {
          url: `https://apptiva-uber-website.netlify.app/_ipx/w_1200,q_75/%2Fassets%2Fblog%2F${props.params.slug}%2F${post.image}`,
        },
      ],
      publishedTime: post.publishDate,
    },
  }
}

export default async function Home(props: { params: { slug: string } }) {
  const posts = await getPosts()

  const post = posts.get(props.params.slug)
  if (!post) {
    notFound()
  }

  return (
    <>
      <h1>{post.title}</h1>
      <p>
        Publiziert am{' '}
        <time dateTime={post.publishDate}>
          {new Date(post.publishDate).toLocaleDateString('de-CH')}
        </time>{' '}
        von{' '}
        {post.authors.map((a) => (
          <span>{kebabCaseToTitleCase(a)}</span>
        ))}
        .
      </p>

      {post.kind === 'markdown' && post.image.src && (
        <Image
          className="full"
          src={post.image.src}
          width={post.image.width}
          height={post.image.height}
          alt=""
          sizes="(max-width: 600px) 100vw, 1200px"
        />
      )}
      {post.kind === 'cms' && post.image && <p>theres an image</p>}
      <p className="font-semibold">{post.description}</p>
      {post.kind === 'markdown' && post.content}
      {post.kind === 'cms' &&
        post.content?.map((content) => <PortableText value={content} />)}
    </>
  )
}
