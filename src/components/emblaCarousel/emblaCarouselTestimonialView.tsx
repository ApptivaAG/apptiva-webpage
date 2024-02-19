'use client'
import Testimonial from '../testimonial'
import EmblaCarousel from './emblaCarousel'

type PropType = {
  slides: []
}

const EmblaCarouselSingleView: React.FC<PropType> = (props) => {
  const { slides } = props

  return (
    <>
      <EmblaCarousel slides={slides} navigationButtonFullWidth={true}>
        {slides.map((slide: any) => {
          return (
            <div key={slide.id} className="mb-20 mt-20 min-w-0 flex-[0_0_100%]">
              <Testimonial testimonial={slide}></Testimonial>
            </div>
          )
        })}
      </EmblaCarousel>
    </>
  )
}

export default EmblaCarouselSingleView
