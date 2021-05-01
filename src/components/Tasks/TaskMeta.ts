interface Tag {
  key: string
  value: string
}
interface TagWithName extends Tag {
  name: string
}
export const getTagsWithLabel = (tags: Tag[] = []): TagWithName[] => {
  return tags.reduce<TagWithName[]>((acc, { key, value }) => {
    let name = key
    if (value) {
      switch (key) {
        case 'lh_requested_url':
          acc.push({ key, value, name: 'Requested URL' })
          break
        default:
          acc.push({ key, value, name })
      }
    }
    return acc
  }, [])
}
