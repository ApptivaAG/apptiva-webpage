'use client'
import EmblaCarousel from './emblaCarousel'

type PropType = {
  slides: []
}

const EmblaCarouselSingleView: React.FC<PropType> = (props) => {
  const { slides } = props

  return (
    <>
      <EmblaCarousel
        slides={slides}
        navigationButtonFullWidth={true}
        bgDark={false}
      ></EmblaCarousel>
    </>
  )
}

export default EmblaCarouselSingleView
