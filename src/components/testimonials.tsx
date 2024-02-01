import Testimonial from './testimonial'

const Testimonials = ({ testimonials }: { testimonials: any }) => {
  return (
    <div>
      {testimonials.map((testimonial: any) => {
        return <Testimonial testimonial={testimonial}></Testimonial>
      })}
    </div>
  )
}

export default Testimonials
