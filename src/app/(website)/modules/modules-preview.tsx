'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'

import { SettingsDataQueries, settingsQuery } from '@/sanity/lib/queries'
import ModuleWrapper from './modules'

export default function ModulesPreview(props: {
  initial: QueryResponseInitial<SettingsDataQueries>
  customers: React.ReactNode
}) {
  const { data } = useQuery<SettingsDataQueries>(
    settingsQuery.query,
    undefined,
    {
      initial: props.initial,
    }
  )

  console.log('data? ', data)

  return <ModuleWrapper data={data} customers={props.customers} />
}
