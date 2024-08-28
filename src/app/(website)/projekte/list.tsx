'use client'

import { PageHeader } from '@/components/page-header'
import Underline from '@/components/ui/underline'
import { ProjectTeaser } from './projekt-teaser'
import { ProjectQueryData } from './types'
import Button from '@/components/ui/button'
import { useState } from 'react'

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
            Unsere <Underline>Referenzprojekte</Underline>
          </>
        }
        lead="Eine Auswahl unserer Projekte der letzten 10 Jahre."
        links={[{ name: 'Projekte', href: '/projekte' }]}
      />

      <div className="flex gap-4 pt-16">
        <Button
          intent={getIntent(topics[0].value)}
          onClick={() => setTopic(topics[0].value)}
        >
          {topics[0].name}
        </Button>
        <Button
          intent={getIntent(topics[1].value)}
          onClick={() => setTopic(topics[1].value)}
        >
          {topics[1].name}
        </Button>
        <Button
          intent={getIntent(topics[2].value)}
          onClick={() => setTopic(topics[2].value)}
        >
          {topics[2].name}
        </Button>
        <Button
          intent={getIntent(topics[3].value)}
          onClick={() => setTopic(topics[3].value)}
        >
          {topics[3].name}
        </Button>
      </div>

      <ul className="grid gap-4 py-16 lg:grid-cols-3">
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
