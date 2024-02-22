import EmblaCarousel from './emblaCarousel'

export default function EmblaCarouselSingleView<T extends any[]>(props: {
  slides: T
}) {
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
