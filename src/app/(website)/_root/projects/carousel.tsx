'use client'
import EmblaCarousel from '@/components/emblaCarousel/emblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import { ProjectsQueryData } from '../../projekte/types'

const OPTIONS: EmblaOptionsType = { loop: true }

export default function ProjectsCarousel(props: { slides: ProjectsQueryData }) {
  console.log('slides ', props.slides)

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
