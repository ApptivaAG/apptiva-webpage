import { PageHeader } from '@/components/page-header'
import Underline from '@/components/ui/underline'
import { ProjectTeaser } from './projekt-teaser'
import { ProjectQueryData } from './types'
import Button from '@/components/ui/button'
import Link from 'next/link'
import { Category } from './search-params'

export default function ProjectList(props: {
  projects: ProjectQueryData[]
  category: Category
}) {
  const devContent = (
    <PageHeader
      title={
        <>
          Erfolgsprojekte: <Underline>Softwarelösungen</Underline> im Einsatz
        </>
      }
      lead="Lass dich von unseren Referenzen inspirieren! Seit über 10 Jahren entwickeln wir Softwarelösungen für Kund:innen aus verschiedensten Branchen."
      links={[
        { name: 'Angebot' },
        { name: 'Development', href: '/angebot/development' },
        { name: 'Projekte', href: '/projekte' },
      ]}
      callToAction={
        <Link href="/kontakt">
          <Button size="large" intent="secondary">
            Was ist deine Idee?
          </Button>
        </Link>
      }
    />
  )
  const chatContent = (
    <PageHeader
      title={
        <>
          Erfolgsprojekte: <Underline>Chatbots</Underline> im Einsatz
        </>
      }
      lead="Lass dich von unseren Referenzen inspirieren! Seit über 10 Jahren liefern wir Chatbots für Kund:innen aus verschiedensten Branchen."
      links={[
        { name: 'Angebot' },
        { name: 'Chatbots', href: '/angebot/chatbots' },
        { name: 'Projekte', href: '/projekte' },
      ]}
      callToAction={
        <Link href="/kontakt">
          <Button size="large" intent="secondary">
            Was ist deine Idee?
          </Button>
        </Link>
      }
    />
  )
  const defaultContent = (
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
          <Button size="large" intent="secondary">
            Was ist deine Idee?
          </Button>
        </Link>
      }
    />
  )

  return (
    <>
      {props.category === 'chatbots'
        ? chatContent
        : props.category === 'dev'
          ? devContent
          : defaultContent}
      <ul className="grid gap-4 py-8 lg:grid-cols-3 lg:py-16">
        {props.projects.map((project) => (
          <li key={project._id}>
            <ProjectTeaser
              project={project}
              intent="dark"
              category={props.category}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
