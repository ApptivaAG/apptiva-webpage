import Image from 'next/image'
import path from 'path'
import ReactHtmlParser from 'react-html-parser'
import { FaQuoteLeft } from 'react-icons/fa'
import Heading from './heading'

const Testimonial = ({ testimonial }: { testimonial: any }) => {
  const imagePath = path.join('/img/testimonials/', testimonial.avatar)
  return (
    <div className="m-auto w-8/12">
      <div className="mb-10 mt-10">
        <div className="flex">
          <div>
            <div className="rounded-[100%] bg-secondary">
              <FaQuoteLeft size={100} className="p-6 text-primary" />
            </div>
          </div>
          <div className="ml-8 mt-10">
            <Heading level={3} className="text-primary">
              {ReactHtmlParser(testimonial.statement)}
            </Heading>
            <div className="mt-20 flex items-center gap-12">
              <div className="">
                <Image
                  className="rounded-[100%]"
                  src={imagePath}
                  width={200}
                  height={200}
                  alt={testimonial.id}
                />
              </div>
              <div className="text-xl text-primary">
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
