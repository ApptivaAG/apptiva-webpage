// interface Project {

import EmblaCarouselProjectView from './emblaCarousel/emblaCarouselProjectView'
import Heading from './heading'

const Projects = ({ projects }: { projects: any }) => {
  return (
    <div className="full bg-primary text-base-white">
      <div className="mt-10">
        <div className="content m-auto font-[600]">
          <Heading level={2}>
            Gemeinsam wollen wir Geschichten schreiben.
          </Heading>
          <Heading level={2} className="highlighted-text">
            Erfolgsgeschichten.
          </Heading>
        </div>
        <EmblaCarouselProjectView slides={projects}></EmblaCarouselProjectView>
      </div>
    </div>
  )
}

export default Projects
