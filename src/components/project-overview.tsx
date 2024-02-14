import Link from '../../node_modules/next/link'
import Heading from './heading'
import SanityImage from './sanity-image'

const ProjectOverview = ({ project }: { project: any }) => {
  return (
    <>
      <div>
        <div className="m-auto w-6/12">
          <div className="relative h-[511px] rounded-lg border border-base-grey p-5">
            <Link href={`/projekte/${project.slug}`}>
              <div className="relative h-full w-full overflow-hidden rounded">
                <SanityImage image={project.image} />
                <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent to-base-black"></div>
                <Heading className="absolute bottom-5 left-5" level={3}>
                  {project.projectName}
                </Heading>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectOverview
