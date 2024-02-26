'use client'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from '@/components/emblaCarousel/emblaCarousel'
import {
  ProjectQueryData,
  ProjectsFromSettingsQueryData,
} from '../../projekte/types'

const OPTIONS: EmblaOptionsType = { loop: true }

export default function ProjectsCarousel(props: {
  slides: ProjectsFromSettingsQueryData
}) {
  return (
    <EmblaCarousel
      slides={props.slides.projects}
      options={OPTIONS}
      navigationButtonFullWidth={false}
      bgDark={true}
    ></EmblaCarousel>
  )
}
