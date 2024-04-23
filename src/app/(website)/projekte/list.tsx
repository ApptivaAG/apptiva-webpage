import { PageHeader } from '@/components/page-header'
import Underline from '@/components/ui/underline'
import { ProjectTeaser } from './projekt-teaser'
import { ProjectQueryData } from './types'

export default function ProjectList(props: { projects: ProjectQueryData[] }) {
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

      <ul className="grid gap-4 py-16 lg:grid-cols-3">
        {props.projects.map((project) => (
          <li key={project._id}>
            <ProjectTeaser project={project} intent="dark" />
          </li>
        ))}
      </ul>
    </>
  )
}
