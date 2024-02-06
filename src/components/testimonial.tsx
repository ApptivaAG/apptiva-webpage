import Image from 'next/image'
import path from 'path'
import { FaQuoteLeft } from 'react-icons/fa'

const Testimonial = ({ testimonial }: { testimonial: any }) => {
  const imagePath = path.join('/img/testimonials/', testimonial.avatar)
  return (
    <div className="m-auto w-8/12">
      <div className="mb-10 mt-10">
        <div className="flex">
          <div>
            <div className="rounded-[100%] bg-secondary">
              <FaQuoteLeft size={100} className="p-6 text-primary-dark" />
            </div>
          </div>
          <div className="ml-8 mt-10">
            <p className="text-5xl font-bold text-primary-dark">
              {testimonial.statement}
            </p>
            <div className="mt-10 flex items-center gap-8">
              <div className="">
                <Image
                  className="rounded-[100%]"
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
        </div>
      </div>
    </div>
  )
}

export default Testimonial
