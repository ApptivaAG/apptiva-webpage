'use client'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from '@/components/emblaCarousel/emblaCarousel'
import { ProjectsQueryData } from '../../projekte/types'

const OPTIONS: EmblaOptionsType = { loop: true }

export default function ProjectsCarousel(props: { slides: ProjectsQueryData }) {
  if (props.slides === null || undefined) {
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
