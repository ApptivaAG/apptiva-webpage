const ProjectOverview = ({ project }: { project: any }) => {
  return (
    <>
      <div>
        <div className="m-auto w-8/12 ">
          <h3>{project.projectName}</h3>
        </div>
      </div>
    </>
  )
}

export default ProjectOverview
