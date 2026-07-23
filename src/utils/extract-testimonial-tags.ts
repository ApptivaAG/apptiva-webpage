type Module = {
  type?: string
  tags?: string[]
}

type DataWithModules = {
  modules?: Module[] | null
}

export function extractTestimonialTags(
  data: DataWithModules | null | undefined
): ('chatbot' | 'sw-dev')[] {
  const testimonialModule = data?.modules?.find(
    (module) => module?.type === 'testimonials'
  )
  return testimonialModule?.tags as ('chatbot' | 'sw-dev')[]
}
