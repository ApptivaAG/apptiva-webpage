import Testimonial from './testimonial'

const Testimonials = ({ testimonials }: { testimonials: any }) => {
  return (
    <div>
      {testimonials.map((testimonial: any) => {
        return (
          <Testimonial
            key={testimonial.id}
            testimonial={testimonial}
          ></Testimonial>
        )
      })}
    </div>
  )
}

export default Testimonials
