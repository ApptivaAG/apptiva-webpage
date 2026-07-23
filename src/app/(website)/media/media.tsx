'use client'

import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'
import React from 'react'
import Module from '@/components/module'
import { PageHeader } from '../../../components/page-header'
import { MediaPageQueryData } from './types'

const url = '/media'
const title = 'Media'
export const metadata: Metadata = {
  title,
  description: 'Pressemitteilungen, Artikel und mehr über Apptiva',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export default function Media(props: {
  data: MediaPageQueryData
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
}) {
  return (
    <>
      <PageHeader
        title={props.data.header?.title}
        lead={props.data.header?.lead}
        links={[{ name: 'Media', href: '/media' }]}
      ></PageHeader>

      {props.data.modules?.map((module) => (
        <Module
          key={module._key}
          module={module}
          customers={props.customers}
          testimonials={props.testimonials}
          partners={props.partners}
        />
      ))}
    </>
  )
}
