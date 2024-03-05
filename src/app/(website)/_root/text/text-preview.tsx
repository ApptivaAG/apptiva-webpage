'use client'

import { settingsQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { SettingsData } from '../hero/types'
import SettingsText from './settings-text'

export default function TextPreview({
  initial,
}: {
  initial: QueryResponseInitial<SettingsData[]>
}) {
  const { data } = useQuery<SettingsData[]>(settingsQuery.query, undefined, {
    initial,
  })

  return <SettingsText text={data?.at(0)?.text} />
}
