import Heading from './heading'

const ServiceTeasers = ({ services }: { services?: any }) => {
  return (
    <div className="full bg-primary-dark text-base-white">
      <div className="mt-10">
        <div className="m-auto w-8/12 font-[600]">
          <Heading level={2}>Hallo :-)</Heading>
          <Heading level={2} className="highlighted-text">
            stroooong
          </Heading>
        </div>
      </div>
    </div>
  )
}

export default ServiceTeasers
