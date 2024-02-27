import ProjectOverview from '@/components/project-overview'
import Button from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Heading from '../../../../components/heading'
import { ProjectsQueryData } from '../../projekte/types'

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
          <>
            <Carousel
              opts={{ loop: true }}
              layout={'threeSlidesFadeOut'}
              numberOfSlides={props.projects.length}
            >
              <CarouselContent>
                {props.projects.map((project, index) => {
                  return (
                    <CarouselItem index={index}>
                      <ProjectOverview project={project}></ProjectOverview>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>
          </>
        )}
      </div>
    </div>
  )
}
