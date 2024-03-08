import { ProjectsData } from '@/sanity/lib/queries'
import Link from '../../node_modules/next/link'
import Heading from './heading'
import SanityImage from './sanity-image'

const ProjectOverview = ({ project }: { project: ProjectsData }) => {
  console.log('project overview ', project)

  return (
    <>
      {project && (
        <Link href={`/projekte/${project.slug}`}>
          <div className="relative h-full w-full overflow-hidden rounded">
            <SanityImage
              image={project.image}
              className="h-full object-cover object-center"
            />
            <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent to-base-black"></div>
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
