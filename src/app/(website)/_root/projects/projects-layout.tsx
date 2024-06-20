import ProjectOverview from '@/components/project-overview'
import StyledPortableText from '@/components/styled-portable-text'
import Button from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ModuleData } from '@/sanity/lib/queries'
import { PortableText } from '@/domain/types'

export default function ProjectsLayout(props: {
  projects: ModuleData['projects']
  introduction: PortableText | undefined
}) {
  return (
    <div className="full bg-primary text-base-white">
      <div>
        {props.introduction && (
          <div className="content m-auto">
            <StyledPortableText content={props.introduction} />

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
        )}

        {props.projects && (
          <Carousel
            layout={'fadeOut'}
            darkTheme={true}
            numberOfSlides={props.projects.length}
            loop={true}
            align="center"
          >
            <CarouselContent>
              {props.projects.map((project, index) => {
                return (
                  <CarouselItem key={index} index={index}>
                    <ProjectOverview project={project}></ProjectOverview>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  )
}
