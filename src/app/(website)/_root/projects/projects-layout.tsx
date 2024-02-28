import ProjectOverview from '@/components/project-overview'
import StyledPortableText from '@/components/styled-portable-text'
import Button from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ModuleData } from '@/sanity/lib/queries'

export default function ProjectsLayout(props: { module: ModuleData }) {
  return (
    <div className="full bg-primary text-base-white">
      <div className="mt-10">
        <div className="content m-auto">
          {props.module.introduction?.map((content: any) => (
            <StyledPortableText key={content._key} content={content} />
          ))}
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

        {props.module.projects && (
          <>
            <Carousel
              opts={{ loop: true }}
              layout={'threeSlidesFadeOut'}
              darkTheme={true}
              numberOfSlides={props.module.projects.length}
            >
              <CarouselContent>
                {props.module.projects.map((project, index) => {
                  return (
                    <CarouselItem key={index} index={index}>
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
