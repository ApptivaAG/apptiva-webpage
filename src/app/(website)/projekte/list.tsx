import Link from "next/link";
import { ProjectQueryData } from "./types";
import Heading from "@/components/heading";

export default function ProjectList(props: {projects: ProjectQueryData[]}) {

  return (
    <div className="container mx-auto px-4">
      <Heading level={2}>Projekte</Heading>
      {props.projects.map((project) => (
        <div key={project._id}>
          <Link href={'/projekte/' + project.slug}>
            <Heading level={3} size={4} className="max-w-fit">
              {project.projectName}
            </Heading>
            <div>{project.description}</div>
          </Link>
        </div>
      ))}
    </div>
)
}
