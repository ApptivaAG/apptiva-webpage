export function kebabCaseToTitleCase(kebabCaseString: string) {
  const words = kebabCaseString.split('-')

  const titleCaseString = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return titleCaseString.join(' ')
}
