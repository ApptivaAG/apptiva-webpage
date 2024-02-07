// ./nextjs-app/app/page.tsx

import Heading from '@/components/heading'
import { projectsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import Link from 'next/link'

export default async function Home() {
  const projects = await runQuery(projectsQuery, undefined, ['project'])

  return (
    <div className="container mx-auto px-4">
      <Heading level={2}>Projekte</Heading>
      {projects.map((project) => (
        <div key={project._id}>
          <Link href={'/projekte/' + project.slug}>
            <Heading level={3} size={4}>
              {project.projectName}
            </Heading>
            <div>{project.description}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}
