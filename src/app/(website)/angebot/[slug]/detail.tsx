import Heading from "@/components/heading";
import SanityImage from "@/components/sanity-image";
import { PortableText } from "@portabletext/react";
import { ServiceBySlugQueryData } from "../types";

export default function ServiceDetail(props: {service: ServiceBySlugQueryData}) {

  return (
    <>
      <Heading level={2}>{props.service.header?.title}</Heading>

      <p>{props.service.header?.description}</p>
      {props.service.header?.image && <SanityImage image={props.service.header?.image} />}
      {props.service.header?.content?.map((content) => (
        <PortableText key={content._key} value={content} />
      ))}

      {props.service.modules?.map((module) => (
        <>
          <Heading level={3}>{module.title}</Heading>
          <SanityImage image={module.image} />
          {module.content?.map((content) => (
            <PortableText key={content._key} value={content} />
          ))}
        </>
      ))}
    </>
)
}
