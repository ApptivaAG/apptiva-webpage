import { PortableText } from '@portabletext/react'
import Heading from './heading'
import SanityImage from './sanity-image'

const ServiceTeaser = ({
  service,
  rowNumber,
}: {
  service: any
  rowNumber: number
}) => {
  console.log('servcies', service)

  const text = (
    <div className="w-1/2 ">
      <div className="m-28 text-primary">
        <Heading level={2} size={3} className="pb-6">
          {service.header.title}
        </Heading>
        {service.teaser?.map((content: any) => (
          <PortableText key={content._key} value={content} />
        ))}
      </div>
    </div>
  )

  const image = (
    <div
      className={
        'py-auto flex w-1/2  bg-primary' +
        (rowNumber % 2 ? ' rounded-l-md' : ' rounded-r-md')
      }
    >
      <div className={'mx-auto my-auto h-[80%] w-[80%]'}>
        <SanityImage image={service.illustration} />
      </div>
    </div>
  )
  return (
    // <div className="rounded-md">
    <div className="full flex ">
      {/* <div className="w-1/2 rounded bg-base-grey">eins</div>
      <div className="w-1/2 rounded-md bg-primary ">zwei</div> */}
      <div
        className={
          'w-1/2 bg-base-grey' +
          (rowNumber % 2 ? ' rounded-r-md' : ' rounded-l-md')
        }
      >
        <div className="m-28 text-primary">
          <Heading level={2} size={3} className="pb-6">
            {service.header.title}
          </Heading>
          {service.teaser?.map((content: any) => (
            <PortableText key={content._key} value={content} />
          ))}
        </div>
      </div>
      <div
        className={
          'w-1/2 bg-primary ' +
          (rowNumber % 2 ? ' rounded-l-md' : ' rounded-r-md')
        }
      >
        <div className={'mx-auto my-auto h-[80%] w-[80%]'}>
          {/* <SanityImage image={service.illustration} /> */}
        </div>
      </div>
    </div>
    /* <div
        className={
          'w-1/2 bg-base-grey' +
          (rowNumber % 2 ? ' rounded-r-md' : ' rounded-l-md')
        }
      ></div> */

    // <div className="m-auto flex rounded-md">
    //   {rowNumber % 2 ? (
    //     <div className="flex rounded-md bg-base-grey ">
    //       {image}
    //       {text}
    //     </div>
    //   ) : (
    //     <div className=" flex rounded-md bg-base-grey">
    //       {text}
    //       {image}
    //     </div>
    //   )}
    // </div>
  )
}

export default ServiceTeaser
