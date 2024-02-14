import Heading from './heading'

export default function Hero() {
  return (
    <div className="full animate-gradient bg-300% from-primary-light flex h-[52rem] items-center justify-center bg-gradient-to-br to-primary-dark">
      <Heading level={1} className="p-8">
        <span className="text-base-white">Hi, wir sind</span>{' '}
        <span className="mt-[1.25rem] inline-block border-b-[20px] border-b-primary-dark leading-[4.75rem] text-secondary">
          apptiva
        </span>
      </Heading>
    </div>
  )
}
