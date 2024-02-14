// interface Project {

import EmblaCarouselProjectView from './emblaCarousel/emblaCarouselProjectView'

const Projects = ({ projects }: { projects: any }) => {
  return (
    <div className="full bg-primary-dark text-base-white">
      <div className="mt-10">
        <div className="m-auto w-8/12 ">
          <h2>Gemeinsam wollen wir Geschichten schreiben.</h2>
          <h2 className="highlighted-text">Erfolgsgeschichten.</h2>
        </div>
        <EmblaCarouselProjectView slides={projects}></EmblaCarouselProjectView>
      </div>
    </div>
  )
}

export default Projects
