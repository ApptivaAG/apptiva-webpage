'use client'

import { HomepageDataQueries, homepageQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import Content from './content'

export default function HeroPreview({
  initial,
}: {
  initial: QueryResponseInitial<HomepageDataQueries>
}) {
  const { data } = useQuery<HomepageDataQueries>(
    homepageQuery.query,
    undefined,
    {
      initial,
    }
  )

  return <Content claim={data} />
}
