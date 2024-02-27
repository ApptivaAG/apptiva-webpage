'use client'
import EmblaCarousel from '@/components/emblaCarousel/emblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import { ProjectsQueryData } from '../../projekte/types'

const OPTIONS: EmblaOptionsType = { loop: true }

export default function ProjectsCarousel(props: { slides: ProjectsQueryData }) {
  // todo:  what if?
  if (props.slides === null) {
    return <></>
  }
  return (
    <EmblaCarousel
      slides={props.slides}
      options={OPTIONS}
      FullWidthSlider={false}
      bgDark={true}
    ></EmblaCarousel>
  )
}
