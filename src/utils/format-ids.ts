export function formatIds(title: string) {
  return encodeURIComponent(title).replaceAll('%20', '-').replaceAll('%3F', '')
}
