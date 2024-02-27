import Button from '@/components/ui/button'
import Heading from '../../../../components/heading'
import { ProjectsQueryData } from '../../projekte/types'
import ProjectsCarousel from './carousel'

export default function ProjectsLayout(props: { projects: ProjectsQueryData }) {
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
          <div className="flex">
            <Button
              intent="secondary"
              element="a"
              href={'/projekte'}
              className="mt-10"
            >
              Alle Referenzen
            </Button>
          </div>
        </div>
        {props.projects && (
          <ProjectsCarousel slides={props.projects}></ProjectsCarousel>
        )}
      </div>
    </div>
  )
}
