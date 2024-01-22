// ./nextjs-app/app/page.tsx

import { SanityDocument } from 'next-sanity'
import { projectsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/sanityFetch'

export default async function Home() {
  const projects = await sanityFetch<SanityDocument[]>({ query: projectsQuery })

  return (
    <div className="container mx-auto px-4">
      <h1
        style={{ fontSize: '30px', fontWeight: 'bold', paddingBottom: '1em' }}
      >
        Projekte
      </h1>
      {projects.map((project) => (
        <div key={project._id}>
          <a href={'/projekte/' + project.slug.current}>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                paddingBlock: '0.5em',
              }}
            >
              {project.projectName}
            </h2>
            <div>{project.description}</div>
          </a>
        </div>
      ))}
    </div>
  )
}
