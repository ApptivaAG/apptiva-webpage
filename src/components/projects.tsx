import EmblaCarousel from './emblaCarousel/emblaCarousel'
import ProjectOverview from './project-overview'

// interface Project {
//   id: string
//   projectName: string
//   slug: string
//   order: number
//   description: string
// }

const Projects = ({ projects }: { projects }) => {
  return (
    <div className="full bg-primary-dark text-base-white">
      <div className="mb-10 mt-10">
        <div className="m-auto w-8/12 ">
          <h2>Gemeinsam wollen wir Geschichten schreiben.</h2>
          <h2 className="highlighted-text">Erfolgsgeschichten.</h2>
        </div>

        <EmblaCarousel slides={projects}>
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="mb-20 mt-20 min-w-0 flex-[0_0_100%]"
              >
                <ProjectOverview project={project}></ProjectOverview>
              </div>
            )
          })}
        </EmblaCarousel>
      </div>
    </div>
  )
}

export default Projects
