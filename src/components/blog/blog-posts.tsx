import { getPosts } from '@/domain/blog/repository'
import { buildItemList } from '@/lib/schema/itemList/item-list'
import { queryPostsFromCms } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { Schema } from '../schema'
import BlogList from './list'
import BlogPostsPreview from './preview-list'

export default async function BlogPosts(props: {
  show: 'blog' | 'apptiva-lernt'
  isDraft: boolean
}) {
  if (props.isDraft) {
    const { draft } = await load(queryPostsFromCms, props.isDraft, undefined, [
      'service-page',
    ])

    return <BlogPostsPreview initial={draft} show={props.show} />
  }

  const posts = await getPosts()
  const itemList = buildItemList(
    posts,
    props.show,
    props.show === 'blog' ? 'Alle Blogartikel' : 'Alle Apptiva Lernt Artikel'
  )

  return (
    <>
      <Schema data={itemList} />
      <BlogList posts={posts} show={props.show} />
    </>
  )
}
