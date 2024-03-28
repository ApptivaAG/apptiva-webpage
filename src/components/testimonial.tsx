import { Testimonial } from '@/utils/testimonials'
import { FaQuoteLeft } from 'react-icons/fa'
import Heading from './heading'

const Testimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="m-auto pb-4 lg:pb-0">
      <div className="content my-0 lg:my-10">
        <div className="flex lg:mx-0">
          <div>
            <div className="rounded-[100%] bg-secondary">
              <FaQuoteLeft className="p-2 text-[30px] text-primary lg:p-6 lg:text-[100px]" />
            </div>
          </div>
          <div className="mt-10 lg:ml-8">
            <Heading level={3} className="text-primary">
              {testimonial.content}
            </Heading>
            <div className="mt-10 flex items-center gap-6 lg:mt-20 lg:gap-12">
              <div className="text-primary">
                <Heading level={4}>{testimonial.frontmatter.name}</Heading>
                <p>{testimonial.frontmatter.position}</p>
                <p>{testimonial.frontmatter.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
