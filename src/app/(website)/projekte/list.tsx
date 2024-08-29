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
        {topics.map((topic) => (
          <Button
            intent={getIntent(topic.value)}
            onClick={() => setTopic(topic.value)}
          >
            {topic.name}
          </Button>
        ))}
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
