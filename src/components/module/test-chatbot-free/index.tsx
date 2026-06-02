import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Section from '@/components/section'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import TestChatbotForm from './form'

export default function TestChatbotFree(props: { module: ModuleData }) {
  const { module } = props
  return (
    <Section>
      <div className="content">
        <div className="popout rounded bg-secondary py-8">
          <div className="content space-y-8">
            <div className="col-left">
              {module.image && (
                <SanityImage
                  className="h-full w-full object-cover"
                  image={module.image}
                  size="full"
                />
              )}
            </div>
            <div className="col-right">
              <Heading level={3}>{module.title}</Heading>
              {module.content && (
                <StyledPortableText content={module.content} />
              )}
              <TestChatbotForm />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
