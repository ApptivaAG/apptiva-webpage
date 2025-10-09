'use client'

import { PageHeader } from '@/components/page-header'
import Underline from '@/components/ui/underline'
import { ProjectTeaser } from './projekt-teaser'
import { ProjectQueryData } from './types'
import Button from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'
import { topics, Topics } from './search-params'

export default function ProjectList(props: {
  projects: ProjectQueryData[]
  topic: Topics
}) {
  const getIntent = (name: string) => {
    if (name === props.topic) {
      return 'secondary'
    } else {
      return 'ghost'
    }
  }

  return (
    <>
      <PageHeader
        title={
          <>
            Erfolgsprojekte: <Underline>Softwarelösungen</Underline> und{' '}
            <Underline>Chatbots</Underline> im Einsatz
          </>
        }
        lead="Lass dich von unseren Referenzen inspirieren! Seit über 10 Jahren entwickeln wir Softwarelösungen und Chatbots für Kund:innen aus verschiedensten Branchen."
        links={[{ name: 'Projekte', href: '/projekte' }]}
        callToAction={
          <Link href="/kontakt">
            <Button intent="secondary">Was ist deine Idee?</Button>
          </Link>
        }
      />
      <div className="flex flex-wrap gap-4 pt-8 lg:pt-16">
        {topics.map((topic) => (
          <Link href={`?topic=${topic.value}`} replace>
            <Button intent={getIntent(topic.value)} key={topic.value}>
              {topic.name}
            </Button>
          </Link>
        ))}
      </div>

      <ul className="grid gap-4 py-8 lg:grid-cols-3 lg:py-16">
        {props.projects.map((project) => (
          <li key={project._id}>
            <ProjectTeaser project={project} intent="dark" />
          </li>
        ))}
      </ul>
    </>
  )
}
