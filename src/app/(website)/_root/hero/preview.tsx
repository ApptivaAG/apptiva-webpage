'use client'

import { SettingsDataQueries, settingsQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import Content from './content'

export default function HeroPreview({
  initial,
}: {
  initial: QueryResponseInitial<SettingsDataQueries>
}) {
  const { data } = useQuery<SettingsDataQueries>(
    settingsQuery.query,
    undefined,
    {
      initial,
    }
  )

  return <Content claim={data} />
}
