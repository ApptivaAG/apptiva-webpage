import { ProjectsData } from '@/sanity/lib/queries'
import Link from '../../node_modules/next/link'
import Heading from './heading'
import SanityImage from './sanity-image'

const ProjectOverview = ({ project }: { project: ProjectsData }) => {
  return (
    <>
      {project && (
        <Link href={`/projekte/${project.slug}`}>
          <div className="relative h-full w-full overflow-hidden rounded">
            <SanityImage
              image={project.image}
              className="h-full object-cover object-center"
              sizes="(max-width: 400px) 300px, (max-width: 600px) 500px, 600px"
            />
            <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-primary-dark/80"></div>
            <Heading className="absolute bottom-5 left-5" level={3}>
              {project.projectName}
            </Heading>
          </div>
        </Link>
      )}
    </>
  )
}

export default ProjectOverview
