import MdxImage from '@/components/mdx-image'
import SanityImage from '@/components/sanity-image'
import { getPostBySlug, getPosts } from '@/utils/blog'
import { PortableText } from '@portabletext/react'
import remarkEmbedder from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import { Code } from 'bright'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

export async function generateStaticParams() {
  const posts = await getPosts()

  return Array.from(posts.keys()).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = (await getPostBySlug(props.params.slug)) ?? notFound()

  return {
    title: post.title,
    description: post.description,
    // authors: post.authors.map((a) => ({
    //   name: a,
    // })),
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
  const post = (await getPostBySlug(props.params.slug)) ?? notFound()

  return (
    <>
      <h1>{post.title}</h1>
      <p>
        Publiziert am{' '}
        <time dateTime={post.publishDate}>
          {new Date(post.publishDate).toLocaleDateString('de-CH')}
        </time>{' '}
        von {post.author.toString()}.
        {/* {post.authors.map((a) => (
          <p>{a.toString()}</p>
          // <span key={a}>{kebabCaseToTitleCase(a)}</span>
        ))} */}
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
      {post.kind === 'cms' && <SanityImage image={post.image} />}
      <p className="font-semibold">{post.description}</p>
      {post.kind === 'markdown' && (
        <MDXRemote
          source={post.content}
          components={{
            img: MdxImage(post.blogPostAssetsDirectory),
            pre: Code,
          }}
          options={{
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
          }}
        />
      )}
      <hr />
      {post.kind === 'cms' &&
        post.content?.map((content) => (
          <PortableText key={content._key} value={content} />
        ))}
      <hr />
      <h2>Tags:</h2>
      <ul>{post.tags && post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </>
  )
}
