import Image from 'next/image'
import path from 'path'

const Testimonial = ({ testimonial }: { testimonial: any }) => {
  const imagePath = path.join('/img/testimonials/', testimonial.avatar)
  return (
    <div>
      <div className="mb-20 mt-20">
        <p className="text-5xl font-bold text-primary-dark">
          {testimonial.statement}
        </p>
      </div>
      <div className="flex items-center gap-8">
        <div className="">
          <Image
            className="rounded-lg"
            src={imagePath}
            width={200}
            height={200}
            alt={testimonial.id}
          />
        </div>
        <div className="text-lg">
          <p>{testimonial.name}</p>
          <p>{testimonial.position}</p>
          <p>{testimonial.company}</p>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
