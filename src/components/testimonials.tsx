import {
  getTestimonialsData,
  Testimonial as TestimonialData,
} from '@/domain/testimonials'
import { Schema } from './schema'
import Testimonial from './testimonial'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

const Testimonials = async () => {
  const testimonials = await getTestimonialsData()

  return (
    <>
      <TestimonialsSchema testimonials={testimonials} />
      <div className="full">
        <Carousel
          loop={false}
          layout={'autoWidth'}
          numberOfSlides={testimonials.length}
          className="py-14 md:py-16"
        >
          <CarouselContent className="gap-96">
            {testimonials.map((testimonial, index) => {
              return (
                <CarouselItem key={index} index={index} className="basis-full">
                  <Testimonial testimonial={testimonial}></Testimonial>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}

const TestimonialsSchema = ({
  testimonials,
}: {
  testimonials: TestimonialData[]
}) => {
  return (
    <Schema
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: testimonials.map((testimonial) => ({
          '@type': 'Review',
          itemReviewed: {
            '@type': 'Organization',
            name: 'Apptiva AG',
            url: 'https://apptiva.ch',
          },
          author: {
            '@type': 'Person',
            name: testimonial.frontmatter.name,
            jobTitle: testimonial.frontmatter.position,
            worksFor: {
              '@type': 'Organization',
              name: testimonial.frontmatter.company,
            },
          },
        })),
      }}
    />
  )
}

export default Testimonials
