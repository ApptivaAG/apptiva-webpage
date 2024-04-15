function portableTextToString(
  portableText: { children: { text: string }[] }[]
) {
  return portableText
    .flatMap((block: { children: { text: string }[] }) =>
      block.children.map((child) => child.text)
    )
    .join('')
}

export default portableTextToString
