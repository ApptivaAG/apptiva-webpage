'use client'

import { PageHeader } from '@/components/page-header'
import Underline from '@/components/ui/underline'
import { ProjectTeaser } from './projekt-teaser'
import { ProjectQueryData } from './types'
import Button from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'

export default function ProjectList(props: { projects: ProjectQueryData[] }) {
  // const topics = ['Alle', 'App Entwicklung', 'Webentwicklung', 'Chatbots']
  const topics = [
    { name: 'Alle', value: '' },
    { name: 'App Entwicklung', value: 'App Entwicklung' },
    { name: 'Webentwicklung', value: 'Webentwicklung' },
    { name: 'Chatbots', value: 'Chatbots' },
  ]

  const [topic, setTopic] = useState(topics[0].value)
  const getIntent = (name: string) => {
    if (name === topic) {
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
          <Button
            intent={getIntent(topic.value)}
            onClick={() => setTopic(topic.value)}
            key={topic.value}
          >
            {topic.name}
          </Button>
        ))}
      </div>

      <ul className="grid gap-4 py-8 lg:grid-cols-3 lg:py-16">
        {props.projects
          .filter((project) => {
            if (topic !== topics[0].value) return project.tags?.includes(topic)
            else return project
          })
          .map((project) => (
            <li key={project._id}>
              <ProjectTeaser project={project} intent="dark" />
            </li>
          ))}
      </ul>
    </>
  )
}
