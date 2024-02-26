'use client'

import { claimQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import Content from './content'
import { SettingsData } from './types'

export default function HeroPreview({
  initial,
}: {
  initial: QueryResponseInitial<SettingsData[]>
}) {
  const { data } = useQuery<SettingsData[]>(claimQuery.query, undefined, {
    initial,
  })
  const claim = data.at(0)?.claim
  return claim ? <Content claim={claim} /> : 'No Claim'
}
