import Heading from './heading';
import Testimonial from './testimonial';

const Testimonials = ({ testimonials }: { testimonials: any }) => {
  console.log("testimonails client",testimonials);
  console.log("länge", testimonials.length);
  
  return (
    <div>
      <Heading level={2}>Testimonials</Heading>

      {testimonials.map((testimonial:any)=> {
        return <Testimonial testimonial={testimonial}></Testimonial>
      })}
    </div>
  )
}

export default Testimonials
