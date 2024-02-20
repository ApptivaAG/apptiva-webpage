import Image from 'next/image'
import path from 'path'
import ReactHtmlParser from 'react-html-parser'
import { FaQuoteLeft } from 'react-icons/fa'
import Heading from './heading'

const Testimonial = ({ testimonial }: { testimonial: any }) => {
  const imagePath = path.join('/img/testimonials/', testimonial.avatar)
  return (
    <div className="m-auto lg:w-8/12">
      <div className="my-0 lg:my-10">
        <div className="mx-2 flex lg:mx-0">
          <div>
            <div className="rounded-[100%] bg-secondary">
              <FaQuoteLeft className="p-2 text-[30px] text-primary lg:p-6 lg:text-[100px]" />
            </div>
          </div>
          <div className="ml-0 mr-[30px] mt-10 lg:ml-8">
            <Heading level={3} className="text-primary">
              {ReactHtmlParser(testimonial.statement)}
            </Heading>
            <div className="mt-10 flex items-center gap-6 lg:mt-20 lg:gap-12">
              <div>
                <Image
                  className="h-20 w-20 rounded-[100%] lg:h-52 lg:w-52"
                  src={imagePath}
                  width={200}
                  height={200}
                  alt={testimonial.id}
                />
              </div>
              <div className="text-primary">
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
