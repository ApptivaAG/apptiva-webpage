import Heading from '../../../../components/heading'
import {
  ProjectQueryData,
  ProjectsFromSettingsQueryData,
} from '../../projekte/types'
import ProjectsCarousel from './carousel'

export default function ProjectsLayout(props: {
  projects: ProjectsFromSettingsQueryData
}) {
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
        <ProjectsCarousel slides={props.projects}></ProjectsCarousel>
      </div>
    </div>
  )
}
