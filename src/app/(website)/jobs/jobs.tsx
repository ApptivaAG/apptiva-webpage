'use client'

import Module from '@/components/module'
import React from 'react'
import { PageHeader } from '../../../components/page-header'
import { JobsPageQueryData } from './types'

export default function Jobs(props: {
  data: JobsPageQueryData
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
}) {
  return (
    <>
      <PageHeader
        title={props.data.header?.title}
        lead={props.data.header?.lead}
        links={[{ name: 'Jobs', href: '/jobs' }]}
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
