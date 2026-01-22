'use client'

import Module from '@/components/module'
import React from 'react'
import { PageHeader } from '../../../components/page-header'
import { MediaPageQueryData } from './types'

export default function Media(props: {
  data: MediaPageQueryData
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
}) {
  console.log('Media Page Data:', props.data)

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
