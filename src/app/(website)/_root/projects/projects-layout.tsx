import Heading from '../../../../components/heading'
import {
  ProjectQueryData,
  ProjectsFromSettingsQueryData,
  ProjectsQueryData,
} from '../../projekte/types'
import ProjectsCarousel from './carousel'

export default function ProjectsLayout(props: {
  projects?: ProjectsFromSettingsQueryData
  projectsFromModule?: ProjectsQueryData
}) {
  // todo: make sure projects or projectsFrom Module is not null!
  // i guess its better to check it here than in carousel component
  // also it's quite ugly to make this component callable without a project :-(

  return (
    <div className="full bg-primary text-base-white">
      <div className="mt-10">
        <div className="content m-auto font-[600]">
          <Heading level={2}>
            Gemeinsam wollen wir Geschichten schreiben.
          </Heading>
          <Heading level={2} className="highlighted-text">
            Erfolgsgeschichten.
          </Heading>
        </div>

        {props.projects && (
          <ProjectsCarousel slides={props.projects.projects}></ProjectsCarousel>
        )}
        {props.projectsFromModule && (
          <ProjectsCarousel
            slides={props.projectsFromModule}
          ></ProjectsCarousel>
        )}
        {/* <ProjectsCarousel slides={slides}></ProjectsCarousel> */}
      </div>
    </div>
  )
}
