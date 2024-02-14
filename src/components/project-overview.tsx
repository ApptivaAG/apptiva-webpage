import { urlForImage } from '@/sanity/lib/image'
import Image from '../../node_modules/next/image'
import Heading from './heading'

const ProjectOverview = ({ project }: { project: any }) => {
  return (
    <>
      <div>
        <div className="m-auto w-6/12">
          <div className="relative h-[511px] rounded-lg border border-base-grey p-5">
            <div className="relative h-full w-full rounded">
              <Image
                src={urlForImage(project.image).url()}
                alt={project.projectName}
                fill={true}
              ></Image>
              <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-base-black"></div>
              <Heading className="absolute bottom-5 left-5" level={3}>
                {project.projectName}
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectOverview
