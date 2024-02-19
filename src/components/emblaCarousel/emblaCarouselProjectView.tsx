'use client'
import ProjectOverview from '../project-overview'
import EmblaCarousel from './emblaCarousel'

type PropType = {
  slides: []
}

const EmblaCarouselProjectView: React.FC<PropType> = (props) => {
  const { slides } = props

  return (
    <EmblaCarousel
      slides={slides}
      navigationButtonFullWidth={false}
      bgDark={true}
    >
      {slides.map((slide: any) => {
        return (
          <div key={slide._id} className="mb-20 mt-20 min-w-0 flex-[0_0_100%]">
            <ProjectOverview project={slide}></ProjectOverview>
          </div>
        )
      })}
    </EmblaCarousel>
  )
}

export default EmblaCarouselProjectView
