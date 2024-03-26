const portableTextToString = (
  portableText: { children: { text: string }[] }[]
) =>
  portableText
    .flatMap((block: { children: { text: string }[] }) =>
      block.children.map((child) => child.text)
    )
    .join('')

export default portableTextToString
