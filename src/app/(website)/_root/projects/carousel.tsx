'use client'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from '@/components/emblaCarousel/emblaCarousel'
import {
  ProjectQueryData,
  ProjectsFromSettingsQueryData,
  ProjectsQueryData,
} from '../../projekte/types'

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
      navigationButtonFullWidth={false}
      bgDark={true}
    ></EmblaCarousel>
  )
}
