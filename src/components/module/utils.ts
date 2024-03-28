export function moduleStyleToSectionIntent(style: string | undefined) {
  switch (style) {
    case 'dark-bg':
      return 'dark'
    case 'light-gray-bg':
      return 'lightGray'
    default:
      return 'light'
  }
}
