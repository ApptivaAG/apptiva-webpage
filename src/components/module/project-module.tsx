import ProjectsLayout from '@/app/(website)/_root/projects/projects-layout'
import { ProjectsQueryData } from '@/app/(website)/projekte/types'
import { ModuleData } from '@/sanity/lib/queries'

export default function ProjectModule(props: { module: ModuleData }) {
  const { module } = props

  //const projects: Pick<ModuleData, 'projects'> | undefined = module.projects
  const blubbs: ProjectsQueryData = module.projects

  console.log('chosen projects for service page', blubbs)

  return (
    <section
      key={module._key}
      className="full bg-primary py-8 text-base-white lg:py-28"
    >
      <ProjectsLayout projectsFromModule={blubbs} />
    </section>
  )
}
