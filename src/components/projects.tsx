import EmblaCarousel from './emblaCarousel/emblaCarousel'

// interface Project {
//   id: string
//   projectName: string
//   slug: string
//   order: number
//   description: string
// }

const Projects = ({ projects }: { projects }) => {
  return (
    <div className="full bg-primary-dark">
      <div className="m-auto w-8/12 ">
        <h2>Titel</h2>
      </div>
      <EmblaCarousel slides={projects}>
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              className="mb-20 mt-20 min-w-0 flex-[0_0_100%]"
            >
              <h2>{project.projectName}</h2>
            </div>
          )
        })}
      </EmblaCarousel>
    </div>
  )
}

export default Projects
