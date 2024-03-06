'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { SettingsData } from '../_root/hero/types'
import { settingsQuery } from '@/sanity/lib/queries'
import ModuleWrapper from './modules'

export default function ModulesPreview(props: {
  initial: QueryResponseInitial<SettingsData>
  customers: React.ReactNode
}) {
  const { data } = useQuery<SettingsData>(settingsQuery.query, undefined, {
    initial: props.initial,
  })
  return <ModuleWrapper data={data} customers={props.customers} />
}
