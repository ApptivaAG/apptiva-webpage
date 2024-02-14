import Heading from './heading'
import SanityImage from './sanity-image'

const ProjectOverview = ({ project }: { project: any }) => {
  return (
    <>
      <div>
        <div className="m-auto w-8/12 ">
          <SanityImage image={project.image} />
          <Heading level={3}>{project.projectName}</Heading>
        </div>
      </div>
    </>
  )
}

export default ProjectOverview
