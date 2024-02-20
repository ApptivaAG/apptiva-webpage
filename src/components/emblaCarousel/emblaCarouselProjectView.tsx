'use client'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './emblaCarousel'

type PropType = {
  slides: []
}
const OPTIONS: EmblaOptionsType = { loop: true }

const EmblaCarouselProjectView: React.FC<PropType> = (props) => {
  const { slides } = props

  return (
    <EmblaCarousel
      slides={slides}
      options={OPTIONS}
      navigationButtonFullWidth={false}
      bgDark={true}
    ></EmblaCarousel>
  )
}

export default EmblaCarouselProjectView
