interface Tag {
  key: string
  value: string
}
interface TagWithName extends Tag {
  name: string
}

export const getAnyPropsToTagWithName = (props: object = {}): TagWithName[] => {
  return Object.entries(props).reduce<TagWithName[]>((acc, [key, value]) => {
    let name = key
    if (value) {
      switch (key) {
        default:
          acc.push({ key, value, name })
      }
    }
    return acc
  }, [])
}

export const getTagsWithName = (tags: Tag[] = []): TagWithName[] => {
  return tags.reduce<TagWithName[]>((acc, { key, value }) => {
    let name = key
    if (value) {
      switch (key) {
        case 'lh_request_url':
          acc.push({ key, value, name: 'Request URL' })
          break
        default:
          acc.push({ key, value, name })
      }
    }
    return acc
  }, [])
}
