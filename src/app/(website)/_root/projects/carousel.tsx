'use client'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from '../../../../components/emblaCarousel/emblaCarousel'
import { ProjectQueryData } from './types'

const OPTIONS: EmblaOptionsType = { loop: true }

export default function ProjectsCarousel(props: {
  slides: ProjectQueryData[]
}) {
  return (
    <EmblaCarousel
      slides={props.slides}
      options={OPTIONS}
      navigationButtonFullWidth={false}
      bgDark={true}
    ></EmblaCarousel>
  )
}
