'use client'

import { AboutPageQueryData } from './types'
import Module from '@/components/module'
import { PageHeader } from '../../../components/page-header'
import SanityImage from '@/components/sanity-image'

export default function About(props: {
  data: AboutPageQueryData
  customers: React.ReactNode
}) {
  // console.log('media', window.matchMedia('(min-width: 768px)'))

  return (
    <>
      <PageHeader
        title={props.data.header?.title}
        lead={props.data.header?.lead}
        links={[{ name: 'Über uns', href: '/ueber-uns' }]}
      >
        {/* {props.data.modules && (
          <div className="mt-[-20rem]">
            {props.data.modules[0].persons.map((person, index) => (
              <div
                key={person.personName}
                style={{
                  margin: window.matchMedia('(min-width: 768px)')
                    ? randomMargin()
                    : randomMargin(0.5),
                }}
                className="float-left"
              >
                <SanityImage
                  image={person.image}
                  className="size-[5rem] rounded-full object-cover md:size-[8rem] lg:size-[11.25rem]"
                />
              </div>
            ))}
          </div>
        )} */}
      </PageHeader>

      {props.data.modules?.map((module) => (
        <Module key={module._key} module={module} customers={props.customers} />
      ))}
    </>
  )
}

const defaultMax = Math.exp(6) / 12
const buffer = (max: number) => Math.floor(Math.random() * max) + 3 + 'rem'
const randomMargin = (factor = 1) =>
  buffer(16 * factor) + ' 0 0 ' + buffer(12 * factor)

const getPosition = (index: number) => {
  switch (index) {
    case 0:
      return { top: '10rem', left: '2rem' }
    case 1:
      return { top: '10rem', left: '2rem' }
    case 2:
      return { top: '10rem', left: '2rem' }
    case 3:
      return { top: '10rem', left: '2rem' }
    case 4:
      return { top: '10rem', left: '2rem' }
    case 5:
      return { top: '10rem', left: '2rem' }
    case 6:
      return { top: '10rem', left: '2rem' }
    case 7:
      return { top: '10rem', left: '2rem' }
    case 8:
      return { top: '10rem', left: '2rem' }
    case 9:
      return { top: '10rem', left: '2rem' }
    case 10:
      return { top: '10rem', left: '2rem' }
  }
}
